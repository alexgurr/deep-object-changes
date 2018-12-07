"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDeepObjectChanges;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Recursively looks through two objects for changes. Will return an object with keys for
 * only changed values. Will shallow compare arrays, but will deep compare objects.
 *
 * @param {Object} original
 * @param {Object} withChanges
 *
 * @return {Object}
 */
function getDeepObjectChanges(original, withChanges) {
  return Object.keys(withChanges).reduce(function (finalPayload, key) {
    if (withChanges[key] === original[key]) {
      return finalPayload;
    }

    var value = withChanges[key];

    if (_typeof(value) === 'object' && !Array.isArray(value)) {
      var newValue = getDeepObjectChanges(original[key], value);

      if (!Object.keys(newValue).length) {
        return finalPayload;
      }

      return _objectSpread({}, finalPayload, _defineProperty({}, key, newValue));
    }

    return _objectSpread({}, finalPayload, _defineProperty({}, key, value));
  }, {});
}