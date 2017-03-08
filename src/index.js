'use strict';
import fakeCalls from './main';

/* globals define, module */
(function (factory, root = window) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.fakeCalls = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    let fakeCalls = factory();
    module.exports = fakeCalls;
    root.fakeCalls = fakeCalls;
  } else {
    root.fakeCalls = factory();
  }
}(function () {
  return fakeCalls;
}, this));
