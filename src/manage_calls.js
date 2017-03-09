'use strict';

let manageCalls = function manageCalls(config) {
  config.ps.on('make-call', function (call) {
    console.log('callMade', call);
  });
};

export default manageCalls;
