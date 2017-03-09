'use strict';

export let isDOMElement = function isDOMElement(o) {
  return (typeof HTMLElement === 'object' ? o instanceof HTMLElement : //DOM2
    o && typeof o === 'object' && o !== null && o.nodeType === 1 &&
    typeof o.nodeName === 'string');
};

export let generateID = function generateID(prefix = '') {
  let el, id = 0;
  do {
    id += 1;
    el = document.getElementById(`${prefix}${id}`);
  } while (el);
  return id;
};

export const PROFILES = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0.08, 0.17, 0.33, 0.5, 0.67, 0.83, 1, 1.17, 1.33, 1.5, 1.67, 1.83, 2, 1.83,
    1.67, 1.5, 1.33, 1.17, 1, 0.83, 0.67, 0.5, 0.33, 0.09],
  [2, 1.83, 1.67, 1.5, 1.33, 1.17, 1, 0.83, 0.67, 0.5, 0.33, 0.09, 0.08, 0.17,
    0.33, 0.5, 0.67, 0.83, 1, 1.17, 1.33, 1.5, 1.67, 1.83]
];

const STYLE = `<style>
  .fake-calls {
    max-width: 40em;
    font-family: sans-serif;
    margin: auto;
  }
    .fake-calls .fc-input {
      display: flex;
      flex-wrap: wrap;
    }
    .fake-calls .fc-input > div {
      margin-bottom: 1em;
      display: flex;
      align-items: center;
      width: 50%;
      flex-wrap: wrap;
    }
    .fake-calls label {
      display: inline-block;
      width: 5em;
      padding-right: 1em;
      text-align: right;
      flex-shrink: 0;
    }
    .fake-calls input, .fake-calls select, .fake-calls button {
      font-size: 100%;
      font-family: sans-serif;
      line-height: 1.15;
      padding: .5em;
      box-sizing: border-box;
    }
    .fake-calls .fc-profile-field {
      width: 100% !important;
    }
    .fake-calls .fc-keys-field {
      align-items: flex-start !important;
      width: 100% !important;
      flex-wrap: nowrap !important;
    }
    .fake-calls .fc-keys-container {
      width: 100%;
    }
    .fake-calls .fc-buttons, .fake-calls .fc-post-buttons {
      display: flex;
    }
    .fake-calls .fc-buttons {
      background-color: #f7f7f7;
      padding: 1em;
    }
    .fake-calls .fc-make {
      margin-right: 1em;
      width: 33%;
    }
    .fake-calls .fc-buttons > div {
      width: 100%;
    }
    .fake-calls .fc-generated {
      width: 100%;
      margin-bottom: 1em;
    }
    .fake-calls .fc-post-buttons button {
      width: 50%;
    }
    .fake-calls .fc-download {
      margin-right: 1em;
    }
    .fake-calls .fc-errors {
      font-size: 0.8em;
      color: #b00;
      cursor: default;
      margin-top: .5em;
    }
    .fake-calls .qui .qui-user-input {
      min-height: auto;
    }
    .fake-calls .qui .qui-value, .fake-calls .qui .qui-list-value {
      margin-bottom: 0;
    }
    .fake-calls .dtp-picker input, .fake-calls .dtp-picker button {
      padding: initial;
    }
</style>`;

export let generateHTML = function generateHTML(id) {
  return `<div class="fake-calls" id="fake-calls-${id}">
    ${STYLE}
    <div class="fc-input">
      <div class="fc-from-field">
        <label for="fc-${id}-from">From</label>
        <input type="text" class="fc-from" id="fc-${id}-from"></input>
      </div>
      <div class="fc-to-field">
        <label for="fc-${id}-to">To</label>
        <input type="text" class="fc-to" id="fc-${id}-to"></input>
      </div>
      <div class="fc-count-field">
        <label for="fc-${id}-count">Count</label>
        <input type="number" class="fc-count" id="fc-${id}-count" min="0"
          value="0"></input>
      </div>
      <div class="fc-noise-field">
        <label for="fc-${id}-noise">Noise (%)</label>
        <input type="number" step="any" min="0" max="100" class="fc-noise"
          id="fc-${id}-noise" value="50"></input>
      </div>
      <div class="fc-profile-field">
        <label for="fc-${id}-profile">Profile</label>
        <select class="fc-profile" id="fc-${id}-profile">
          <option value="1">Valued equally distributed</option>
          <option value="2">Higher values in middle hours</option>
          <option value="3">Lower values in middle hours</option>
        </select>
      </div>
      <div class="fc-keys-field">
        <label>Custom fields for the calls</label>
        <div class="fc-keys-container" id="fc-${id}-keys-container"></div>
      </div>
    </div>
    <div class="fc-buttons">
      <button class="fc-make">Make calls</button>
      <div>
        <select class="fc-generated"></select>
        <div class="fc-post-buttons">
          <button class="fc-download" disabled>Download CSV</button>
          <button class="fc-remove" disabled>Remove Calls</button>
        </div>
      </div>
    </div>
    <div class="fc-errors"></div>
  </div>`;
};
