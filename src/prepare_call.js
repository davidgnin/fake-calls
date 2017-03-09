'use strict';

let prepareCall = function prepareCall(config) {
  let parseDate = function parseDate(dateString) {
    let wip = dateString.replace('Z', '').split('T');
    if (wip.length === 2) {
      wip[0] = wip[0].split('-');
      wip[1] = wip[1].split(':');
      if (wip[0].length === 3 && wip[1].length === 3) {
        wip[1][2] = wip[1][2].split('.');
        if (wip[1][2].length === 2) {
          let d = {
            year: parseInt(wip[0][0], 10),
            month: parseInt(wip[0][1], 10),
            day: parseInt(wip[0][2], 10),
            hour: parseInt(wip[1][0], 10),
            min: parseInt(wip[1][1], 10),
            sec: parseInt(wip[1][2][0], 10),
            ms: parseInt(wip[1][2][1], 10)
          };
          if (!isNaN(d.month)) {
            d.month -= 1;
          }
          let time = Date.UTC(d.year, d.month, d.day, d.hour, d.min, d.sec,
            d.ms);
          if (!isNaN(time)) {
            return new Date(time);
          }
        }
      }
    }
    return undefined;
  };

  let prepareKeys = function prepareKeys(query) {
    let keys = {};
    for (let i = 0, length = query.length; i < length; i++) {
      keys[query[i][0]] = query[i][2];
    }
    return keys;
  };

  config.gui.make.addEventListener('click', function () {
    let call = {
      from: parseDate(config.gui.from.value),
      to: parseDate(config.gui.to.value),
      count: parseInt(config.gui.count.value, 10),
      noise: parseFloat(config.gui.noise.value),
      profile: parseInt(config.gui.profile.value),
      keys: prepareKeys(config.keysUI.query())
    };

    let error = '';

    //Validate dates
    if (call.from === undefined) {
      config.gui.from.value = '';
      error += 'Wrong value for field: from; ';
    }
    if (call.to === undefined) {
      config.gui.from.value = '';
      error += 'Wrong value for field: to; ';
    }
    if (error === '' && call.from > call.to) {
      error += 'From date is higher than to date; ';
    }

    //Validate number fields
    if (isNaN(call.count) || call.count < 0) {
      config.gui.count.value = 0;
      error += 'Count has to be a valid number and can\'t be negative; ';
    }
    if (isNaN(call.noise) || call.noise < 0) {
      config.gui.noise.value = 0;
      error += 'Noise has to be a valid percentage between 0 and 100; ';
    } else if (call.noise > 100) {
      config.gui.noise.value = 100;
      error += 'Noise has to be a valid percentage between 0 and 100; ';
    }
    if (isNaN(call.profile) || [1, 2, 3].indexOf(call.profile) < 0) {
      config.gui.profile.value = 1;
      error += 'Profile has to be one of the three valid options';
    }

    if (error === '') {
      config.gui.make.disabled = true;
      config.ps.trigger('make-call', call);
    } else {
      config.ps.trigger('error', error);
    }
  });
};

export default prepareCall;
