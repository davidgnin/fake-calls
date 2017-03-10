'use strict';
import { PROFILES } from './utils';

let manageCalls = function manageCalls(config) {
  //let calls = [];

  let calcCallNum = function calcCallNum(from, to) {
    return (Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate(),
      to.getUTCHours()) - Date.UTC(from.getUTCFullYear(), from.getUTCMonth(),
      from.getUTCDate(), from.getUTCHours()))/3600000 + 1;
  };

  let calcDaysNum = function calcDaysNum(from, to) {
    return (Date.UTC(to.getUTCFullYear(), to.getUTCMonth(),
      to.getUTCDate()) - Date.UTC(from.getUTCFullYear(), from.getUTCMonth(),
      from.getUTCDate()))/86400000 + 1;
  };

  let generateDayCounts = function generateDayCounts(inDays, inCounts, noise,
    fromHour, toHour) {
    let dayCounts = [];

    let fromPer = 1 - fromHour/24;
    let toPer = toHour/24;

    if (inDays === 2) {
      dayCounts[0] = Math.round(inCounts*(fromPer/(fromPer + toPer)));
      dayCounts[1] = inCounts - dayCounts[0];
      return dayCounts;
    }

    let normNoise = noise/100;
    let calcCount = function calcCount(average, remaining) {
      let noiseEff = average*normNoise;
      let min = Math.floor(average - noiseEff);
      let max = Math.ceil(average + noiseEff);
      if (max > remaining) {
        max = remaining;
      }
      if (min > max) {
        min = max;
      }
      return min + Math.round((max - min)*Math.random());
    };

    let counts = inCounts;
    dayCounts[0] = calcCount(inCounts/inDays*fromPer, counts);
    counts -= dayCounts[0];
    dayCounts[inDays - 1] = calcCount(counts/(inDays - 1)*toPer, counts);
    counts -= dayCounts[inDays - 1];
    for (let i, days = inDays - 2; days > 1; days -= 1) {
      i = inDays - days - 1;
      dayCounts[i] = calcCount(counts/days, counts);
      counts -= dayCounts[i];
    }
    dayCounts[inDays - 2] = counts;
    return dayCounts;
  };

  let generateCountByCall = function generateCountByCall(hours, hourIndex,
    dayCounts, inProfile) {
    let calcCount = function calcCount(average, remaining, modifier) {
      let count = Math.round(average*2*modifier*Math.random());
      return count > remaining ? remaining : count;
    };
    let normProfile = function normProfile(profile, init, length) {
      let sum = 0;
      for (let i = init; i < length; i++) {
        sum += profile[i];
      }
      let average = sum/(length - init);
      let newProfile = [];
      for (let i = init; i < length; i++) {
        newProfile[i] = profile[i]/average;
      }
      return newProfile;
    };

    let calls = [];
    let hour = hourIndex;
    let idc = 0;
    let counts = dayCounts[0];
    let dayHours = dayCounts.length > 1 ? 24 : hours + hour;
    let profile = normProfile(inProfile, hour, dayHours);
    for (let ih = 0; ih < hours; ih++) {
      if (hour === dayHours - 1) {
        calls[ih] = counts;
        hour = 0;
        idc += 1;
        counts = dayCounts[idc];
        dayHours = hours - 1 - ih > 24 ? 24 : hours - 1 - ih;
        if (dayHours < 24) {
          profile = normProfile(inProfile, 0, dayHours);
        } else {
          profile = inProfile;
        }
      } else {
        calls[ih] = calcCount(counts/(dayHours - hour), counts, profile[hour]);
        counts -= calls[ih];
        hour += 1;
      }
    }
    return calls;
  };

  let generateCallId = function generateCallId() {
    return Date.now().toString() + Math.round(Math.random()*10000);
  };

  config.ps.on('make-call', function (call) {
    let hours = calcCallNum(call.from, call.to);
    let days = calcDaysNum(call.from, call.to);
    let hourIndex = call.from.getUTCHours();

    let dayCounts;
    if (days === 1) {
      dayCounts = [call.count];
    } else {
      dayCounts = generateDayCounts(days, call.count, call.noise, hourIndex,
        call.to.getUTCHours() + 1);
    }

    call.calls = generateCountByCall(hours, hourIndex, dayCounts,
      PROFILES[call.profile - 1]);

    let callId = generateCallId();

    let onSuccess = function onSuccess(report) {
      console.log('success report', report);
    };
    let onFail = function onFail(report) {
      console.log('fail report', report);
      if (window.confirm('An error occurred making the calls. Do you want to ' +
        'retry it?')) {
        config.generateCalls(call, callId, onSuccess, onFail);
      }
    };
    config.generateCalls(call, callId, onSuccess, onFail);
  });
};

export default manageCalls;
