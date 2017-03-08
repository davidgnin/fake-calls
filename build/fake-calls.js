(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* globals define, module */
(function (factory) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return root.fakeCalls = factory();
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    var _fakeCalls = factory();
    module.exports = _fakeCalls;
    root.fakeCalls = _fakeCalls;
  } else {
    root.fakeCalls = factory();
  }
})(function () {
  return _main2.default;
}, undefined);

},{"./main":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fakeCalls = function fakeCalls() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.log('fakeCalls', input);
};

exports.default = fakeCalls;

},{}]},{},[1]);
