'use strict';
import { ajax } from './utils';
import merge from 'lodash/merge';

const MAX_RETRIES = 5;

let generateCalls = function generateCalls(call, callId, onSuccess, onFail) {
  let data = merge(call.keys, {
    origin: 'manual-fake',
    id: callId
  });

  let report = [];
  let callsLength = call.calls.length;
  let makeACall = function makeACall(hour, time, retry = 1) {
    if (hour < callsLength) {
      ajax.get('http://barcelona.indymedia.org/dinosaurios', data,
        function (lel, status) {
        console.log('lel', lel);
        report.push({
          time: time,
          count: call.calls[hour],
          status: status
        });
        if (status === '200') {
          makeACall(hour + 1, time + 3600000);
        } else if (retry < MAX_RETRIES) {
          makeACall(hour, time, retry + 1);
        } else {
          onFail(report);
        }
      });
    } else {
      onSuccess(report);
    }
  };
  makeACall(0, Date.UTC(call.from.getUTCFullYear(), call.from.getUTCMonth(),
    call.from.getUTCDate(), call.from.getUTCHours()));
};

export default generateCalls;
