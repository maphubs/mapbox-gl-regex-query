(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.RegexQuery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.WhooTS = global.WhooTS || {})));
}(this, (function (exports) {

/**
 * getURL
 *
 * @param    {String}  baseUrl  Base url of the WMS server
 * @param    {String}  layer    Layer name
 * @param    {Number}  x        Tile coordinate x
 * @param    {Number}  y        Tile coordinate y
 * @param    {Number}  z        Tile zoom
 * @param    {Object}  [options]
 * @param    {String}  [options.format='image/png']
 * @param    {String}  [options.service='WMS']
 * @param    {String}  [options.version='1.1.1']
 * @param    {String}  [options.request='GetMap']
 * @param    {String}  [options.srs='EPSG:3857']
 * @param    {Number}  [options.width='256']
 * @param    {Number}  [options.height='256']
 * @returns  {String}  url
 * @example
 * var baseUrl = 'http://geodata.state.nj.us/imagerywms/Natural2015';
 * var layer = 'Natural2015';
 * var url = whoots.getURL(baseUrl, layer, 154308, 197167, 19);
 */
function getURL(baseUrl, layer, x, y, z, options) {
    options = options || {};

    var url = baseUrl + '?' + [
        'bbox='    + getTileBBox(x, y, z),
        'format='  + (options.format || 'image/png'),
        'service=' + (options.service || 'WMS'),
        'version=' + (options.version || '1.1.1'),
        'request=' + (options.request || 'GetMap'),
        'srs='     + (options.srs || 'EPSG:3857'),
        'width='   + (options.width || 256),
        'height='  + (options.height || 256),
        'layers='  + layer
    ].join('&');

    return url;
}


/**
 * getTileBBox
 *
 * @param    {Number}  x  Tile coordinate x
 * @param    {Number}  y  Tile coordinate y
 * @param    {Number}  z  Tile zoom
 * @returns  {String}  String of the bounding box
 */
function getTileBBox(x, y, z) {
    // for Google/OSM tile scheme we need to alter the y
    y = (Math.pow(2, z) - y - 1);

    var min = getMercCoords(x * 256, y * 256, z),
        max = getMercCoords((x + 1) * 256, (y + 1) * 256, z);

    return min[0] + ',' + min[1] + ',' + max[0] + ',' + max[1];
}


/**
 * getMercCoords
 *
 * @param    {Number}  x  Pixel coordinate x
 * @param    {Number}  y  Pixel coordinate y
 * @param    {Number}  z  Tile zoom
 * @returns  {Array}   [x, y]
 */
function getMercCoords(x, y, z) {
    var resolution = (2 * Math.PI * 6378137 / 256) / Math.pow(2, z),
        merc_x = (x * resolution - 2 * Math.PI  * 6378137 / 2.0),
        merc_y = (y * resolution - 2 * Math.PI  * 6378137 / 2.0);

    return [merc_x, merc_y];
}

exports.getURL = getURL;
exports.getTileBBox = getTileBBox;
exports.getMercCoords = getMercCoords;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"util/":13}],3:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){
'use strict';
//      

/**
 * A coordinate is a column, row, zoom combination, often used
 * as the data component of a tile.
 *
 * @param {number} column
 * @param {number} row
 * @param {number} zoom
 * @private
 */
var Coordinate = function Coordinate(column    , row    , zoom    ) {
    this.column = column;
    this.row = row;
    this.zoom = zoom;
};

/**
 * Create a clone of this coordinate that can be mutated without
 * changing the original coordinate
 *
 * @returns {Coordinate} clone
 * @private
 * var coord = new Coordinate(0, 0, 0);
 * var c2 = coord.clone();
 * // since coord is cloned, modifying a property of c2 does
 * // not modify it.
 * c2.zoom = 2;
 */
Coordinate.prototype.clone = function clone () {
    return new Coordinate(this.column, this.row, this.zoom);
};

/**
 * Zoom this coordinate to a given zoom level. This returns a new
 * coordinate object, not mutating the old one.
 *
 * @param {number} zoom
 * @returns {Coordinate} zoomed coordinate
 * @private
 * @example
 * var coord = new Coordinate(0, 0, 0);
 * var c2 = coord.zoomTo(1);
 * c2 // equals new Coordinate(0, 0, 1);
 */
Coordinate.prototype.zoomTo = function zoomTo (zoom    ) { return this.clone()._zoomTo(zoom); };

/**
 * Subtract the column and row values of this coordinate from those
 * of another coordinate. The other coordinat will be zoomed to the
 * same level as `this` before the subtraction occurs
 *
 * @param {Coordinate} c other coordinate
 * @returns {Coordinate} result
 * @private
 */
Coordinate.prototype.sub = function sub (c        ) { return this.clone()._sub(c); };

Coordinate.prototype._zoomTo = function _zoomTo (zoom    ) {
    var scale = Math.pow(2, zoom - this.zoom);
    this.column *= scale;
    this.row *= scale;
    this.zoom = zoom;
    return this;
};

Coordinate.prototype._sub = function _sub (c        ) {
    c = c.zoomTo(this.zoom);
    this.column -= c.column;
    this.row -= c.row;
    return this;
};

module.exports = Coordinate;

},{}],5:[function(require,module,exports){
'use strict';

var assert = require('assert');
var WhooTS = require('@mapbox/whoots-js');
var Coordinate = require('../geo/coordinate');

var TileCoord = function TileCoord(z, x, y, w) {
    assert(!isNaN(z) && z >= 0 && z % 1 === 0);
    assert(!isNaN(x) && x >= 0 && x % 1 === 0);
    assert(!isNaN(y) && y >= 0 && y % 1 === 0);

    if (isNaN(w)) { w = 0; }

    this.z = +z;
    this.x = +x;
    this.y = +y;
    this.w = +w;

    // calculate id
    w *= 2;
    if (w < 0) { w = w * -1 - 1; }
    var dim = 1 << this.z;
    this.id = ((dim * dim * w + dim * this.y + this.x) * 32) + this.z;

    // for caching pos matrix calculation when rendering
    this.posMatrix = null;
};

TileCoord.prototype.toString = function toString () {
    return ((this.z) + "/" + (this.x) + "/" + (this.y));
};

TileCoord.prototype.toCoordinate = function toCoordinate (sourceMaxZoom) {
    var zoom = Math.min(this.z, sourceMaxZoom === undefined ? this.z : sourceMaxZoom);
    var tileScale = Math.pow(2, zoom);
    var row = this.y;
    var column = this.x + tileScale * this.w;
    return new Coordinate(column, row, zoom);
};

// given a list of urls, choose a url template and return a tile URL
TileCoord.prototype.url = function url (urls, sourceMaxZoom, scheme) {
    var bbox = WhooTS.getTileBBox(this.x, this.y, this.z);
    var quadkey = getQuadkey(this.z, this.x, this.y);

    return urls[(this.x + this.y) % urls.length]
        .replace('{prefix}', (this.x % 16).toString(16) + (this.y % 16).toString(16))
        .replace('{z}', Math.min(this.z, sourceMaxZoom || this.z))
        .replace('{x}', this.x)
        .replace('{y}', scheme === 'tms' ? (Math.pow(2, this.z) - this.y - 1) : this.y)
        .replace('{quadkey}', quadkey)
        .replace('{bbox-epsg-3857}', bbox);
};

// Return the coordinate of the parent tile
TileCoord.prototype.parent = function parent (sourceMaxZoom) {
    if (this.z === 0) { return null; }

    // the id represents an overscaled tile, return the same coordinates with a lower z
    if (this.z > sourceMaxZoom) {
        return new TileCoord(this.z - 1, this.x, this.y, this.w);
    }

    return new TileCoord(this.z - 1, Math.floor(this.x / 2), Math.floor(this.y / 2), this.w);
};

TileCoord.prototype.wrapped = function wrapped () {
    return new TileCoord(this.z, this.x, this.y, 0);
};

// Return the coordinates of the tile's children
TileCoord.prototype.children = function children (sourceMaxZoom) {

    if (this.z >= sourceMaxZoom) {
        // return a single tile coord representing a an overscaled tile
        return [new TileCoord(this.z + 1, this.x, this.y, this.w)];
    }

    var z = this.z + 1;
    var x = this.x * 2;
    var y = this.y * 2;
    return [
        new TileCoord(z, x, y, this.w),
        new TileCoord(z, x + 1, y, this.w),
        new TileCoord(z, x, y + 1, this.w),
        new TileCoord(z, x + 1, y + 1, this.w)
    ];
};

// Taken from polymaps src/Layer.js
// https://github.com/simplegeo/polymaps/blob/master/src/Layer.js#L333-L383

function edge(a, b) {
    if (a.row > b.row) { var t = a; a = b; b = t; }
    return {
        x0: a.column,
        y0: a.row,
        x1: b.column,
        y1: b.row,
        dx: b.column - a.column,
        dy: b.row - a.row
    };
}

function scanSpans(e0, e1, ymin, ymax, scanLine) {
    var y0 = Math.max(ymin, Math.floor(e1.y0));
    var y1 = Math.min(ymax, Math.ceil(e1.y1));

    // sort edges by x-coordinate
    if ((e0.x0 === e1.x0 && e0.y0 === e1.y0) ?
            (e0.x0 + e1.dy / e0.dy * e0.dx < e1.x1) :
            (e0.x1 - e1.dy / e0.dy * e0.dx < e1.x0)) {
        var t = e0; e0 = e1; e1 = t;
    }

    // scan lines!
    var m0 = e0.dx / e0.dy;
    var m1 = e1.dx / e1.dy;
    var d0 = e0.dx > 0; // use y + 1 to compute x0
    var d1 = e1.dx < 0; // use y + 1 to compute x1
    for (var y = y0; y < y1; y++) {
        var x0 = m0 * Math.max(0, Math.min(e0.dy, y + d0 - e0.y0)) + e0.x0;
        var x1 = m1 * Math.max(0, Math.min(e1.dy, y + d1 - e1.y0)) + e1.x0;
        scanLine(Math.floor(x1), Math.ceil(x0), y);
    }
}

function scanTriangle(a, b, c, ymin, ymax, scanLine) {
    var ab = edge(a, b),
        bc = edge(b, c),
        ca = edge(c, a);

    var t;

    // sort edges by y-length
    if (ab.dy > bc.dy) { t = ab; ab = bc; bc = t; }
    if (ab.dy > ca.dy) { t = ab; ab = ca; ca = t; }
    if (bc.dy > ca.dy) { t = bc; bc = ca; ca = t; }

    // scan span! scan span!
    if (ab.dy) { scanSpans(ca, ab, ymin, ymax, scanLine); }
    if (bc.dy) { scanSpans(ca, bc, ymin, ymax, scanLine); }
}

TileCoord.cover = function(z, bounds, actualZ, renderWorldCopies) {
    if (renderWorldCopies === undefined) {
        renderWorldCopies = true;
    }
    var tiles = 1 << z;
    var t = {};

    function scanLine(x0, x1, y) {
        var x, w, wx, coord;
        if (y >= 0 && y <= tiles) {
            for (x = x0; x < x1; x++) {
                w = Math.floor(x / tiles);
                wx = (x % tiles + tiles) % tiles;
                if (w === 0 || renderWorldCopies === true) {
                    coord = new TileCoord(actualZ, wx, y, w);
                    t[coord.id] = coord;
                }
            }
        }
    }

    // Divide the screen up in two triangles and scan each of them:
    // +---/
    // | / |
    // /---+
    scanTriangle(bounds[0], bounds[1], bounds[2], 0, tiles, scanLine);
    scanTriangle(bounds[2], bounds[3], bounds[0], 0, tiles, scanLine);

    return Object.keys(t).map(function (id) {
        return t[id];
    });
};

// Parse a packed integer id into a TileCoord object
TileCoord.fromID = function(id) {
    var z = id % 32, dim = 1 << z;
    var xy = ((id - z) / 32);
    var x = xy % dim, y = ((xy - x) / dim) % dim;
    var w = Math.floor(xy / (dim * dim));
    if (w % 2 !== 0) { w = w * -1 - 1; }
    w /= 2;
    return new TileCoord(z, x, y, w);
};

function getQuadkey(z, x, y) {
    var quadkey = '', mask;
    for (var i = z; i > 0; i--) {
        mask = 1 << (i - 1);
        quadkey += ((x & mask ? 1 : 0) + (y & mask ? 2 : 0));
    }
    return quadkey;
}

module.exports = TileCoord;

},{"../geo/coordinate":4,"@mapbox/whoots-js":1,"assert":2}],6:[function(require,module,exports){
'use strict';

var Feature = function Feature(vectorTileFeature, z, x, y) {
    this.type = 'Feature';

    this._vectorTileFeature = vectorTileFeature;
    vectorTileFeature._z = z;
    vectorTileFeature._x = x;
    vectorTileFeature._y = y;

    this.properties = vectorTileFeature.properties;

    if (vectorTileFeature.id != null) {
        this.id = vectorTileFeature.id;
    }
};

var prototypeAccessors = { geometry: {} };

prototypeAccessors.geometry.get = function () {
    if (this._geometry === undefined) {
        this._geometry = this._vectorTileFeature.toGeoJSON(
            this._vectorTileFeature._x,
            this._vectorTileFeature._y,
            this._vectorTileFeature._z).geometry;
    }
    return this._geometry;
};

prototypeAccessors.geometry.set = function (g) {
    this._geometry = g;
};

Feature.prototype.toJSON = function toJSON () {
        var this$1 = this;

    var json = {
        geometry: this.geometry
    };
    for (var i in this$1) {
        if (i === '_geometry' || i === '_vectorTileFeature') { continue; }
        json[i] = this$1[i];
    }
    return json;
};

Object.defineProperties( Feature.prototype, prototypeAccessors );

module.exports = Feature;

},{}],7:[function(require,module,exports){
'use strict';

// lightweight Buffer shim for pbf browser build
// based on code from github.com/feross/buffer (MIT-licensed)

module.exports = Buffer;

var ieee754 = require('ieee754');

var BufferMethods;

function Buffer(length) {
    var arr;
    if (length && length.length) {
        arr = length;
        length = arr.length;
    }
    var buf = new Uint8Array(length || 0);
    if (arr) buf.set(arr);

    buf.readUInt32LE = BufferMethods.readUInt32LE;
    buf.writeUInt32LE = BufferMethods.writeUInt32LE;
    buf.readInt32LE = BufferMethods.readInt32LE;
    buf.writeInt32LE = BufferMethods.writeInt32LE;
    buf.readFloatLE = BufferMethods.readFloatLE;
    buf.writeFloatLE = BufferMethods.writeFloatLE;
    buf.readDoubleLE = BufferMethods.readDoubleLE;
    buf.writeDoubleLE = BufferMethods.writeDoubleLE;
    buf.toString = BufferMethods.toString;
    buf.write = BufferMethods.write;
    buf.slice = BufferMethods.slice;
    buf.copy = BufferMethods.copy;

    buf._isBuffer = true;
    return buf;
}

var lastStr, lastStrEncoded;

BufferMethods = {
    readUInt32LE: function(pos) {
        return ((this[pos]) |
            (this[pos + 1] << 8) |
            (this[pos + 2] << 16)) +
            (this[pos + 3] * 0x1000000);
    },

    writeUInt32LE: function(val, pos) {
        this[pos] = val;
        this[pos + 1] = (val >>> 8);
        this[pos + 2] = (val >>> 16);
        this[pos + 3] = (val >>> 24);
    },

    readInt32LE: function(pos) {
        return ((this[pos]) |
            (this[pos + 1] << 8) |
            (this[pos + 2] << 16)) +
            (this[pos + 3] << 24);
    },

    readFloatLE:  function(pos) { return ieee754.read(this, pos, true, 23, 4); },
    readDoubleLE: function(pos) { return ieee754.read(this, pos, true, 52, 8); },

    writeFloatLE:  function(val, pos) { return ieee754.write(this, val, pos, true, 23, 4); },
    writeDoubleLE: function(val, pos) { return ieee754.write(this, val, pos, true, 52, 8); },

    toString: function(encoding, start, end) {
        var str = '',
            tmp = '';

        start = start || 0;
        end = Math.min(this.length, end || this.length);

        for (var i = start; i < end; i++) {
            var ch = this[i];
            if (ch <= 0x7F) {
                str += decodeURIComponent(tmp) + String.fromCharCode(ch);
                tmp = '';
            } else {
                tmp += '%' + ch.toString(16);
            }
        }

        str += decodeURIComponent(tmp);

        return str;
    },

    write: function(str, pos) {
        var bytes = str === lastStr ? lastStrEncoded : encodeString(str);
        for (var i = 0; i < bytes.length; i++) {
            this[pos + i] = bytes[i];
        }
    },

    slice: function(start, end) {
        return this.subarray(start, end);
    },

    copy: function(buf, pos) {
        pos = pos || 0;
        for (var i = 0; i < this.length; i++) {
            buf[pos + i] = this[i];
        }
    }
};

BufferMethods.writeInt32LE = BufferMethods.writeUInt32LE;

Buffer.byteLength = function(str) {
    lastStr = str;
    lastStrEncoded = encodeString(str);
    return lastStrEncoded.length;
};

Buffer.isBuffer = function(buf) {
    return !!(buf && buf._isBuffer);
};

function encodeString(str) {
    var length = str.length,
        bytes = [];

    for (var i = 0, c, lead; i < length; i++) {
        c = str.charCodeAt(i); // code point

        if (c > 0xD7FF && c < 0xE000) {

            if (lead) {
                if (c < 0xDC00) {
                    bytes.push(0xEF, 0xBF, 0xBD);
                    lead = c;
                    continue;

                } else {
                    c = lead - 0xD800 << 10 | c - 0xDC00 | 0x10000;
                    lead = null;
                }

            } else {
                if (c > 0xDBFF || (i + 1 === length)) bytes.push(0xEF, 0xBF, 0xBD);
                else lead = c;

                continue;
            }

        } else if (lead) {
            bytes.push(0xEF, 0xBF, 0xBD);
            lead = null;
        }

        if (c < 0x80) bytes.push(c);
        else if (c < 0x800) bytes.push(c >> 0x6 | 0xC0, c & 0x3F | 0x80);
        else if (c < 0x10000) bytes.push(c >> 0xC | 0xE0, c >> 0x6 & 0x3F | 0x80, c & 0x3F | 0x80);
        else bytes.push(c >> 0x12 | 0xF0, c >> 0xC & 0x3F | 0x80, c >> 0x6 & 0x3F | 0x80, c & 0x3F | 0x80);
    }
    return bytes;
}

},{"ieee754":3}],8:[function(require,module,exports){
(function (global){
'use strict';

module.exports = Pbf;

var Buffer = global.Buffer || require('./buffer');

function Pbf(buf) {
    this.buf = !Buffer.isBuffer(buf) ? new Buffer(buf || 0) : buf;
    this.pos = 0;
    this.length = this.buf.length;
}

Pbf.Varint  = 0; // varint: int32, int64, uint32, uint64, sint32, sint64, bool, enum
Pbf.Fixed64 = 1; // 64-bit: double, fixed64, sfixed64
Pbf.Bytes   = 2; // length-delimited: string, bytes, embedded messages, packed repeated fields
Pbf.Fixed32 = 5; // 32-bit: float, fixed32, sfixed32

var SHIFT_LEFT_32 = (1 << 16) * (1 << 16),
    SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32,
    POW_2_63 = Math.pow(2, 63);

Pbf.prototype = {

    destroy: function() {
        this.buf = null;
    },

    // === READING =================================================================

    readFields: function(readField, result, end) {
        end = end || this.length;

        while (this.pos < end) {
            var val = this.readVarint(),
                tag = val >> 3,
                startPos = this.pos;

            readField(tag, result, this);

            if (this.pos === startPos) this.skip(val);
        }
        return result;
    },

    readMessage: function(readField, result) {
        return this.readFields(readField, result, this.readVarint() + this.pos);
    },

    readFixed32: function() {
        var val = this.buf.readUInt32LE(this.pos);
        this.pos += 4;
        return val;
    },

    readSFixed32: function() {
        var val = this.buf.readInt32LE(this.pos);
        this.pos += 4;
        return val;
    },

    // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)

    readFixed64: function() {
        var val = this.buf.readUInt32LE(this.pos) + this.buf.readUInt32LE(this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readSFixed64: function() {
        var val = this.buf.readUInt32LE(this.pos) + this.buf.readInt32LE(this.pos + 4) * SHIFT_LEFT_32;
        this.pos += 8;
        return val;
    },

    readFloat: function() {
        var val = this.buf.readFloatLE(this.pos);
        this.pos += 4;
        return val;
    },

    readDouble: function() {
        var val = this.buf.readDoubleLE(this.pos);
        this.pos += 8;
        return val;
    },

    readVarint: function() {
        var buf = this.buf,
            val, b;

        b = buf[this.pos++]; val  =  b & 0x7f;        if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 7;  if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 14; if (b < 0x80) return val;
        b = buf[this.pos++]; val |= (b & 0x7f) << 21; if (b < 0x80) return val;

        return readVarintRemainder(val, this);
    },

    readVarint64: function() {
        var startPos = this.pos,
            val = this.readVarint();

        if (val < POW_2_63) return val;

        var pos = this.pos - 2;
        while (this.buf[pos] === 0xff) pos--;
        if (pos < startPos) pos = startPos;

        val = 0;
        for (var i = 0; i < pos - startPos + 1; i++) {
            var b = ~this.buf[startPos + i] & 0x7f;
            val += i < 4 ? b << i * 7 : b * Math.pow(2, i * 7);
        }

        return -val - 1;
    },

    readSVarint: function() {
        var num = this.readVarint();
        return num % 2 === 1 ? (num + 1) / -2 : num / 2; // zigzag encoding
    },

    readBoolean: function() {
        return Boolean(this.readVarint());
    },

    readString: function() {
        var end = this.readVarint() + this.pos,
            str = this.buf.toString('utf8', this.pos, end);
        this.pos = end;
        return str;
    },

    readBytes: function() {
        var end = this.readVarint() + this.pos,
            buffer = this.buf.slice(this.pos, end);
        this.pos = end;
        return buffer;
    },

    // verbose for performance reasons; doesn't affect gzipped size

    readPackedVarint: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readVarint());
        return arr;
    },
    readPackedSVarint: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readSVarint());
        return arr;
    },
    readPackedBoolean: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readBoolean());
        return arr;
    },
    readPackedFloat: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readFloat());
        return arr;
    },
    readPackedDouble: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readDouble());
        return arr;
    },
    readPackedFixed32: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readFixed32());
        return arr;
    },
    readPackedSFixed32: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readSFixed32());
        return arr;
    },
    readPackedFixed64: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readFixed64());
        return arr;
    },
    readPackedSFixed64: function() {
        var end = this.readVarint() + this.pos, arr = [];
        while (this.pos < end) arr.push(this.readSFixed64());
        return arr;
    },

    skip: function(val) {
        var type = val & 0x7;
        if (type === Pbf.Varint) while (this.buf[this.pos++] > 0x7f) {}
        else if (type === Pbf.Bytes) this.pos = this.readVarint() + this.pos;
        else if (type === Pbf.Fixed32) this.pos += 4;
        else if (type === Pbf.Fixed64) this.pos += 8;
        else throw new Error('Unimplemented type: ' + type);
    },

    // === WRITING =================================================================

    writeTag: function(tag, type) {
        this.writeVarint((tag << 3) | type);
    },

    realloc: function(min) {
        var length = this.length || 16;

        while (length < this.pos + min) length *= 2;

        if (length !== this.length) {
            var buf = new Buffer(length);
            this.buf.copy(buf);
            this.buf = buf;
            this.length = length;
        }
    },

    finish: function() {
        this.length = this.pos;
        this.pos = 0;
        return this.buf.slice(0, this.length);
    },

    writeFixed32: function(val) {
        this.realloc(4);
        this.buf.writeUInt32LE(val, this.pos);
        this.pos += 4;
    },

    writeSFixed32: function(val) {
        this.realloc(4);
        this.buf.writeInt32LE(val, this.pos);
        this.pos += 4;
    },

    writeFixed64: function(val) {
        this.realloc(8);
        this.buf.writeInt32LE(val & -1, this.pos);
        this.buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeSFixed64: function(val) {
        this.realloc(8);
        this.buf.writeInt32LE(val & -1, this.pos);
        this.buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
        this.pos += 8;
    },

    writeVarint: function(val) {
        val = +val;

        if (val > 0xfffffff) {
            writeBigVarint(val, this);
            return;
        }

        this.realloc(4);

        this.buf[this.pos++] =           val & 0x7f  | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] = ((val >>>= 7) & 0x7f) | (val > 0x7f ? 0x80 : 0); if (val <= 0x7f) return;
        this.buf[this.pos++] =   (val >>> 7) & 0x7f;
    },

    writeSVarint: function(val) {
        this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
    },

    writeBoolean: function(val) {
        this.writeVarint(Boolean(val));
    },

    writeString: function(str) {
        str = String(str);
        var bytes = Buffer.byteLength(str);
        this.writeVarint(bytes);
        this.realloc(bytes);
        this.buf.write(str, this.pos);
        this.pos += bytes;
    },

    writeFloat: function(val) {
        this.realloc(4);
        this.buf.writeFloatLE(val, this.pos);
        this.pos += 4;
    },

    writeDouble: function(val) {
        this.realloc(8);
        this.buf.writeDoubleLE(val, this.pos);
        this.pos += 8;
    },

    writeBytes: function(buffer) {
        var len = buffer.length;
        this.writeVarint(len);
        this.realloc(len);
        for (var i = 0; i < len; i++) this.buf[this.pos++] = buffer[i];
    },

    writeRawMessage: function(fn, obj) {
        this.pos++; // reserve 1 byte for short message length

        // write the message directly to the buffer and see how much was written
        var startPos = this.pos;
        fn(obj, this);
        var len = this.pos - startPos;

        if (len >= 0x80) reallocForRawMessage(startPos, len, this);

        // finally, write the message length in the reserved place and restore the position
        this.pos = startPos - 1;
        this.writeVarint(len);
        this.pos += len;
    },

    writeMessage: function(tag, fn, obj) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeRawMessage(fn, obj);
    },

    writePackedVarint:   function(tag, arr) { this.writeMessage(tag, writePackedVarint, arr);   },
    writePackedSVarint:  function(tag, arr) { this.writeMessage(tag, writePackedSVarint, arr);  },
    writePackedBoolean:  function(tag, arr) { this.writeMessage(tag, writePackedBoolean, arr);  },
    writePackedFloat:    function(tag, arr) { this.writeMessage(tag, writePackedFloat, arr);    },
    writePackedDouble:   function(tag, arr) { this.writeMessage(tag, writePackedDouble, arr);   },
    writePackedFixed32:  function(tag, arr) { this.writeMessage(tag, writePackedFixed32, arr);  },
    writePackedSFixed32: function(tag, arr) { this.writeMessage(tag, writePackedSFixed32, arr); },
    writePackedFixed64:  function(tag, arr) { this.writeMessage(tag, writePackedFixed64, arr);  },
    writePackedSFixed64: function(tag, arr) { this.writeMessage(tag, writePackedSFixed64, arr); },

    writeBytesField: function(tag, buffer) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeBytes(buffer);
    },
    writeFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFixed32(val);
    },
    writeSFixed32Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeSFixed32(val);
    },
    writeFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeFixed64(val);
    },
    writeSFixed64Field: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeSFixed64(val);
    },
    writeVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeVarint(val);
    },
    writeSVarintField: function(tag, val) {
        this.writeTag(tag, Pbf.Varint);
        this.writeSVarint(val);
    },
    writeStringField: function(tag, str) {
        this.writeTag(tag, Pbf.Bytes);
        this.writeString(str);
    },
    writeFloatField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed32);
        this.writeFloat(val);
    },
    writeDoubleField: function(tag, val) {
        this.writeTag(tag, Pbf.Fixed64);
        this.writeDouble(val);
    },
    writeBooleanField: function(tag, val) {
        this.writeVarintField(tag, Boolean(val));
    }
};

function readVarintRemainder(val, pbf) {
    var buf = pbf.buf, b;

    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x10000000;         if (b < 0x80) return val;
    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x800000000;        if (b < 0x80) return val;
    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x40000000000;      if (b < 0x80) return val;
    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x2000000000000;    if (b < 0x80) return val;
    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x100000000000000;  if (b < 0x80) return val;
    b = buf[pbf.pos++]; val += (b & 0x7f) * 0x8000000000000000; if (b < 0x80) return val;

    throw new Error('Expected varint not more than 10 bytes');
}

function writeBigVarint(val, pbf) {
    pbf.realloc(10);

    var maxPos = pbf.pos + 10;

    while (val >= 1) {
        if (pbf.pos >= maxPos) throw new Error('Given varint doesn\'t fit into 10 bytes');
        var b = val & 0xff;
        pbf.buf[pbf.pos++] = b | (val >= 0x80 ? 0x80 : 0);
        val /= 0x80;
    }
}

function reallocForRawMessage(startPos, len, pbf) {
    var extraLen =
        len <= 0x3fff ? 1 :
        len <= 0x1fffff ? 2 :
        len <= 0xfffffff ? 3 : Math.ceil(Math.log(len) / (Math.LN2 * 7));

    // if 1 byte isn't enough for encoding message length, shift the data to the right
    pbf.realloc(extraLen);
    for (var i = pbf.pos - 1; i >= startPos; i--) pbf.buf[i + extraLen] = pbf.buf[i];
}

function writePackedVarint(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeVarint(arr[i]);   }
function writePackedSVarint(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeSVarint(arr[i]);  }
function writePackedFloat(arr, pbf)    { for (var i = 0; i < arr.length; i++) pbf.writeFloat(arr[i]);    }
function writePackedDouble(arr, pbf)   { for (var i = 0; i < arr.length; i++) pbf.writeDouble(arr[i]);   }
function writePackedBoolean(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeBoolean(arr[i]);  }
function writePackedFixed32(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed32(arr[i]);  }
function writePackedSFixed32(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed32(arr[i]); }
function writePackedFixed64(arr, pbf)  { for (var i = 0; i < arr.length; i++) pbf.writeFixed64(arr[i]);  }
function writePackedSFixed64(arr, pbf) { for (var i = 0; i < arr.length; i++) pbf.writeSFixed64(arr[i]); }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./buffer":7}],9:[function(require,module,exports){
'use strict';

module.exports = Point;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
    clone: function() { return new Point(this.x, this.y); },

    add:     function(p) { return this.clone()._add(p);     },
    sub:     function(p) { return this.clone()._sub(p);     },
    mult:    function(k) { return this.clone()._mult(k);    },
    div:     function(k) { return this.clone()._div(k);     },
    rotate:  function(a) { return this.clone()._rotate(a);  },
    matMult: function(m) { return this.clone()._matMult(m); },
    unit:    function() { return this.clone()._unit(); },
    perp:    function() { return this.clone()._perp(); },
    round:   function() { return this.clone()._round(); },

    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    equals: function(p) {
        return this.x === p.x &&
               this.y === p.y;
    },

    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },

    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },

    // Find the angle of the two vectors, solving the formula for the cross product a x b = |a||b|sin(θ) for θ.
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _unit: function() {
        this._div(this.mag());
        return this;
    },

    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

// constructs Point from an array if necessary
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

},{}],10:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],12:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],13:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":12,"_process":10,"inherits":11}],14:[function(require,module,exports){
module.exports.VectorTile = require('./lib/vectortile.js');
module.exports.VectorTileFeature = require('./lib/vectortilefeature.js');
module.exports.VectorTileLayer = require('./lib/vectortilelayer.js');

},{"./lib/vectortile.js":15,"./lib/vectortilefeature.js":16,"./lib/vectortilelayer.js":17}],15:[function(require,module,exports){
'use strict';

var VectorTileLayer = require('./vectortilelayer');

module.exports = VectorTile;

function VectorTile(pbf, end) {
    this.layers = pbf.readFields(readTile, {}, end);
}

function readTile(tag, layers, pbf) {
    if (tag === 3) {
        var layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
        if (layer.length) layers[layer.name] = layer;
    }
}


},{"./vectortilelayer":17}],16:[function(require,module,exports){
'use strict';

var Point = require('point-geometry');

module.exports = VectorTileFeature;

function VectorTileFeature(pbf, end, extent, keys, values) {
    // Public
    this.properties = {};
    this.extent = extent;
    this.type = 0;

    // Private
    this._pbf = pbf;
    this._geometry = -1;
    this._keys = keys;
    this._values = values;

    pbf.readFields(readFeature, this, end);
}

function readFeature(tag, feature, pbf) {
    if (tag == 1) feature.id = pbf.readVarint();
    else if (tag == 2) readTag(pbf, feature);
    else if (tag == 3) feature.type = pbf.readVarint();
    else if (tag == 4) feature._geometry = pbf.pos;
}

function readTag(pbf, feature) {
    var end = pbf.readVarint() + pbf.pos;

    while (pbf.pos < end) {
        var key = feature._keys[pbf.readVarint()],
            value = feature._values[pbf.readVarint()];
        feature.properties[key] = value;
    }
}

VectorTileFeature.types = ['Unknown', 'Point', 'LineString', 'Polygon'];

VectorTileFeature.prototype.loadGeometry = function() {
    var pbf = this._pbf;
    pbf.pos = this._geometry;

    var end = pbf.readVarint() + pbf.pos,
        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        lines = [],
        line;

    while (pbf.pos < end) {
        if (!length) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 0x7;
            length = cmdLen >> 3;
        }

        length--;

        if (cmd === 1 || cmd === 2) {
            x += pbf.readSVarint();
            y += pbf.readSVarint();

            if (cmd === 1) { // moveTo
                if (line) lines.push(line);
                line = [];
            }

            line.push(new Point(x, y));

        } else if (cmd === 7) {

            // Workaround for https://github.com/mapbox/mapnik-vector-tile/issues/90
            if (line) {
                line.push(line[0].clone()); // closePolygon
            }

        } else {
            throw new Error('unknown command ' + cmd);
        }
    }

    if (line) lines.push(line);

    return lines;
};

VectorTileFeature.prototype.bbox = function() {
    var pbf = this._pbf;
    pbf.pos = this._geometry;

    var end = pbf.readVarint() + pbf.pos,
        cmd = 1,
        length = 0,
        x = 0,
        y = 0,
        x1 = Infinity,
        x2 = -Infinity,
        y1 = Infinity,
        y2 = -Infinity;

    while (pbf.pos < end) {
        if (!length) {
            var cmdLen = pbf.readVarint();
            cmd = cmdLen & 0x7;
            length = cmdLen >> 3;
        }

        length--;

        if (cmd === 1 || cmd === 2) {
            x += pbf.readSVarint();
            y += pbf.readSVarint();
            if (x < x1) x1 = x;
            if (x > x2) x2 = x;
            if (y < y1) y1 = y;
            if (y > y2) y2 = y;

        } else if (cmd !== 7) {
            throw new Error('unknown command ' + cmd);
        }
    }

    return [x1, y1, x2, y2];
};

VectorTileFeature.prototype.toGeoJSON = function(x, y, z) {
    var size = this.extent * Math.pow(2, z),
        x0 = this.extent * x,
        y0 = this.extent * y,
        coords = this.loadGeometry(),
        type = VectorTileFeature.types[this.type],
        i, j;

    function project(line) {
        for (var j = 0; j < line.length; j++) {
            var p = line[j], y2 = 180 - (p.y + y0) * 360 / size;
            line[j] = [
                (p.x + x0) * 360 / size - 180,
                360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90
            ];
        }
    }

    switch (this.type) {
    case 1:
        var points = [];
        for (i = 0; i < coords.length; i++) {
            points[i] = coords[i][0];
        }
        coords = points;
        project(coords);
        break;

    case 2:
        for (i = 0; i < coords.length; i++) {
            project(coords[i]);
        }
        break;

    case 3:
        coords = classifyRings(coords);
        for (i = 0; i < coords.length; i++) {
            for (j = 0; j < coords[i].length; j++) {
                project(coords[i][j]);
            }
        }
        break;
    }

    if (coords.length === 1) {
        coords = coords[0];
    } else {
        type = 'Multi' + type;
    }

    var result = {
        type: "Feature",
        geometry: {
            type: type,
            coordinates: coords
        },
        properties: this.properties
    };

    if ('id' in this) {
        result.id = this.id;
    }

    return result;
};

// classifies an array of rings into polygons with outer rings and holes

function classifyRings(rings) {
    var len = rings.length;

    if (len <= 1) return [rings];

    var polygons = [],
        polygon,
        ccw;

    for (var i = 0; i < len; i++) {
        var area = signedArea(rings[i]);
        if (area === 0) continue;

        if (ccw === undefined) ccw = area < 0;

        if (ccw === area < 0) {
            if (polygon) polygons.push(polygon);
            polygon = [rings[i]];

        } else {
            polygon.push(rings[i]);
        }
    }
    if (polygon) polygons.push(polygon);

    return polygons;
}

function signedArea(ring) {
    var sum = 0;
    for (var i = 0, len = ring.length, j = len - 1, p1, p2; i < len; j = i++) {
        p1 = ring[i];
        p2 = ring[j];
        sum += (p2.x - p1.x) * (p1.y + p2.y);
    }
    return sum;
}

},{"point-geometry":9}],17:[function(require,module,exports){
'use strict';

var VectorTileFeature = require('./vectortilefeature.js');

module.exports = VectorTileLayer;

function VectorTileLayer(pbf, end) {
    // Public
    this.version = 1;
    this.name = null;
    this.extent = 4096;
    this.length = 0;

    // Private
    this._pbf = pbf;
    this._keys = [];
    this._values = [];
    this._features = [];

    pbf.readFields(readLayer, this, end);

    this.length = this._features.length;
}

function readLayer(tag, layer, pbf) {
    if (tag === 15) layer.version = pbf.readVarint();
    else if (tag === 1) layer.name = pbf.readString();
    else if (tag === 5) layer.extent = pbf.readVarint();
    else if (tag === 2) layer._features.push(pbf.pos);
    else if (tag === 3) layer._keys.push(pbf.readString());
    else if (tag === 4) layer._values.push(readValueMessage(pbf));
}

function readValueMessage(pbf) {
    var value = null,
        end = pbf.readVarint() + pbf.pos;

    while (pbf.pos < end) {
        var tag = pbf.readVarint() >> 3;

        value = tag === 1 ? pbf.readString() :
            tag === 2 ? pbf.readFloat() :
            tag === 3 ? pbf.readDouble() :
            tag === 4 ? pbf.readVarint64() :
            tag === 5 ? pbf.readVarint() :
            tag === 6 ? pbf.readSVarint() :
            tag === 7 ? pbf.readBoolean() : null;
    }

    return value;
}

// return feature `i` from this layer as a `VectorTileFeature`
VectorTileLayer.prototype.feature = function(i) {
    if (i < 0 || i >= this._features.length) throw new Error('feature index out of bounds');

    this._pbf.pos = this._features[i];

    var end = this._pbf.readVarint() + this._pbf.pos;
    return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
};

},{"./vectortilefeature.js":16}],18:[function(require,module,exports){
//adapted from https://github.com/mapbox/mapbox-gl-js/blob/5886421ea9a5ae26797c950ec698be473fe87d17/src/style-spec/feature_filter/index.js

'use strict';

module.exports = createFilter;

var types = ['Unknown', 'Point', 'LineString', 'Polygon'];

/**
 * Given a filter expressed as nested arrays, return a new function
 * that evaluates whether a given feature (with a .properties or .tags property)
 * passes its test.
 *
 * @private
 * @param {Array} filter mapbox gl filter
 * @returns {Function} filter-evaluating function
 */
function createFilter(filter) {
    return new Function('f', ("var p = (f && f.properties || {}); return " + (compile(filter))));
}

function compile(filter) {
    if (!filter) { return 'true'; }
    var op = filter[0];
    if (filter.length <= 1) { return op === 'any' ? 'false' : 'true'; }
    var str =
        op === '==' ? compileComparisonOp(filter[1], filter[2], '===', false) :
        op === '!=' ? compileComparisonOp(filter[1], filter[2], '!==', false) :
        op === '<' ||
        op === '>' ||
        op === '<=' ||
        op === '>=' ? compileComparisonOp(filter[1], filter[2], op, true) :
        op === '~=' ? compileRegexOp(filter[1], filter[2]) :
        op === 'any' ? compileLogicalOp(filter.slice(1), '||') :
        op === 'all' ? compileLogicalOp(filter.slice(1), '&&') :
        op === 'none' ? compileNegation(compileLogicalOp(filter.slice(1), '||')) :
        op === 'in' ? compileInOp(filter[1], filter.slice(2)) :
        op === '!in' ? compileNegation(compileInOp(filter[1], filter.slice(2))) :
        op === 'has' ? compileHasOp(filter[1]) :
        op === '!has' ? compileNegation(compileHasOp(filter[1])) :
        'true';
    return ("(" + str + ")");
}

function compilePropertyReference(property) {
    return property === '$type' ? 'f.type' :
        property === '$id' ? 'f.id' :
        ("p[" + (JSON.stringify(property)) + "]");
}

function compileComparisonOp(property, value, op, checkType) {
    var left = compilePropertyReference(property);
    var right = property === '$type' ? types.indexOf(value) : JSON.stringify(value);
    return (checkType ? ("typeof " + left + "=== typeof " + right + "&&") : '') + left + op + right;
}

function compileRegexOp(property, value) {
    var left = compilePropertyReference(property);
    var right = value; //JSON.stringify(value);
    return ("" + ('function(left, right) {' +
    'return left.toString().match(right);' +
    '}(') + left + ", " + right + ")");
}

function compileLogicalOp(expressions, op) {
    return expressions.map(compile).join(op);
}

function compileInOp(property, values) {
    if (property === '$type') { values = values.map(function (value) {
        return types.indexOf(value);
    }); }
    var left = JSON.stringify(values.sort(compare));
    var right = compilePropertyReference(property);

    if (values.length <= 200) { return (left + ".indexOf(" + right + ") !== -1"); }

    return ("" + ('function(v, a, i, j) {' +
        'while (i <= j) { var m = (i + j) >> 1;' +
        '    if (a[m] === v) return true; if (a[m] > v) j = m - 1; else i = m + 1;' +
        '}' +
    'return false; }(') + right + ", " + left + ",0," + (values.length - 1) + ")");
}

function compileHasOp(property) {
    return property === '$id' ? '"id" in f' : ((JSON.stringify(property)) + " in p");
}

function compileNegation(expression) {
    return ("!(" + expression + ")");
}

// Comparison function to sort numbers and strings
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

},{}],19:[function(require,module,exports){
'use strict';

var vt = require('vector-tile');
var Protobuf = require('pbf');
var GeoJSONFeature = require('mapbox-gl/src/util/vectortile_to_geojson');
var TileCoord = require('mapbox-gl/src/source/tile_coord');
var featureFilter = require('./feature_filter');

module.exports = {

    querySourceFeatures: function querySourceFeatures(sourceID, params, map) {
        var this$1 = this;

        var sourceCache = map.style.sourceCaches[sourceID];

         //from: https://github.com/mapbox/mapbox-gl-js/blob/5886421ea9a5ae26797c950ec698be473fe87d17/src/source/query_features.js#L25
        var tiles = sourceCache.getRenderableIds().map(function (id) {
            return sourceCache.getTileByID(id);
        });

        var result = [];

        var dataTiles = {};
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            var dataID = new TileCoord(Math.min(tile.sourceMaxZoom, tile.coord.z), tile.coord.x, tile.coord.y, 0).id;
            if (!dataTiles[dataID]) {
                dataTiles[dataID] = true;
                this$1.queryTile(result, params, tile);
            }
        }

        return result;

    },

    queryTile: function queryTile(result, params, tile) {
        if (!tile.rawTileData) { return; }

        if (!tile.vtLayers) {
            tile.vtLayers = new vt.VectorTile(new Protobuf(tile.rawTileData)).layers;
        }

        var layer = tile.vtLayers._geojsonTileLayer || tile.vtLayers[params.sourceLayer];

        if (!layer) { return; }

        var filter = featureFilter(params && params.filter);
        var coord = {z: tile.coord.z, x: tile.coord.x, y: tile.coord.y};

        for (var i = 0; i < layer.length; i++) {
            var feature = layer.feature(i);
            if (filter(feature)) {
                var geojsonFeature = new GeoJSONFeature(feature, tile.coord.z, tile.coord.x, tile.coord.y);
                geojsonFeature.tile = coord;
                result.push(geojsonFeature);
            }
        }
    }

};

},{"./feature_filter":18,"mapbox-gl/src/source/tile_coord":5,"mapbox-gl/src/util/vectortile_to_geojson":6,"pbf":8,"vector-tile":14}]},{},[19])(19)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQG1hcGJveC93aG9vdHMtanMvaW5kZXgudW1kLmpzIiwibm9kZV9tb2R1bGVzL2Fzc2VydC9hc3NlcnQuanMiLCJub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIi9Vc2Vycy9rcmlzL2Rldi9tYXBodWJzL21hcGJveC1nbC1yZWdleC1xdWVyeS9ub2RlX21vZHVsZXMvbWFwYm94LWdsL3NyYy9nZW8vY29vcmRpbmF0ZS5qcyIsIi9Vc2Vycy9rcmlzL2Rldi9tYXBodWJzL21hcGJveC1nbC1yZWdleC1xdWVyeS9ub2RlX21vZHVsZXMvbWFwYm94LWdsL3NyYy9zb3VyY2UvdGlsZV9jb29yZC5qcyIsIi9Vc2Vycy9rcmlzL2Rldi9tYXBodWJzL21hcGJveC1nbC1yZWdleC1xdWVyeS9ub2RlX21vZHVsZXMvbWFwYm94LWdsL3NyYy91dGlsL3ZlY3RvcnRpbGVfdG9fZ2VvanNvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYmYvYnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL3BiZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wb2ludC1nZW9tZXRyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXRpbC9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy91dGlsL3N1cHBvcnQvaXNCdWZmZXJCcm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3V0aWwvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy92ZWN0b3ItdGlsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy92ZWN0b3ItdGlsZS9saWIvdmVjdG9ydGlsZS5qcyIsIm5vZGVfbW9kdWxlcy92ZWN0b3ItdGlsZS9saWIvdmVjdG9ydGlsZWZlYXR1cmUuanMiLCJub2RlX21vZHVsZXMvdmVjdG9yLXRpbGUvbGliL3ZlY3RvcnRpbGVsYXllci5qcyIsIi9Vc2Vycy9rcmlzL2Rldi9tYXBodWJzL21hcGJveC1nbC1yZWdleC1xdWVyeS9zcmMvZmVhdHVyZV9maWx0ZXIuanMiLCIvVXNlcnMva3Jpcy9kZXYvbWFwaHVicy9tYXBib3gtZ2wtcmVnZXgtcXVlcnkvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkEsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7QUFZYixJQUFNLFVBQVUsR0FBQyxBQUlqQixBQUFJLG1CQUFXLENBQUMsTUFBTSxJQUFJLEFBQUks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QUFFO0lBQ3hCLEFBQUksTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxBQUFJLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0MsQUFBSSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztJQUUvQyxBQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFBOztJQUV4QixBQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEIsQUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLEFBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQixBQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0lBRWhCLEFBQUk7SUFDSixBQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDWCxBQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUE7SUFDOUIsQUFBSSxHQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEFBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVB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SUFDbkUsQUFBSSxDQUFDOztJQUVMLEFBQUksR0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixBQUFJLEdBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQUFBSSxHQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLEFBQUksT0FBTztRQUNQLEFBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQyxBQUFJLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLEFBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEMsQUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUMsQUFBSSxDQUFDLENBQUM7QUFDVixBQUFJLENBQUMsQ0FBQSxBQUNKOzs7OztBQUtELFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDakQsT0FBTztRQUNILEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTTtRQUNaLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRztRQUNULEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTTtRQUNaLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRztRQUNULEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNO1FBQ3ZCLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHO0tBQ3BCLENBQUM7Q0FDTDs7QUFFRCxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0lBQzdDLEdBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QyxHQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztJQUc1QyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzdDLEdBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDakM7OztJQUdELEdBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3pCLEdBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3pCLEdBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQixLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsR0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyRSxHQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7Q0FDSjs7QUFFRCxTQUFTLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtJQUNqRCxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0lBRXBCLEdBQUcsQ0FBQyxDQUFDLENBQUM7OztJQUdOLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7SUFDL0MsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUMvQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7SUFHL0MsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUEsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFBO0lBQ25ELElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFBLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBQTtDQUN0RDs7QUFFRCxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUU7SUFDOUQsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUU7UUFDakMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0tBQzVCO0lBQ0QsR0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLEdBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOztJQUViLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ3pCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDdEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7b0JBQ3ZDLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3ZCO2FBQ0o7U0FDSjtLQUNKOzs7Ozs7SUFNRCxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFFbEUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFBLENBQUMsRUFBRSxFQUFFLEFBQUc7UUFDOUIsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDaEIsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7O0FBR0YsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUUsRUFBRTtJQUM1QixHQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsR0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLEdBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDL0MsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFBO0lBQ2hDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDUCxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQ3BDLENBQUM7O0FBRUYsU0FBUyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDO0lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsT0FBTyxPQUFPLENBQUM7Q0FDbEI7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7OztBQ3ZNM0IsWUFBWSxDQUFDOztBQUViLElBQU0sT0FBTyxHQUFDLEFBQ2QsQUFBSSxnQkFBVyxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ3hDLEFBQUksSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7O0lBRTFCLEFBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBQ2hELEFBQUksaUJBQWlCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QixBQUFJLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0IsQUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQUU3QixBQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDOztJQUVuRCxBQUFJLElBQUksaUJBQWlCLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRTtRQUNsQyxBQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLEFBQUksQ0FBQztBQUNULEFBQUksQ0FBQzs7MENBQUE7O0FBRUwsQUFBSSxtQkFBQSxBQUFJLFFBQVEsZ0JBQUEsR0FBRztJQUNmLEFBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNsQyxBQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7WUFDbEQsQUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUM5QixBQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzlCLEFBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNqRCxBQUFJLENBQUM7SUFDTCxBQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUM5QixBQUFJLENBQUMsQ0FBQTs7QUFFTCxBQUFJLG1CQUFBLEFBQUksUUFBUSxnQkFBQSxDQUFDLENBQUMsRUFBRTtJQUNoQixBQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLEFBQUksQ0FBQyxDQUFBOztBQUVMLEFBQUksa0JBQUEsTUFBTSxtQkFBQSxHQUFHLENBQUM7O0FBQUE7SUFDVixBQUFJLEdBQUssQ0FBQyxJQUFJLEdBQUc7UUFDYixBQUFJLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtJQUMvQixBQUFJLENBQUMsQ0FBQztJQUNOLEFBQUksS0FBSyxHQUFLLENBQUMsQ0FBQyxJQUFJLE1BQUksRUFBRTtRQUN0QixBQUFJLElBQUksQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLEtBQUssb0JBQW9CLEVBQUUsRUFBQSxTQUFTLEVBQUE7UUFDbEUsQUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLEFBQUksQ0FBQztJQUNMLEFBQUksT0FBTyxJQUFJLENBQUM7QUFDcEIsQUFBSSxDQUFDLENBQUEsQUFDSjs7aUVBQUE7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7OztBQzVDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFrQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBOztBQUVBLFlBQVksQ0FBQzs7QUFFYixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzs7QUFFOUIsR0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQVc1RCxTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUU7SUFDMUIsT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQSw0Q0FBMkMsSUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBRSxDQUFDLENBQUM7Q0FDNUY7O0FBRUQsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFO0lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQSxPQUFPLE1BQU0sQ0FBQyxFQUFBO0lBQzNCLEdBQUssQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsRUFBQSxPQUFPLEVBQUUsS0FBSyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxFQUFBO0lBQy9ELEdBQUssQ0FBQyxHQUFHO1FBQ0wsRUFBRSxLQUFLLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDckUsRUFBRSxLQUFLLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFDckUsRUFBRSxLQUFLLEdBQUc7UUFDVixFQUFFLEtBQUssR0FBRztRQUNWLEVBQUUsS0FBSyxJQUFJO1FBQ1gsRUFBRSxLQUFLLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUM7UUFDakUsRUFBRSxLQUFLLElBQUksR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxFQUFFLEtBQUssS0FBSyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ3RELEVBQUUsS0FBSyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDdEQsRUFBRSxLQUFLLE1BQU0sR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxFQUFFLEtBQUssSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxFQUFFLEtBQUssS0FBSyxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxFQUFFLEtBQUssS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsRUFBRSxLQUFLLE1BQU0sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQztJQUNYLE9BQU8sQ0FBQSxHQUFFLEdBQUUsR0FBRyxNQUFFLENBQUMsQ0FBQztDQUNyQjs7QUFFRCxTQUFTLHdCQUF3QixDQUFDLFFBQVEsRUFBRTtJQUN4QyxPQUFPLFFBQVEsS0FBSyxPQUFPLEdBQUcsUUFBUTtRQUNsQyxRQUFRLEtBQUssS0FBSyxHQUFHLE1BQU07UUFDM0IsQ0FBQSxJQUFHLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxNQUFFLENBQUMsQ0FBQztDQUN4Qzs7QUFFRCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRTtJQUN6RCxHQUFLLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELEdBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxLQUFLLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEYsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFBLFNBQVEsR0FBRSxJQUFJLGdCQUFZLEdBQUUsS0FBSyxPQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztDQUN2Rjs7QUFFRCxTQUFTLGNBQWMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO0lBQ3JDLEdBQUssQ0FBQyxJQUFJLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsR0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEIsT0FBTyxDQUFBLEVBQUMsSUFBRSx5QkFBeUI7SUFDbkMsc0NBQXNDO0lBQ3RDLElBQUksQ0FBQSxHQUFHLElBQUksT0FBRyxHQUFFLEtBQUssTUFBRSxDQUFDLENBQUM7Q0FDNUI7O0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDNUM7O0FBRUQsU0FBUyxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRTtJQUNuQyxJQUFJLFFBQVEsS0FBSyxPQUFPLEVBQUUsRUFBQSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFBLENBQUMsS0FBSyxFQUFFLEFBQUc7UUFDckQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CLENBQUMsQ0FBQyxFQUFBO0lBQ0gsR0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRCxHQUFLLENBQUMsS0FBSyxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDOztJQUVqRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBQUEsT0FBTyxDQUFBLEFBQUcsSUFBSSxjQUFVLEdBQUUsS0FBSyxhQUFTLENBQUMsQ0FBQyxFQUFBOztJQUVwRSxPQUFPLENBQUEsRUFBQyxJQUFFLHdCQUF3QjtRQUM5Qix3Q0FBd0M7UUFDeEMsMkVBQTJFO1FBQzNFLEdBQUc7SUFDUCxrQkFBa0IsQ0FBQSxHQUFHLEtBQUssT0FBRyxHQUFFLElBQUksUUFBSSxJQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLE1BQUUsQ0FBQyxDQUFDO0NBQ2pFOztBQUVELFNBQVMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QixPQUFPLFFBQVEsS0FBSyxLQUFLLEdBQUcsV0FBVyxHQUFHLENBQUEsQ0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBLFVBQU0sQ0FBQyxDQUFDO0NBQ2hGOztBQUVELFNBQVMsZUFBZSxDQUFDLFVBQVUsRUFBRTtJQUNqQyxPQUFPLENBQUEsSUFBRyxHQUFFLFVBQVUsTUFBRSxDQUFDLENBQUM7Q0FDN0I7OztBQUdELFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNyQzs7O0FDL0ZELFlBQVksQ0FBQzs7QUFFYixHQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsQyxHQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxHQUFLLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQzNFLEdBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDN0QsR0FBSyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFbEQsTUFBTSxDQUFDLE9BQU8sR0FBRzs7SUFFYixtQkFBbUIsOEJBQUEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOztBQUFBO1FBQ3hDLEdBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7OztRQUdyRCxHQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFBLENBQUMsRUFBRSxFQUFFLEFBQUc7WUFDckQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDLENBQUMsQ0FBQzs7UUFFSCxHQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7UUFFbEIsR0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxHQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixHQUFLLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMzRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixNQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEM7U0FDSjs7UUFFRCxPQUFPLE1BQU0sQ0FBQzs7S0FFakI7O0lBRUQsU0FBUyxvQkFBQSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUEsT0FBTyxFQUFBOztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDNUU7O1FBRUQsR0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUVuRixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUEsT0FBTyxFQUFBOztRQUVuQixHQUFLLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELEdBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUVsRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLEdBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDakIsR0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsY0FBYyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDL0I7U0FDSjtLQUNKOztDQUVKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLldob29UUyA9IGdsb2JhbC5XaG9vVFMgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykge1xuXG4vKipcbiAqIGdldFVSTFxuICpcbiAqIEBwYXJhbSAgICB7U3RyaW5nfSAgYmFzZVVybCAgQmFzZSB1cmwgb2YgdGhlIFdNUyBzZXJ2ZXJcbiAqIEBwYXJhbSAgICB7U3RyaW5nfSAgbGF5ZXIgICAgTGF5ZXIgbmFtZVxuICogQHBhcmFtICAgIHtOdW1iZXJ9ICB4ICAgICAgICBUaWxlIGNvb3JkaW5hdGUgeFxuICogQHBhcmFtICAgIHtOdW1iZXJ9ICB5ICAgICAgICBUaWxlIGNvb3JkaW5hdGUgeVxuICogQHBhcmFtICAgIHtOdW1iZXJ9ICB6ICAgICAgICBUaWxlIHpvb21cbiAqIEBwYXJhbSAgICB7T2JqZWN0fSAgW29wdGlvbnNdXG4gKiBAcGFyYW0gICAge1N0cmluZ30gIFtvcHRpb25zLmZvcm1hdD0naW1hZ2UvcG5nJ11cbiAqIEBwYXJhbSAgICB7U3RyaW5nfSAgW29wdGlvbnMuc2VydmljZT0nV01TJ11cbiAqIEBwYXJhbSAgICB7U3RyaW5nfSAgW29wdGlvbnMudmVyc2lvbj0nMS4xLjEnXVxuICogQHBhcmFtICAgIHtTdHJpbmd9ICBbb3B0aW9ucy5yZXF1ZXN0PSdHZXRNYXAnXVxuICogQHBhcmFtICAgIHtTdHJpbmd9ICBbb3B0aW9ucy5zcnM9J0VQU0c6Mzg1NyddXG4gKiBAcGFyYW0gICAge051bWJlcn0gIFtvcHRpb25zLndpZHRoPScyNTYnXVxuICogQHBhcmFtICAgIHtOdW1iZXJ9ICBbb3B0aW9ucy5oZWlnaHQ9JzI1NiddXG4gKiBAcmV0dXJucyAge1N0cmluZ30gIHVybFxuICogQGV4YW1wbGVcbiAqIHZhciBiYXNlVXJsID0gJ2h0dHA6Ly9nZW9kYXRhLnN0YXRlLm5qLnVzL2ltYWdlcnl3bXMvTmF0dXJhbDIwMTUnO1xuICogdmFyIGxheWVyID0gJ05hdHVyYWwyMDE1JztcbiAqIHZhciB1cmwgPSB3aG9vdHMuZ2V0VVJMKGJhc2VVcmwsIGxheWVyLCAxNTQzMDgsIDE5NzE2NywgMTkpO1xuICovXG5mdW5jdGlvbiBnZXRVUkwoYmFzZVVybCwgbGF5ZXIsIHgsIHksIHosIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgJz8nICsgW1xuICAgICAgICAnYmJveD0nICAgICsgZ2V0VGlsZUJCb3goeCwgeSwgeiksXG4gICAgICAgICdmb3JtYXQ9JyAgKyAob3B0aW9ucy5mb3JtYXQgfHwgJ2ltYWdlL3BuZycpLFxuICAgICAgICAnc2VydmljZT0nICsgKG9wdGlvbnMuc2VydmljZSB8fCAnV01TJyksXG4gICAgICAgICd2ZXJzaW9uPScgKyAob3B0aW9ucy52ZXJzaW9uIHx8ICcxLjEuMScpLFxuICAgICAgICAncmVxdWVzdD0nICsgKG9wdGlvbnMucmVxdWVzdCB8fCAnR2V0TWFwJyksXG4gICAgICAgICdzcnM9JyAgICAgKyAob3B0aW9ucy5zcnMgfHwgJ0VQU0c6Mzg1NycpLFxuICAgICAgICAnd2lkdGg9JyAgICsgKG9wdGlvbnMud2lkdGggfHwgMjU2KSxcbiAgICAgICAgJ2hlaWdodD0nICArIChvcHRpb25zLmhlaWdodCB8fCAyNTYpLFxuICAgICAgICAnbGF5ZXJzPScgICsgbGF5ZXJcbiAgICBdLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiB1cmw7XG59XG5cblxuLyoqXG4gKiBnZXRUaWxlQkJveFxuICpcbiAqIEBwYXJhbSAgICB7TnVtYmVyfSAgeCAgVGlsZSBjb29yZGluYXRlIHhcbiAqIEBwYXJhbSAgICB7TnVtYmVyfSAgeSAgVGlsZSBjb29yZGluYXRlIHlcbiAqIEBwYXJhbSAgICB7TnVtYmVyfSAgeiAgVGlsZSB6b29tXG4gKiBAcmV0dXJucyAge1N0cmluZ30gIFN0cmluZyBvZiB0aGUgYm91bmRpbmcgYm94XG4gKi9cbmZ1bmN0aW9uIGdldFRpbGVCQm94KHgsIHksIHopIHtcbiAgICAvLyBmb3IgR29vZ2xlL09TTSB0aWxlIHNjaGVtZSB3ZSBuZWVkIHRvIGFsdGVyIHRoZSB5XG4gICAgeSA9IChNYXRoLnBvdygyLCB6KSAtIHkgLSAxKTtcblxuICAgIHZhciBtaW4gPSBnZXRNZXJjQ29vcmRzKHggKiAyNTYsIHkgKiAyNTYsIHopLFxuICAgICAgICBtYXggPSBnZXRNZXJjQ29vcmRzKCh4ICsgMSkgKiAyNTYsICh5ICsgMSkgKiAyNTYsIHopO1xuXG4gICAgcmV0dXJuIG1pblswXSArICcsJyArIG1pblsxXSArICcsJyArIG1heFswXSArICcsJyArIG1heFsxXTtcbn1cblxuXG4vKipcbiAqIGdldE1lcmNDb29yZHNcbiAqXG4gKiBAcGFyYW0gICAge051bWJlcn0gIHggIFBpeGVsIGNvb3JkaW5hdGUgeFxuICogQHBhcmFtICAgIHtOdW1iZXJ9ICB5ICBQaXhlbCBjb29yZGluYXRlIHlcbiAqIEBwYXJhbSAgICB7TnVtYmVyfSAgeiAgVGlsZSB6b29tXG4gKiBAcmV0dXJucyAge0FycmF5fSAgIFt4LCB5XVxuICovXG5mdW5jdGlvbiBnZXRNZXJjQ29vcmRzKHgsIHksIHopIHtcbiAgICB2YXIgcmVzb2x1dGlvbiA9ICgyICogTWF0aC5QSSAqIDYzNzgxMzcgLyAyNTYpIC8gTWF0aC5wb3coMiwgeiksXG4gICAgICAgIG1lcmNfeCA9ICh4ICogcmVzb2x1dGlvbiAtIDIgKiBNYXRoLlBJICAqIDYzNzgxMzcgLyAyLjApLFxuICAgICAgICBtZXJjX3kgPSAoeSAqIHJlc29sdXRpb24gLSAyICogTWF0aC5QSSAgKiA2Mzc4MTM3IC8gMi4wKTtcblxuICAgIHJldHVybiBbbWVyY194LCBtZXJjX3ldO1xufVxuXG5leHBvcnRzLmdldFVSTCA9IGdldFVSTDtcbmV4cG9ydHMuZ2V0VGlsZUJCb3ggPSBnZXRUaWxlQkJveDtcbmV4cG9ydHMuZ2V0TWVyY0Nvb3JkcyA9IGdldE1lcmNDb29yZHM7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGNvbXBhcmUgYW5kIGlzQnVmZmVyIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvYmxvYi82ODBlOWU1ZTQ4OGYyMmFhYzI3NTk5YTU3ZGM4NDRhNjMxNTkyOGRkL2luZGV4LmpzXG4vLyBvcmlnaW5hbCBub3RpY2U6XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIHggPSBhLmxlbmd0aDtcbiAgdmFyIHkgPSBiLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIHkgPSBiW2ldO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIGlmICh5IDwgeCkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAwO1xufVxuZnVuY3Rpb24gaXNCdWZmZXIoYikge1xuICBpZiAoZ2xvYmFsLkJ1ZmZlciAmJiB0eXBlb2YgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKGIpO1xuICB9XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpO1xufVxuXG4vLyBiYXNlZCBvbiBub2RlIGFzc2VydCwgb3JpZ2luYWwgbm90aWNlOlxuXG4vLyBodHRwOi8vd2lraS5jb21tb25qcy5vcmcvd2lraS9Vbml0X1Rlc3RpbmcvMS4wXG4vL1xuLy8gVEhJUyBJUyBOT1QgVEVTVEVEIE5PUiBMSUtFTFkgVE8gV09SSyBPVVRTSURFIFY4IVxuLy9cbi8vIE9yaWdpbmFsbHkgZnJvbSBuYXJ3aGFsLmpzIChodHRwOi8vbmFyd2hhbGpzLm9yZylcbi8vIENvcHlyaWdodCAoYykgMjAwOSBUaG9tYXMgUm9iaW5zb24gPDI4MG5vcnRoLmNvbT5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAnU29mdHdhcmUnKSwgdG9cbi8vIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4vLyByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Jcbi8vIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgJ0FTIElTJywgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOXG4vLyBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4vLyBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsLycpO1xudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcFNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGZ1bmN0aW9uc0hhdmVOYW1lcyA9IChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmb28oKSB7fS5uYW1lID09PSAnZm9vJztcbn0oKSk7XG5mdW5jdGlvbiBwVG9TdHJpbmcgKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5mdW5jdGlvbiBpc1ZpZXcoYXJyYnVmKSB7XG4gIGlmIChpc0J1ZmZlcihhcnJidWYpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEFycmF5QnVmZmVyLmlzVmlldyhhcnJidWYpO1xuICB9XG4gIGlmICghYXJyYnVmKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChhcnJidWYgaW5zdGFuY2VvZiBEYXRhVmlldykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChhcnJidWYuYnVmZmVyICYmIGFycmJ1Zi5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8vIDEuIFRoZSBhc3NlcnQgbW9kdWxlIHByb3ZpZGVzIGZ1bmN0aW9ucyB0aGF0IHRocm93XG4vLyBBc3NlcnRpb25FcnJvcidzIHdoZW4gcGFydGljdWxhciBjb25kaXRpb25zIGFyZSBub3QgbWV0LiBUaGVcbi8vIGFzc2VydCBtb2R1bGUgbXVzdCBjb25mb3JtIHRvIHRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlLlxuXG52YXIgYXNzZXJ0ID0gbW9kdWxlLmV4cG9ydHMgPSBvaztcblxuLy8gMi4gVGhlIEFzc2VydGlvbkVycm9yIGlzIGRlZmluZWQgaW4gYXNzZXJ0LlxuLy8gbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkIH0pXG5cbnZhciByZWdleCA9IC9cXHMqZnVuY3Rpb25cXHMrKFteXFwoXFxzXSopXFxzKi87XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL2Z1bmN0aW9uLnByb3RvdHlwZS5uYW1lL2Jsb2IvYWRlZWVlYzhiZmNjNjA2OGIxODdkN2Q5ZmIzZDViYjFkM2EzMDg5OS9pbXBsZW1lbnRhdGlvbi5qc1xuZnVuY3Rpb24gZ2V0TmFtZShmdW5jKSB7XG4gIGlmICghdXRpbC5pc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMpIHtcbiAgICByZXR1cm4gZnVuYy5uYW1lO1xuICB9XG4gIHZhciBzdHIgPSBmdW5jLnRvU3RyaW5nKCk7XG4gIHZhciBtYXRjaCA9IHN0ci5tYXRjaChyZWdleCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXTtcbn1cbmFzc2VydC5Bc3NlcnRpb25FcnJvciA9IGZ1bmN0aW9uIEFzc2VydGlvbkVycm9yKG9wdGlvbnMpIHtcbiAgdGhpcy5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcbiAgdGhpcy5hY3R1YWwgPSBvcHRpb25zLmFjdHVhbDtcbiAgdGhpcy5leHBlY3RlZCA9IG9wdGlvbnMuZXhwZWN0ZWQ7XG4gIHRoaXMub3BlcmF0b3IgPSBvcHRpb25zLm9wZXJhdG9yO1xuICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubWVzc2FnZSA9IGdldE1lc3NhZ2UodGhpcyk7XG4gICAgdGhpcy5nZW5lcmF0ZWRNZXNzYWdlID0gdHJ1ZTtcbiAgfVxuICB2YXIgc3RhY2tTdGFydEZ1bmN0aW9uID0gb3B0aW9ucy5zdGFja1N0YXJ0RnVuY3Rpb24gfHwgZmFpbDtcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cbiAgICAgIC8vIHRyeSB0byBzdHJpcCB1c2VsZXNzIGZyYW1lc1xuICAgICAgdmFyIGZuX25hbWUgPSBnZXROYW1lKHN0YWNrU3RhcnRGdW5jdGlvbik7XG4gICAgICB2YXIgaWR4ID0gb3V0LmluZGV4T2YoJ1xcbicgKyBmbl9uYW1lKTtcbiAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgbG9jYXRlZCB0aGUgZnVuY3Rpb24gZnJhbWVcbiAgICAgICAgLy8gd2UgbmVlZCB0byBzdHJpcCBvdXQgZXZlcnl0aGluZyBiZWZvcmUgaXQgKGFuZCBpdHMgbGluZSlcbiAgICAgICAgdmFyIG5leHRfbGluZSA9IG91dC5pbmRleE9mKCdcXG4nLCBpZHggKyAxKTtcbiAgICAgICAgb3V0ID0gb3V0LnN1YnN0cmluZyhuZXh0X2xpbmUgKyAxKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGFjayA9IG91dDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGFzc2VydC5Bc3NlcnRpb25FcnJvciBpbnN0YW5jZW9mIEVycm9yXG51dGlsLmluaGVyaXRzKGFzc2VydC5Bc3NlcnRpb25FcnJvciwgRXJyb3IpO1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShzLCBuKSB7XG4gIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPCBuID8gcyA6IHMuc2xpY2UoMCwgbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn1cbmZ1bmN0aW9uIGluc3BlY3Qoc29tZXRoaW5nKSB7XG4gIGlmIChmdW5jdGlvbnNIYXZlTmFtZXMgfHwgIXV0aWwuaXNGdW5jdGlvbihzb21ldGhpbmcpKSB7XG4gICAgcmV0dXJuIHV0aWwuaW5zcGVjdChzb21ldGhpbmcpO1xuICB9XG4gIHZhciByYXduYW1lID0gZ2V0TmFtZShzb21ldGhpbmcpO1xuICB2YXIgbmFtZSA9IHJhd25hbWUgPyAnOiAnICsgcmF3bmFtZSA6ICcnO1xuICByZXR1cm4gJ1tGdW5jdGlvbicgKyAgbmFtZSArICddJztcbn1cbmZ1bmN0aW9uIGdldE1lc3NhZ2Uoc2VsZikge1xuICByZXR1cm4gdHJ1bmNhdGUoaW5zcGVjdChzZWxmLmFjdHVhbCksIDEyOCkgKyAnICcgK1xuICAgICAgICAgc2VsZi5vcGVyYXRvciArICcgJyArXG4gICAgICAgICB0cnVuY2F0ZShpbnNwZWN0KHNlbGYuZXhwZWN0ZWQpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBmYWxzZSkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdkZWVwRXF1YWwnLCBhc3NlcnQuZGVlcEVxdWFsKTtcbiAgfVxufTtcblxuYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIGRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBTdHJpY3RFcXVhbCcsIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIHN0cmljdCwgbWVtb3MpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAmJiBpc0J1ZmZlcihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gY29tcGFyZShhY3R1YWwsIGV4cGVjdGVkKSA9PT0gMDtcblxuICAvLyA3LjIuIElmIHRoZSBleHBlY3RlZCB2YWx1ZSBpcyBhIERhdGUgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIERhdGUgb2JqZWN0IHRoYXQgcmVmZXJzIHRvIHRoZSBzYW1lIHRpbWUuXG4gIH0gZWxzZSBpZiAodXRpbC5pc0RhdGUoYWN0dWFsKSAmJiB1dGlsLmlzRGF0ZShleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG4gIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gIC8vIGVxdWl2YWxlbnQgaWYgaXQgaXMgYWxzbyBhIFJlZ0V4cCBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzb3VyY2UgYW5kXG4gIC8vIHByb3BlcnRpZXMgKGBnbG9iYWxgLCBgbXVsdGlsaW5lYCwgYGxhc3RJbmRleGAsIGBpZ25vcmVDYXNlYCkuXG4gIH0gZWxzZSBpZiAodXRpbC5pc1JlZ0V4cChhY3R1YWwpICYmIHV0aWwuaXNSZWdFeHAoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5zb3VyY2UgPT09IGV4cGVjdGVkLnNvdXJjZSAmJlxuICAgICAgICAgICBhY3R1YWwuZ2xvYmFsID09PSBleHBlY3RlZC5nbG9iYWwgJiZcbiAgICAgICAgICAgYWN0dWFsLm11bHRpbGluZSA9PT0gZXhwZWN0ZWQubXVsdGlsaW5lICYmXG4gICAgICAgICAgIGFjdHVhbC5sYXN0SW5kZXggPT09IGV4cGVjdGVkLmxhc3RJbmRleCAmJlxuICAgICAgICAgICBhY3R1YWwuaWdub3JlQ2FzZSA9PT0gZXhwZWN0ZWQuaWdub3JlQ2FzZTtcblxuICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoKGFjdHVhbCA9PT0gbnVsbCB8fCB0eXBlb2YgYWN0dWFsICE9PSAnb2JqZWN0JykgJiZcbiAgICAgICAgICAgICAoZXhwZWN0ZWQgPT09IG51bGwgfHwgdHlwZW9mIGV4cGVjdGVkICE9PSAnb2JqZWN0JykpIHtcbiAgICByZXR1cm4gc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyBJZiBib3RoIHZhbHVlcyBhcmUgaW5zdGFuY2VzIG9mIHR5cGVkIGFycmF5cywgd3JhcCB0aGVpciB1bmRlcmx5aW5nXG4gIC8vIEFycmF5QnVmZmVycyBpbiBhIEJ1ZmZlciBlYWNoIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gIC8vIFRoaXMgb3B0aW1pemF0aW9uIHJlcXVpcmVzIHRoZSBhcnJheXMgdG8gaGF2ZSB0aGUgc2FtZSB0eXBlIGFzIGNoZWNrZWQgYnlcbiAgLy8gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAoYWthIHBUb1N0cmluZykuIE5ldmVyIHBlcmZvcm0gYmluYXJ5XG4gIC8vIGNvbXBhcmlzb25zIGZvciBGbG9hdCpBcnJheXMsIHRob3VnaCwgc2luY2UgZS5nLiArMCA9PT0gLTAgYnV0IHRoZWlyXG4gIC8vIGJpdCBwYXR0ZXJucyBhcmUgbm90IGlkZW50aWNhbC5cbiAgfSBlbHNlIGlmIChpc1ZpZXcoYWN0dWFsKSAmJiBpc1ZpZXcoZXhwZWN0ZWQpICYmXG4gICAgICAgICAgICAgcFRvU3RyaW5nKGFjdHVhbCkgPT09IHBUb1N0cmluZyhleHBlY3RlZCkgJiZcbiAgICAgICAgICAgICAhKGFjdHVhbCBpbnN0YW5jZW9mIEZsb2F0MzJBcnJheSB8fFxuICAgICAgICAgICAgICAgYWN0dWFsIGluc3RhbmNlb2YgRmxvYXQ2NEFycmF5KSkge1xuICAgIHJldHVybiBjb21wYXJlKG5ldyBVaW50OEFycmF5KGFjdHVhbC5idWZmZXIpLFxuICAgICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KGV4cGVjdGVkLmJ1ZmZlcikpID09PSAwO1xuXG4gIC8vIDcuNSBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gIC8vIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gIH0gZWxzZSBpZiAoaXNCdWZmZXIoYWN0dWFsKSAhPT0gaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIG1lbW9zID0gbWVtb3MgfHwge2FjdHVhbDogW10sIGV4cGVjdGVkOiBbXX07XG5cbiAgICB2YXIgYWN0dWFsSW5kZXggPSBtZW1vcy5hY3R1YWwuaW5kZXhPZihhY3R1YWwpO1xuICAgIGlmIChhY3R1YWxJbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChhY3R1YWxJbmRleCA9PT0gbWVtb3MuZXhwZWN0ZWQuaW5kZXhPZihleHBlY3RlZCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb3MuYWN0dWFsLnB1c2goYWN0dWFsKTtcbiAgICBtZW1vcy5leHBlY3RlZC5wdXNoKGV4cGVjdGVkKTtcblxuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBzdHJpY3QsIG1lbW9zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBzdHJpY3QsIGFjdHVhbFZpc2l0ZWRPYmplY3RzKSB7XG4gIGlmIChhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSBudWxsIHx8IGIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGlmIG9uZSBpcyBhIHByaW1pdGl2ZSwgdGhlIG90aGVyIG11c3QgYmUgc2FtZVxuICBpZiAodXRpbC5pc1ByaW1pdGl2ZShhKSB8fCB1dGlsLmlzUHJpbWl0aXZlKGIpKVxuICAgIHJldHVybiBhID09PSBiO1xuICBpZiAoc3RyaWN0ICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihhKSAhPT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGIpKVxuICAgIHJldHVybiBmYWxzZTtcbiAgdmFyIGFJc0FyZ3MgPSBpc0FyZ3VtZW50cyhhKTtcbiAgdmFyIGJJc0FyZ3MgPSBpc0FyZ3VtZW50cyhiKTtcbiAgaWYgKChhSXNBcmdzICYmICFiSXNBcmdzKSB8fCAoIWFJc0FyZ3MgJiYgYklzQXJncykpXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoYUlzQXJncykge1xuICAgIGEgPSBwU2xpY2UuY2FsbChhKTtcbiAgICBiID0gcFNsaWNlLmNhbGwoYik7XG4gICAgcmV0dXJuIF9kZWVwRXF1YWwoYSwgYiwgc3RyaWN0KTtcbiAgfVxuICB2YXIga2EgPSBvYmplY3RLZXlzKGEpO1xuICB2YXIga2IgPSBvYmplY3RLZXlzKGIpO1xuICB2YXIga2V5LCBpO1xuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9PSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPT0ga2JbaV0pXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuICAvL35+fnBvc3NpYmx5IGV4cGVuc2l2ZSBkZWVwIHRlc3RcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIV9kZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIHN0cmljdCwgYWN0dWFsVmlzaXRlZE9iamVjdHMpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cbi8vIGFzc2VydC5ub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgZmFsc2UpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnbm90RGVlcEVxdWFsJywgYXNzZXJ0Lm5vdERlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmFzc2VydC5ub3REZWVwU3RyaWN0RXF1YWwgPSBub3REZWVwU3RyaWN0RXF1YWw7XG5mdW5jdGlvbiBub3REZWVwU3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCB0cnVlKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ25vdERlZXBTdHJpY3RFcXVhbCcsIG5vdERlZXBTdHJpY3RFcXVhbCk7XG4gIH1cbn1cblxuXG4vLyA5LiBUaGUgc3RyaWN0IGVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBzdHJpY3QgZXF1YWxpdHksIGFzIGRldGVybWluZWQgYnkgPT09LlxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24gc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09PScsIGFzc2VydC5zdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbi8vIDEwLiBUaGUgc3RyaWN0IG5vbi1lcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgZm9yIHN0cmljdCBpbmVxdWFsaXR5LCBhc1xuLy8gZGV0ZXJtaW5lZCBieSAhPT0uICBhc3NlcnQubm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiBub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT09JywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkge1xuICBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGV4cGVjdGVkKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBleHBlY3RlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSWdub3JlLiAgVGhlIGluc3RhbmNlb2YgY2hlY2sgZG9lc24ndCB3b3JrIGZvciBhcnJvdyBmdW5jdGlvbnMuXG4gIH1cblxuICBpZiAoRXJyb3IuaXNQcm90b3R5cGVPZihleHBlY3RlZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX3RyeUJsb2NrKGJsb2NrKSB7XG4gIHZhciBlcnJvcjtcbiAgdHJ5IHtcbiAgICBibG9jaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlO1xuICB9XG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gX3Rocm93cyhzaG91bGRUaHJvdywgYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIHZhciBhY3R1YWw7XG5cbiAgaWYgKHR5cGVvZiBibG9jayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYmxvY2tcIiBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgbWVzc2FnZSA9IGV4cGVjdGVkO1xuICAgIGV4cGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIGFjdHVhbCA9IF90cnlCbG9jayhibG9jayk7XG5cbiAgbWVzc2FnZSA9IChleHBlY3RlZCAmJiBleHBlY3RlZC5uYW1lID8gJyAoJyArIGV4cGVjdGVkLm5hbWUgKyAnKS4nIDogJy4nKSArXG4gICAgICAgICAgICAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICB2YXIgdXNlclByb3ZpZGVkTWVzc2FnZSA9IHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJztcbiAgdmFyIGlzVW53YW50ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgdXRpbC5pc0Vycm9yKGFjdHVhbCk7XG4gIHZhciBpc1VuZXhwZWN0ZWRFeGNlcHRpb24gPSAhc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmICFleHBlY3RlZDtcblxuICBpZiAoKGlzVW53YW50ZWRFeGNlcHRpb24gJiZcbiAgICAgIHVzZXJQcm92aWRlZE1lc3NhZ2UgJiZcbiAgICAgIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fFxuICAgICAgaXNVbmV4cGVjdGVkRXhjZXB0aW9uKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmICgoc2hvdWxkVGhyb3cgJiYgYWN0dWFsICYmIGV4cGVjdGVkICYmXG4gICAgICAhZXhwZWN0ZWRFeGNlcHRpb24oYWN0dWFsLCBleHBlY3RlZCkpIHx8ICghc2hvdWxkVGhyb3cgJiYgYWN0dWFsKSkge1xuICAgIHRocm93IGFjdHVhbDtcbiAgfVxufVxuXG4vLyAxMS4gRXhwZWN0ZWQgdG8gdGhyb3cgYW4gZXJyb3I6XG4vLyBhc3NlcnQudGhyb3dzKGJsb2NrLCBFcnJvcl9vcHQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9lcnJvciwgLypvcHRpb25hbCovbWVzc2FnZSkge1xuICBfdGhyb3dzKHRydWUsIGJsb2NrLCBlcnJvciwgbWVzc2FnZSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cyhmYWxzZSwgYmxvY2ssIGVycm9yLCBtZXNzYWdlKTtcbn07XG5cbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24oZXJyKSB7IGlmIChlcnIpIHRocm93IGVycjsgfTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8vICAgICAgXG5cbi8qKlxuICogQSBjb29yZGluYXRlIGlzIGEgY29sdW1uLCByb3csIHpvb20gY29tYmluYXRpb24sIG9mdGVuIHVzZWRcbiAqIGFzIHRoZSBkYXRhIGNvbXBvbmVudCBvZiBhIHRpbGUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbHVtblxuICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICogQHBhcmFtIHtudW1iZXJ9IHpvb21cbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIENvb3JkaW5hdGUge1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICBcbiAgICBjb25zdHJ1Y3Rvcihjb2x1bW4gICAgICAgICwgcm93ICAgICAgICAsIHpvb20gICAgICAgICkge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgdGhpcy5yb3cgPSByb3c7XG4gICAgICAgIHRoaXMuem9vbSA9IHpvb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgY2xvbmUgb2YgdGhpcyBjb29yZGluYXRlIHRoYXQgY2FuIGJlIG11dGF0ZWQgd2l0aG91dFxuICAgICAqIGNoYW5naW5nIHRoZSBvcmlnaW5hbCBjb29yZGluYXRlXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Q29vcmRpbmF0ZX0gY2xvbmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIHZhciBjb29yZCA9IG5ldyBDb29yZGluYXRlKDAsIDAsIDApO1xuICAgICAqIHZhciBjMiA9IGNvb3JkLmNsb25lKCk7XG4gICAgICogLy8gc2luY2UgY29vcmQgaXMgY2xvbmVkLCBtb2RpZnlpbmcgYSBwcm9wZXJ0eSBvZiBjMiBkb2VzXG4gICAgICogLy8gbm90IG1vZGlmeSBpdC5cbiAgICAgKiBjMi56b29tID0gMjtcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb29yZGluYXRlKHRoaXMuY29sdW1uLCB0aGlzLnJvdywgdGhpcy56b29tKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBab29tIHRoaXMgY29vcmRpbmF0ZSB0byBhIGdpdmVuIHpvb20gbGV2ZWwuIFRoaXMgcmV0dXJucyBhIG5ld1xuICAgICAqIGNvb3JkaW5hdGUgb2JqZWN0LCBub3QgbXV0YXRpbmcgdGhlIG9sZCBvbmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gem9vbVxuICAgICAqIEByZXR1cm5zIHtDb29yZGluYXRlfSB6b29tZWQgY29vcmRpbmF0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29vcmQgPSBuZXcgQ29vcmRpbmF0ZSgwLCAwLCAwKTtcbiAgICAgKiB2YXIgYzIgPSBjb29yZC56b29tVG8oMSk7XG4gICAgICogYzIgLy8gZXF1YWxzIG5ldyBDb29yZGluYXRlKDAsIDAsIDEpO1xuICAgICAqL1xuICAgIHpvb21Ubyh6b29tICAgICAgICApIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fem9vbVRvKHpvb20pOyB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdCB0aGUgY29sdW1uIGFuZCByb3cgdmFsdWVzIG9mIHRoaXMgY29vcmRpbmF0ZSBmcm9tIHRob3NlXG4gICAgICogb2YgYW5vdGhlciBjb29yZGluYXRlLiBUaGUgb3RoZXIgY29vcmRpbmF0IHdpbGwgYmUgem9vbWVkIHRvIHRoZVxuICAgICAqIHNhbWUgbGV2ZWwgYXMgYHRoaXNgIGJlZm9yZSB0aGUgc3VidHJhY3Rpb24gb2NjdXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Nvb3JkaW5hdGV9IGMgb3RoZXIgY29vcmRpbmF0ZVxuICAgICAqIEByZXR1cm5zIHtDb29yZGluYXRlfSByZXN1bHRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YihjICAgICAgICAgICAgKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX3N1YihjKTsgfVxuXG4gICAgX3pvb21Ubyh6b29tICAgICAgICApIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLnBvdygyLCB6b29tIC0gdGhpcy56b29tKTtcbiAgICAgICAgdGhpcy5jb2x1bW4gKj0gc2NhbGU7XG4gICAgICAgIHRoaXMucm93ICo9IHNjYWxlO1xuICAgICAgICB0aGlzLnpvb20gPSB6b29tO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBfc3ViKGMgICAgICAgICAgICApIHtcbiAgICAgICAgYyA9IGMuem9vbVRvKHRoaXMuem9vbSk7XG4gICAgICAgIHRoaXMuY29sdW1uIC09IGMuY29sdW1uO1xuICAgICAgICB0aGlzLnJvdyAtPSBjLnJvdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvb3JkaW5hdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuY29uc3QgV2hvb1RTID0gcmVxdWlyZSgnQG1hcGJveC93aG9vdHMtanMnKTtcbmNvbnN0IENvb3JkaW5hdGUgPSByZXF1aXJlKCcuLi9nZW8vY29vcmRpbmF0ZScpO1xuXG5jbGFzcyBUaWxlQ29vcmQge1xuICAgIGNvbnN0cnVjdG9yKHosIHgsIHksIHcpIHtcbiAgICAgICAgYXNzZXJ0KCFpc05hTih6KSAmJiB6ID49IDAgJiYgeiAlIDEgPT09IDApO1xuICAgICAgICBhc3NlcnQoIWlzTmFOKHgpICYmIHggPj0gMCAmJiB4ICUgMSA9PT0gMCk7XG4gICAgICAgIGFzc2VydCghaXNOYU4oeSkgJiYgeSA+PSAwICYmIHkgJSAxID09PSAwKTtcblxuICAgICAgICBpZiAoaXNOYU4odykpIHcgPSAwO1xuXG4gICAgICAgIHRoaXMueiA9ICt6O1xuICAgICAgICB0aGlzLnggPSAreDtcbiAgICAgICAgdGhpcy55ID0gK3k7XG4gICAgICAgIHRoaXMudyA9ICt3O1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBpZFxuICAgICAgICB3ICo9IDI7XG4gICAgICAgIGlmICh3IDwgMCkgdyA9IHcgKiAtMSAtIDE7XG4gICAgICAgIGNvbnN0IGRpbSA9IDEgPDwgdGhpcy56O1xuICAgICAgICB0aGlzLmlkID0gKChkaW0gKiBkaW0gKiB3ICsgZGltICogdGhpcy55ICsgdGhpcy54KSAqIDMyKSArIHRoaXMuejtcblxuICAgICAgICAvLyBmb3IgY2FjaGluZyBwb3MgbWF0cml4IGNhbGN1bGF0aW9uIHdoZW4gcmVuZGVyaW5nXG4gICAgICAgIHRoaXMucG9zTWF0cml4ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuen0vJHt0aGlzLnh9LyR7dGhpcy55fWA7XG4gICAgfVxuXG4gICAgdG9Db29yZGluYXRlKHNvdXJjZU1heFpvb20pIHtcbiAgICAgICAgY29uc3Qgem9vbSA9IE1hdGgubWluKHRoaXMueiwgc291cmNlTWF4Wm9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy56IDogc291cmNlTWF4Wm9vbSk7XG4gICAgICAgIGNvbnN0IHRpbGVTY2FsZSA9IE1hdGgucG93KDIsIHpvb20pO1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMueCArIHRpbGVTY2FsZSAqIHRoaXMudztcbiAgICAgICAgcmV0dXJuIG5ldyBDb29yZGluYXRlKGNvbHVtbiwgcm93LCB6b29tKTtcbiAgICB9XG5cbiAgICAvLyBnaXZlbiBhIGxpc3Qgb2YgdXJscywgY2hvb3NlIGEgdXJsIHRlbXBsYXRlIGFuZCByZXR1cm4gYSB0aWxlIFVSTFxuICAgIHVybCh1cmxzLCBzb3VyY2VNYXhab29tLCBzY2hlbWUpIHtcbiAgICAgICAgY29uc3QgYmJveCA9IFdob29UUy5nZXRUaWxlQkJveCh0aGlzLngsIHRoaXMueSwgdGhpcy56KTtcbiAgICAgICAgY29uc3QgcXVhZGtleSA9IGdldFF1YWRrZXkodGhpcy56LCB0aGlzLngsIHRoaXMueSk7XG5cbiAgICAgICAgcmV0dXJuIHVybHNbKHRoaXMueCArIHRoaXMueSkgJSB1cmxzLmxlbmd0aF1cbiAgICAgICAgICAgIC5yZXBsYWNlKCd7cHJlZml4fScsICh0aGlzLnggJSAxNikudG9TdHJpbmcoMTYpICsgKHRoaXMueSAlIDE2KS50b1N0cmluZygxNikpXG4gICAgICAgICAgICAucmVwbGFjZSgne3p9JywgTWF0aC5taW4odGhpcy56LCBzb3VyY2VNYXhab29tIHx8IHRoaXMueikpXG4gICAgICAgICAgICAucmVwbGFjZSgne3h9JywgdGhpcy54KVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3t5fScsIHNjaGVtZSA9PT0gJ3RtcycgPyAoTWF0aC5wb3coMiwgdGhpcy56KSAtIHRoaXMueSAtIDEpIDogdGhpcy55KVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3txdWFka2V5fScsIHF1YWRrZXkpXG4gICAgICAgICAgICAucmVwbGFjZSgne2Jib3gtZXBzZy0zODU3fScsIGJib3gpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgY29vcmRpbmF0ZSBvZiB0aGUgcGFyZW50IHRpbGVcbiAgICBwYXJlbnQoc291cmNlTWF4Wm9vbSkge1xuICAgICAgICBpZiAodGhpcy56ID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAvLyB0aGUgaWQgcmVwcmVzZW50cyBhbiBvdmVyc2NhbGVkIHRpbGUsIHJldHVybiB0aGUgc2FtZSBjb29yZGluYXRlcyB3aXRoIGEgbG93ZXIgelxuICAgICAgICBpZiAodGhpcy56ID4gc291cmNlTWF4Wm9vbSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaWxlQ29vcmQodGhpcy56IC0gMSwgdGhpcy54LCB0aGlzLnksIHRoaXMudyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFRpbGVDb29yZCh0aGlzLnogLSAxLCBNYXRoLmZsb29yKHRoaXMueCAvIDIpLCBNYXRoLmZsb29yKHRoaXMueSAvIDIpLCB0aGlzLncpO1xuICAgIH1cblxuICAgIHdyYXBwZWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGlsZUNvb3JkKHRoaXMueiwgdGhpcy54LCB0aGlzLnksIDApO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIHRpbGUncyBjaGlsZHJlblxuICAgIGNoaWxkcmVuKHNvdXJjZU1heFpvb20pIHtcblxuICAgICAgICBpZiAodGhpcy56ID49IHNvdXJjZU1heFpvb20pIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBhIHNpbmdsZSB0aWxlIGNvb3JkIHJlcHJlc2VudGluZyBhIGFuIG92ZXJzY2FsZWQgdGlsZVxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgVGlsZUNvb3JkKHRoaXMueiArIDEsIHRoaXMueCwgdGhpcy55LCB0aGlzLncpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHogPSB0aGlzLnogKyAxO1xuICAgICAgICBjb25zdCB4ID0gdGhpcy54ICogMjtcbiAgICAgICAgY29uc3QgeSA9IHRoaXMueSAqIDI7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBuZXcgVGlsZUNvb3JkKHosIHgsIHksIHRoaXMudyksXG4gICAgICAgICAgICBuZXcgVGlsZUNvb3JkKHosIHggKyAxLCB5LCB0aGlzLncpLFxuICAgICAgICAgICAgbmV3IFRpbGVDb29yZCh6LCB4LCB5ICsgMSwgdGhpcy53KSxcbiAgICAgICAgICAgIG5ldyBUaWxlQ29vcmQoeiwgeCArIDEsIHkgKyAxLCB0aGlzLncpXG4gICAgICAgIF07XG4gICAgfVxufVxuXG4vLyBUYWtlbiBmcm9tIHBvbHltYXBzIHNyYy9MYXllci5qc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NpbXBsZWdlby9wb2x5bWFwcy9ibG9iL21hc3Rlci9zcmMvTGF5ZXIuanMjTDMzMy1MMzgzXG5cbmZ1bmN0aW9uIGVkZ2UoYSwgYikge1xuICAgIGlmIChhLnJvdyA+IGIucm93KSB7IGNvbnN0IHQgPSBhOyBhID0gYjsgYiA9IHQ7IH1cbiAgICByZXR1cm4ge1xuICAgICAgICB4MDogYS5jb2x1bW4sXG4gICAgICAgIHkwOiBhLnJvdyxcbiAgICAgICAgeDE6IGIuY29sdW1uLFxuICAgICAgICB5MTogYi5yb3csXG4gICAgICAgIGR4OiBiLmNvbHVtbiAtIGEuY29sdW1uLFxuICAgICAgICBkeTogYi5yb3cgLSBhLnJvd1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHNjYW5TcGFucyhlMCwgZTEsIHltaW4sIHltYXgsIHNjYW5MaW5lKSB7XG4gICAgY29uc3QgeTAgPSBNYXRoLm1heCh5bWluLCBNYXRoLmZsb29yKGUxLnkwKSk7XG4gICAgY29uc3QgeTEgPSBNYXRoLm1pbih5bWF4LCBNYXRoLmNlaWwoZTEueTEpKTtcblxuICAgIC8vIHNvcnQgZWRnZXMgYnkgeC1jb29yZGluYXRlXG4gICAgaWYgKChlMC54MCA9PT0gZTEueDAgJiYgZTAueTAgPT09IGUxLnkwKSA/XG4gICAgICAgICAgICAoZTAueDAgKyBlMS5keSAvIGUwLmR5ICogZTAuZHggPCBlMS54MSkgOlxuICAgICAgICAgICAgKGUwLngxIC0gZTEuZHkgLyBlMC5keSAqIGUwLmR4IDwgZTEueDApKSB7XG4gICAgICAgIGNvbnN0IHQgPSBlMDsgZTAgPSBlMTsgZTEgPSB0O1xuICAgIH1cblxuICAgIC8vIHNjYW4gbGluZXMhXG4gICAgY29uc3QgbTAgPSBlMC5keCAvIGUwLmR5O1xuICAgIGNvbnN0IG0xID0gZTEuZHggLyBlMS5keTtcbiAgICBjb25zdCBkMCA9IGUwLmR4ID4gMDsgLy8gdXNlIHkgKyAxIHRvIGNvbXB1dGUgeDBcbiAgICBjb25zdCBkMSA9IGUxLmR4IDwgMDsgLy8gdXNlIHkgKyAxIHRvIGNvbXB1dGUgeDFcbiAgICBmb3IgKGxldCB5ID0geTA7IHkgPCB5MTsgeSsrKSB7XG4gICAgICAgIGNvbnN0IHgwID0gbTAgKiBNYXRoLm1heCgwLCBNYXRoLm1pbihlMC5keSwgeSArIGQwIC0gZTAueTApKSArIGUwLngwO1xuICAgICAgICBjb25zdCB4MSA9IG0xICogTWF0aC5tYXgoMCwgTWF0aC5taW4oZTEuZHksIHkgKyBkMSAtIGUxLnkwKSkgKyBlMS54MDtcbiAgICAgICAgc2NhbkxpbmUoTWF0aC5mbG9vcih4MSksIE1hdGguY2VpbCh4MCksIHkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2NhblRyaWFuZ2xlKGEsIGIsIGMsIHltaW4sIHltYXgsIHNjYW5MaW5lKSB7XG4gICAgbGV0IGFiID0gZWRnZShhLCBiKSxcbiAgICAgICAgYmMgPSBlZGdlKGIsIGMpLFxuICAgICAgICBjYSA9IGVkZ2UoYywgYSk7XG5cbiAgICBsZXQgdDtcblxuICAgIC8vIHNvcnQgZWRnZXMgYnkgeS1sZW5ndGhcbiAgICBpZiAoYWIuZHkgPiBiYy5keSkgeyB0ID0gYWI7IGFiID0gYmM7IGJjID0gdDsgfVxuICAgIGlmIChhYi5keSA+IGNhLmR5KSB7IHQgPSBhYjsgYWIgPSBjYTsgY2EgPSB0OyB9XG4gICAgaWYgKGJjLmR5ID4gY2EuZHkpIHsgdCA9IGJjOyBiYyA9IGNhOyBjYSA9IHQ7IH1cblxuICAgIC8vIHNjYW4gc3BhbiEgc2NhbiBzcGFuIVxuICAgIGlmIChhYi5keSkgc2NhblNwYW5zKGNhLCBhYiwgeW1pbiwgeW1heCwgc2NhbkxpbmUpO1xuICAgIGlmIChiYy5keSkgc2NhblNwYW5zKGNhLCBiYywgeW1pbiwgeW1heCwgc2NhbkxpbmUpO1xufVxuXG5UaWxlQ29vcmQuY292ZXIgPSBmdW5jdGlvbih6LCBib3VuZHMsIGFjdHVhbFosIHJlbmRlcldvcmxkQ29waWVzKSB7XG4gICAgaWYgKHJlbmRlcldvcmxkQ29waWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVuZGVyV29ybGRDb3BpZXMgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCB0aWxlcyA9IDEgPDwgejtcbiAgICBjb25zdCB0ID0ge307XG5cbiAgICBmdW5jdGlvbiBzY2FuTGluZSh4MCwgeDEsIHkpIHtcbiAgICAgICAgbGV0IHgsIHcsIHd4LCBjb29yZDtcbiAgICAgICAgaWYgKHkgPj0gMCAmJiB5IDw9IHRpbGVzKSB7XG4gICAgICAgICAgICBmb3IgKHggPSB4MDsgeCA8IHgxOyB4KyspIHtcbiAgICAgICAgICAgICAgICB3ID0gTWF0aC5mbG9vcih4IC8gdGlsZXMpO1xuICAgICAgICAgICAgICAgIHd4ID0gKHggJSB0aWxlcyArIHRpbGVzKSAlIHRpbGVzO1xuICAgICAgICAgICAgICAgIGlmICh3ID09PSAwIHx8IHJlbmRlcldvcmxkQ29waWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3JkID0gbmV3IFRpbGVDb29yZChhY3R1YWxaLCB3eCwgeSwgdyk7XG4gICAgICAgICAgICAgICAgICAgIHRbY29vcmQuaWRdID0gY29vcmQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGl2aWRlIHRoZSBzY3JlZW4gdXAgaW4gdHdvIHRyaWFuZ2xlcyBhbmQgc2NhbiBlYWNoIG9mIHRoZW06XG4gICAgLy8gKy0tLS9cbiAgICAvLyB8IC8gfFxuICAgIC8vIC8tLS0rXG4gICAgc2NhblRyaWFuZ2xlKGJvdW5kc1swXSwgYm91bmRzWzFdLCBib3VuZHNbMl0sIDAsIHRpbGVzLCBzY2FuTGluZSk7XG4gICAgc2NhblRyaWFuZ2xlKGJvdW5kc1syXSwgYm91bmRzWzNdLCBib3VuZHNbMF0sIDAsIHRpbGVzLCBzY2FuTGluZSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXModCkubWFwKChpZCkgPT4ge1xuICAgICAgICByZXR1cm4gdFtpZF07XG4gICAgfSk7XG59O1xuXG4vLyBQYXJzZSBhIHBhY2tlZCBpbnRlZ2VyIGlkIGludG8gYSBUaWxlQ29vcmQgb2JqZWN0XG5UaWxlQ29vcmQuZnJvbUlEID0gZnVuY3Rpb24oaWQpIHtcbiAgICBjb25zdCB6ID0gaWQgJSAzMiwgZGltID0gMSA8PCB6O1xuICAgIGNvbnN0IHh5ID0gKChpZCAtIHopIC8gMzIpO1xuICAgIGNvbnN0IHggPSB4eSAlIGRpbSwgeSA9ICgoeHkgLSB4KSAvIGRpbSkgJSBkaW07XG4gICAgbGV0IHcgPSBNYXRoLmZsb29yKHh5IC8gKGRpbSAqIGRpbSkpO1xuICAgIGlmICh3ICUgMiAhPT0gMCkgdyA9IHcgKiAtMSAtIDE7XG4gICAgdyAvPSAyO1xuICAgIHJldHVybiBuZXcgVGlsZUNvb3JkKHosIHgsIHksIHcpO1xufTtcblxuZnVuY3Rpb24gZ2V0UXVhZGtleSh6LCB4LCB5KSB7XG4gICAgbGV0IHF1YWRrZXkgPSAnJywgbWFzaztcbiAgICBmb3IgKGxldCBpID0gejsgaSA+IDA7IGktLSkge1xuICAgICAgICBtYXNrID0gMSA8PCAoaSAtIDEpO1xuICAgICAgICBxdWFka2V5ICs9ICgoeCAmIG1hc2sgPyAxIDogMCkgKyAoeSAmIG1hc2sgPyAyIDogMCkpO1xuICAgIH1cbiAgICByZXR1cm4gcXVhZGtleTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlQ29vcmQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEZlYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKHZlY3RvclRpbGVGZWF0dXJlLCB6LCB4LCB5KSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdGZWF0dXJlJztcblxuICAgICAgICB0aGlzLl92ZWN0b3JUaWxlRmVhdHVyZSA9IHZlY3RvclRpbGVGZWF0dXJlO1xuICAgICAgICB2ZWN0b3JUaWxlRmVhdHVyZS5feiA9IHo7XG4gICAgICAgIHZlY3RvclRpbGVGZWF0dXJlLl94ID0geDtcbiAgICAgICAgdmVjdG9yVGlsZUZlYXR1cmUuX3kgPSB5O1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHZlY3RvclRpbGVGZWF0dXJlLnByb3BlcnRpZXM7XG5cbiAgICAgICAgaWYgKHZlY3RvclRpbGVGZWF0dXJlLmlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB2ZWN0b3JUaWxlRmVhdHVyZS5pZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBnZW9tZXRyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2dlb21ldHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2dlb21ldHJ5ID0gdGhpcy5fdmVjdG9yVGlsZUZlYXR1cmUudG9HZW9KU09OKFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlY3RvclRpbGVGZWF0dXJlLl94LFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlY3RvclRpbGVGZWF0dXJlLl95LFxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlY3RvclRpbGVGZWF0dXJlLl96KS5nZW9tZXRyeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VvbWV0cnk7XG4gICAgfVxuXG4gICAgc2V0IGdlb21ldHJ5KGcpIHtcbiAgICAgICAgdGhpcy5fZ2VvbWV0cnkgPSBnO1xuICAgIH1cblxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QganNvbiA9IHtcbiAgICAgICAgICAgIGdlb21ldHJ5OiB0aGlzLmdlb21ldHJ5XG4gICAgICAgIH07XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gJ19nZW9tZXRyeScgfHwgaSA9PT0gJ192ZWN0b3JUaWxlRmVhdHVyZScpIGNvbnRpbnVlO1xuICAgICAgICAgICAganNvbltpXSA9IHRoaXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZlYXR1cmU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGxpZ2h0d2VpZ2h0IEJ1ZmZlciBzaGltIGZvciBwYmYgYnJvd3NlciBidWlsZFxuLy8gYmFzZWQgb24gY29kZSBmcm9tIGdpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlciAoTUlULWxpY2Vuc2VkKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlcjtcblxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0Jyk7XG5cbnZhciBCdWZmZXJNZXRob2RzO1xuXG5mdW5jdGlvbiBCdWZmZXIobGVuZ3RoKSB7XG4gICAgdmFyIGFycjtcbiAgICBpZiAobGVuZ3RoICYmIGxlbmd0aC5sZW5ndGgpIHtcbiAgICAgICAgYXJyID0gbGVuZ3RoO1xuICAgICAgICBsZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoIHx8IDApO1xuICAgIGlmIChhcnIpIGJ1Zi5zZXQoYXJyKTtcblxuICAgIGJ1Zi5yZWFkVUludDMyTEUgPSBCdWZmZXJNZXRob2RzLnJlYWRVSW50MzJMRTtcbiAgICBidWYud3JpdGVVSW50MzJMRSA9IEJ1ZmZlck1ldGhvZHMud3JpdGVVSW50MzJMRTtcbiAgICBidWYucmVhZEludDMyTEUgPSBCdWZmZXJNZXRob2RzLnJlYWRJbnQzMkxFO1xuICAgIGJ1Zi53cml0ZUludDMyTEUgPSBCdWZmZXJNZXRob2RzLndyaXRlSW50MzJMRTtcbiAgICBidWYucmVhZEZsb2F0TEUgPSBCdWZmZXJNZXRob2RzLnJlYWRGbG9hdExFO1xuICAgIGJ1Zi53cml0ZUZsb2F0TEUgPSBCdWZmZXJNZXRob2RzLndyaXRlRmxvYXRMRTtcbiAgICBidWYucmVhZERvdWJsZUxFID0gQnVmZmVyTWV0aG9kcy5yZWFkRG91YmxlTEU7XG4gICAgYnVmLndyaXRlRG91YmxlTEUgPSBCdWZmZXJNZXRob2RzLndyaXRlRG91YmxlTEU7XG4gICAgYnVmLnRvU3RyaW5nID0gQnVmZmVyTWV0aG9kcy50b1N0cmluZztcbiAgICBidWYud3JpdGUgPSBCdWZmZXJNZXRob2RzLndyaXRlO1xuICAgIGJ1Zi5zbGljZSA9IEJ1ZmZlck1ldGhvZHMuc2xpY2U7XG4gICAgYnVmLmNvcHkgPSBCdWZmZXJNZXRob2RzLmNvcHk7XG5cbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZTtcbiAgICByZXR1cm4gYnVmO1xufVxuXG52YXIgbGFzdFN0ciwgbGFzdFN0ckVuY29kZWQ7XG5cbkJ1ZmZlck1ldGhvZHMgPSB7XG4gICAgcmVhZFVJbnQzMkxFOiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgcmV0dXJuICgodGhpc1twb3NdKSB8XG4gICAgICAgICAgICAodGhpc1twb3MgKyAxXSA8PCA4KSB8XG4gICAgICAgICAgICAodGhpc1twb3MgKyAyXSA8PCAxNikpICtcbiAgICAgICAgICAgICh0aGlzW3BvcyArIDNdICogMHgxMDAwMDAwKTtcbiAgICB9LFxuXG4gICAgd3JpdGVVSW50MzJMRTogZnVuY3Rpb24odmFsLCBwb3MpIHtcbiAgICAgICAgdGhpc1twb3NdID0gdmFsO1xuICAgICAgICB0aGlzW3BvcyArIDFdID0gKHZhbCA+Pj4gOCk7XG4gICAgICAgIHRoaXNbcG9zICsgMl0gPSAodmFsID4+PiAxNik7XG4gICAgICAgIHRoaXNbcG9zICsgM10gPSAodmFsID4+PiAyNCk7XG4gICAgfSxcblxuICAgIHJlYWRJbnQzMkxFOiBmdW5jdGlvbihwb3MpIHtcbiAgICAgICAgcmV0dXJuICgodGhpc1twb3NdKSB8XG4gICAgICAgICAgICAodGhpc1twb3MgKyAxXSA8PCA4KSB8XG4gICAgICAgICAgICAodGhpc1twb3MgKyAyXSA8PCAxNikpICtcbiAgICAgICAgICAgICh0aGlzW3BvcyArIDNdIDw8IDI0KTtcbiAgICB9LFxuXG4gICAgcmVhZEZsb2F0TEU6ICBmdW5jdGlvbihwb3MpIHsgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBwb3MsIHRydWUsIDIzLCA0KTsgfSxcbiAgICByZWFkRG91YmxlTEU6IGZ1bmN0aW9uKHBvcykgeyByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIHBvcywgdHJ1ZSwgNTIsIDgpOyB9LFxuXG4gICAgd3JpdGVGbG9hdExFOiAgZnVuY3Rpb24odmFsLCBwb3MpIHsgcmV0dXJuIGllZWU3NTQud3JpdGUodGhpcywgdmFsLCBwb3MsIHRydWUsIDIzLCA0KTsgfSxcbiAgICB3cml0ZURvdWJsZUxFOiBmdW5jdGlvbih2YWwsIHBvcykgeyByZXR1cm4gaWVlZTc1NC53cml0ZSh0aGlzLCB2YWwsIHBvcywgdHJ1ZSwgNTIsIDgpOyB9LFxuXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBzdHIgPSAnJyxcbiAgICAgICAgICAgIHRtcCA9ICcnO1xuXG4gICAgICAgIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgICAgICAgZW5kID0gTWF0aC5taW4odGhpcy5sZW5ndGgsIGVuZCB8fCB0aGlzLmxlbmd0aCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRoaXNbaV07XG4gICAgICAgICAgICBpZiAoY2ggPD0gMHg3Rikge1xuICAgICAgICAgICAgICAgIHN0ciArPSBkZWNvZGVVUklDb21wb25lbnQodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2gpO1xuICAgICAgICAgICAgICAgIHRtcCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0bXAgKz0gJyUnICsgY2gudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RyICs9IGRlY29kZVVSSUNvbXBvbmVudCh0bXApO1xuXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfSxcblxuICAgIHdyaXRlOiBmdW5jdGlvbihzdHIsIHBvcykge1xuICAgICAgICB2YXIgYnl0ZXMgPSBzdHIgPT09IGxhc3RTdHIgPyBsYXN0U3RyRW5jb2RlZCA6IGVuY29kZVN0cmluZyhzdHIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzW3BvcyArIGldID0gYnl0ZXNbaV07XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2xpY2U6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCk7XG4gICAgfSxcblxuICAgIGNvcHk6IGZ1bmN0aW9uKGJ1ZiwgcG9zKSB7XG4gICAgICAgIHBvcyA9IHBvcyB8fCAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJ1Zltwb3MgKyBpXSA9IHRoaXNbaV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5CdWZmZXJNZXRob2RzLndyaXRlSW50MzJMRSA9IEJ1ZmZlck1ldGhvZHMud3JpdGVVSW50MzJMRTtcblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsYXN0U3RyID0gc3RyO1xuICAgIGxhc3RTdHJFbmNvZGVkID0gZW5jb2RlU3RyaW5nKHN0cik7XG4gICAgcmV0dXJuIGxhc3RTdHJFbmNvZGVkLmxlbmd0aDtcbn07XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uKGJ1Zikge1xuICAgIHJldHVybiAhIShidWYgJiYgYnVmLl9pc0J1ZmZlcik7XG59O1xuXG5mdW5jdGlvbiBlbmNvZGVTdHJpbmcoc3RyKSB7XG4gICAgdmFyIGxlbmd0aCA9IHN0ci5sZW5ndGgsXG4gICAgICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgYywgbGVhZDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTsgLy8gY29kZSBwb2ludFxuXG4gICAgICAgIGlmIChjID4gMHhEN0ZGICYmIGMgPCAweEUwMDApIHtcblxuICAgICAgICAgICAgaWYgKGxlYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDB4REMwMCkge1xuICAgICAgICAgICAgICAgICAgICBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpO1xuICAgICAgICAgICAgICAgICAgICBsZWFkID0gYztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjID0gbGVhZCAtIDB4RDgwMCA8PCAxMCB8IGMgLSAweERDMDAgfCAweDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICBsZWFkID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPiAweERCRkYgfHwgKGkgKyAxID09PSBsZW5ndGgpKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpO1xuICAgICAgICAgICAgICAgIGVsc2UgbGVhZCA9IGM7XG5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGxlYWQpIHtcbiAgICAgICAgICAgIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRCk7XG4gICAgICAgICAgICBsZWFkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkgYnl0ZXMucHVzaChjKTtcbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ODAwKSBieXRlcy5wdXNoKGMgPj4gMHg2IHwgMHhDMCwgYyAmIDB4M0YgfCAweDgwKTtcbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4MTAwMDApIGJ5dGVzLnB1c2goYyA+PiAweEMgfCAweEUwLCBjID4+IDB4NiAmIDB4M0YgfCAweDgwLCBjICYgMHgzRiB8IDB4ODApO1xuICAgICAgICBlbHNlIGJ5dGVzLnB1c2goYyA+PiAweDEyIHwgMHhGMCwgYyA+PiAweEMgJiAweDNGIHwgMHg4MCwgYyA+PiAweDYgJiAweDNGIHwgMHg4MCwgYyAmIDB4M0YgfCAweDgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ5dGVzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBiZjtcblxudmFyIEJ1ZmZlciA9IGdsb2JhbC5CdWZmZXIgfHwgcmVxdWlyZSgnLi9idWZmZXInKTtcblxuZnVuY3Rpb24gUGJmKGJ1Zikge1xuICAgIHRoaXMuYnVmID0gIUJ1ZmZlci5pc0J1ZmZlcihidWYpID8gbmV3IEJ1ZmZlcihidWYgfHwgMCkgOiBidWY7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5idWYubGVuZ3RoO1xufVxuXG5QYmYuVmFyaW50ICA9IDA7IC8vIHZhcmludDogaW50MzIsIGludDY0LCB1aW50MzIsIHVpbnQ2NCwgc2ludDMyLCBzaW50NjQsIGJvb2wsIGVudW1cblBiZi5GaXhlZDY0ID0gMTsgLy8gNjQtYml0OiBkb3VibGUsIGZpeGVkNjQsIHNmaXhlZDY0XG5QYmYuQnl0ZXMgICA9IDI7IC8vIGxlbmd0aC1kZWxpbWl0ZWQ6IHN0cmluZywgYnl0ZXMsIGVtYmVkZGVkIG1lc3NhZ2VzLCBwYWNrZWQgcmVwZWF0ZWQgZmllbGRzXG5QYmYuRml4ZWQzMiA9IDU7IC8vIDMyLWJpdDogZmxvYXQsIGZpeGVkMzIsIHNmaXhlZDMyXG5cbnZhciBTSElGVF9MRUZUXzMyID0gKDEgPDwgMTYpICogKDEgPDwgMTYpLFxuICAgIFNISUZUX1JJR0hUXzMyID0gMSAvIFNISUZUX0xFRlRfMzIsXG4gICAgUE9XXzJfNjMgPSBNYXRoLnBvdygyLCA2Myk7XG5cblBiZi5wcm90b3R5cGUgPSB7XG5cbiAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5idWYgPSBudWxsO1xuICAgIH0sXG5cbiAgICAvLyA9PT0gUkVBRElORyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgcmVhZEZpZWxkczogZnVuY3Rpb24ocmVhZEZpZWxkLCByZXN1bHQsIGVuZCkge1xuICAgICAgICBlbmQgPSBlbmQgfHwgdGhpcy5sZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMucG9zIDwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5yZWFkVmFyaW50KCksXG4gICAgICAgICAgICAgICAgdGFnID0gdmFsID4+IDMsXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgPSB0aGlzLnBvcztcblxuICAgICAgICAgICAgcmVhZEZpZWxkKHRhZywgcmVzdWx0LCB0aGlzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucG9zID09PSBzdGFydFBvcykgdGhpcy5za2lwKHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgcmVhZE1lc3NhZ2U6IGZ1bmN0aW9uKHJlYWRGaWVsZCwgcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRGaWVsZHMocmVhZEZpZWxkLCByZXN1bHQsIHRoaXMucmVhZFZhcmludCgpICsgdGhpcy5wb3MpO1xuICAgIH0sXG5cbiAgICByZWFkRml4ZWQzMjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWwgPSB0aGlzLmJ1Zi5yZWFkVUludDMyTEUodGhpcy5wb3MpO1xuICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICByZWFkU0ZpeGVkMzI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy5idWYucmVhZEludDMyTEUodGhpcy5wb3MpO1xuICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICAvLyA2NC1iaXQgaW50IGhhbmRsaW5nIGlzIGJhc2VkIG9uIGdpdGh1Yi5jb20vZHB3L25vZGUtYnVmZmVyLW1vcmUtaW50cyAoTUlULWxpY2Vuc2VkKVxuXG4gICAgcmVhZEZpeGVkNjQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsID0gdGhpcy5idWYucmVhZFVJbnQzMkxFKHRoaXMucG9zKSArIHRoaXMuYnVmLnJlYWRVSW50MzJMRSh0aGlzLnBvcyArIDQpICogU0hJRlRfTEVGVF8zMjtcbiAgICAgICAgdGhpcy5wb3MgKz0gODtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgcmVhZFNGaXhlZDY0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuYnVmLnJlYWRVSW50MzJMRSh0aGlzLnBvcykgKyB0aGlzLmJ1Zi5yZWFkSW50MzJMRSh0aGlzLnBvcyArIDQpICogU0hJRlRfTEVGVF8zMjtcbiAgICAgICAgdGhpcy5wb3MgKz0gODtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgcmVhZEZsb2F0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuYnVmLnJlYWRGbG9hdExFKHRoaXMucG9zKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgcmVhZERvdWJsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWwgPSB0aGlzLmJ1Zi5yZWFkRG91YmxlTEUodGhpcy5wb3MpO1xuICAgICAgICB0aGlzLnBvcyArPSA4O1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICByZWFkVmFyaW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IHRoaXMuYnVmLFxuICAgICAgICAgICAgdmFsLCBiO1xuXG4gICAgICAgIGIgPSBidWZbdGhpcy5wb3MrK107IHZhbCAgPSAgYiAmIDB4N2Y7ICAgICAgICBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG4gICAgICAgIGIgPSBidWZbdGhpcy5wb3MrK107IHZhbCB8PSAoYiAmIDB4N2YpIDw8IDc7ICBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG4gICAgICAgIGIgPSBidWZbdGhpcy5wb3MrK107IHZhbCB8PSAoYiAmIDB4N2YpIDw8IDE0OyBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG4gICAgICAgIGIgPSBidWZbdGhpcy5wb3MrK107IHZhbCB8PSAoYiAmIDB4N2YpIDw8IDIxOyBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG5cbiAgICAgICAgcmV0dXJuIHJlYWRWYXJpbnRSZW1haW5kZXIodmFsLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgcmVhZFZhcmludDY0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gdGhpcy5wb3MsXG4gICAgICAgICAgICB2YWwgPSB0aGlzLnJlYWRWYXJpbnQoKTtcblxuICAgICAgICBpZiAodmFsIDwgUE9XXzJfNjMpIHJldHVybiB2YWw7XG5cbiAgICAgICAgdmFyIHBvcyA9IHRoaXMucG9zIC0gMjtcbiAgICAgICAgd2hpbGUgKHRoaXMuYnVmW3Bvc10gPT09IDB4ZmYpIHBvcy0tO1xuICAgICAgICBpZiAocG9zIDwgc3RhcnRQb3MpIHBvcyA9IHN0YXJ0UG9zO1xuXG4gICAgICAgIHZhbCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zIC0gc3RhcnRQb3MgKyAxOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBiID0gfnRoaXMuYnVmW3N0YXJ0UG9zICsgaV0gJiAweDdmO1xuICAgICAgICAgICAgdmFsICs9IGkgPCA0ID8gYiA8PCBpICogNyA6IGIgKiBNYXRoLnBvdygyLCBpICogNyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLXZhbCAtIDE7XG4gICAgfSxcblxuICAgIHJlYWRTVmFyaW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG51bSA9IHRoaXMucmVhZFZhcmludCgpO1xuICAgICAgICByZXR1cm4gbnVtICUgMiA9PT0gMSA/IChudW0gKyAxKSAvIC0yIDogbnVtIC8gMjsgLy8gemlnemFnIGVuY29kaW5nXG4gICAgfSxcblxuICAgIHJlYWRCb29sZWFuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5yZWFkVmFyaW50KCkpO1xuICAgIH0sXG5cbiAgICByZWFkU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMucmVhZFZhcmludCgpICsgdGhpcy5wb3MsXG4gICAgICAgICAgICBzdHIgPSB0aGlzLmJ1Zi50b1N0cmluZygndXRmOCcsIHRoaXMucG9zLCBlbmQpO1xuICAgICAgICB0aGlzLnBvcyA9IGVuZDtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9LFxuXG4gICAgcmVhZEJ5dGVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMucmVhZFZhcmludCgpICsgdGhpcy5wb3MsXG4gICAgICAgICAgICBidWZmZXIgPSB0aGlzLmJ1Zi5zbGljZSh0aGlzLnBvcywgZW5kKTtcbiAgICAgICAgdGhpcy5wb3MgPSBlbmQ7XG4gICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgfSxcblxuICAgIC8vIHZlcmJvc2UgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnM7IGRvZXNuJ3QgYWZmZWN0IGd6aXBwZWQgc2l6ZVxuXG4gICAgcmVhZFBhY2tlZFZhcmludDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbmQgPSB0aGlzLnJlYWRWYXJpbnQoKSArIHRoaXMucG9zLCBhcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMucG9zIDwgZW5kKSBhcnIucHVzaCh0aGlzLnJlYWRWYXJpbnQoKSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcbiAgICByZWFkUGFja2VkU1ZhcmludDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbmQgPSB0aGlzLnJlYWRWYXJpbnQoKSArIHRoaXMucG9zLCBhcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMucG9zIDwgZW5kKSBhcnIucHVzaCh0aGlzLnJlYWRTVmFyaW50KCkpO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG4gICAgcmVhZFBhY2tlZEJvb2xlYW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5yZWFkVmFyaW50KCkgKyB0aGlzLnBvcywgYXJyID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLnBvcyA8IGVuZCkgYXJyLnB1c2godGhpcy5yZWFkQm9vbGVhbigpKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIHJlYWRQYWNrZWRGbG9hdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbmQgPSB0aGlzLnJlYWRWYXJpbnQoKSArIHRoaXMucG9zLCBhcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMucG9zIDwgZW5kKSBhcnIucHVzaCh0aGlzLnJlYWRGbG9hdCgpKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIHJlYWRQYWNrZWREb3VibGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5yZWFkVmFyaW50KCkgKyB0aGlzLnBvcywgYXJyID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLnBvcyA8IGVuZCkgYXJyLnB1c2godGhpcy5yZWFkRG91YmxlKCkpO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG4gICAgcmVhZFBhY2tlZEZpeGVkMzI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5yZWFkVmFyaW50KCkgKyB0aGlzLnBvcywgYXJyID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLnBvcyA8IGVuZCkgYXJyLnB1c2godGhpcy5yZWFkRml4ZWQzMigpKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIHJlYWRQYWNrZWRTRml4ZWQzMjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbmQgPSB0aGlzLnJlYWRWYXJpbnQoKSArIHRoaXMucG9zLCBhcnIgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRoaXMucG9zIDwgZW5kKSBhcnIucHVzaCh0aGlzLnJlYWRTRml4ZWQzMigpKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9LFxuICAgIHJlYWRQYWNrZWRGaXhlZDY0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVuZCA9IHRoaXMucmVhZFZhcmludCgpICsgdGhpcy5wb3MsIGFyciA9IFtdO1xuICAgICAgICB3aGlsZSAodGhpcy5wb3MgPCBlbmQpIGFyci5wdXNoKHRoaXMucmVhZEZpeGVkNjQoKSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcbiAgICByZWFkUGFja2VkU0ZpeGVkNjQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW5kID0gdGhpcy5yZWFkVmFyaW50KCkgKyB0aGlzLnBvcywgYXJyID0gW107XG4gICAgICAgIHdoaWxlICh0aGlzLnBvcyA8IGVuZCkgYXJyLnB1c2godGhpcy5yZWFkU0ZpeGVkNjQoKSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcblxuICAgIHNraXA6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHZhbCAmIDB4NztcbiAgICAgICAgaWYgKHR5cGUgPT09IFBiZi5WYXJpbnQpIHdoaWxlICh0aGlzLmJ1Zlt0aGlzLnBvcysrXSA+IDB4N2YpIHt9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFBiZi5CeXRlcykgdGhpcy5wb3MgPSB0aGlzLnJlYWRWYXJpbnQoKSArIHRoaXMucG9zO1xuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBQYmYuRml4ZWQzMikgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gUGJmLkZpeGVkNjQpIHRoaXMucG9zICs9IDg7XG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkIHR5cGU6ICcgKyB0eXBlKTtcbiAgICB9LFxuXG4gICAgLy8gPT09IFdSSVRJTkcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIHdyaXRlVGFnOiBmdW5jdGlvbih0YWcsIHR5cGUpIHtcbiAgICAgICAgdGhpcy53cml0ZVZhcmludCgodGFnIDw8IDMpIHwgdHlwZSk7XG4gICAgfSxcblxuICAgIHJlYWxsb2M6IGZ1bmN0aW9uKG1pbikge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfHwgMTY7XG5cbiAgICAgICAgd2hpbGUgKGxlbmd0aCA8IHRoaXMucG9zICsgbWluKSBsZW5ndGggKj0gMjtcblxuICAgICAgICBpZiAobGVuZ3RoICE9PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIobGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuYnVmLmNvcHkoYnVmKTtcbiAgICAgICAgICAgIHRoaXMuYnVmID0gYnVmO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnBvcztcbiAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcy5idWYuc2xpY2UoMCwgdGhpcy5sZW5ndGgpO1xuICAgIH0sXG5cbiAgICB3cml0ZUZpeGVkMzI6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLnJlYWxsb2MoNCk7XG4gICAgICAgIHRoaXMuYnVmLndyaXRlVUludDMyTEUodmFsLCB0aGlzLnBvcyk7XG4gICAgICAgIHRoaXMucG9zICs9IDQ7XG4gICAgfSxcblxuICAgIHdyaXRlU0ZpeGVkMzI6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB0aGlzLnJlYWxsb2MoNCk7XG4gICAgICAgIHRoaXMuYnVmLndyaXRlSW50MzJMRSh2YWwsIHRoaXMucG9zKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICB9LFxuXG4gICAgd3JpdGVGaXhlZDY0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy5yZWFsbG9jKDgpO1xuICAgICAgICB0aGlzLmJ1Zi53cml0ZUludDMyTEUodmFsICYgLTEsIHRoaXMucG9zKTtcbiAgICAgICAgdGhpcy5idWYud3JpdGVVSW50MzJMRShNYXRoLmZsb29yKHZhbCAqIFNISUZUX1JJR0hUXzMyKSwgdGhpcy5wb3MgKyA0KTtcbiAgICAgICAgdGhpcy5wb3MgKz0gODtcbiAgICB9LFxuXG4gICAgd3JpdGVTRml4ZWQ2NDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMucmVhbGxvYyg4KTtcbiAgICAgICAgdGhpcy5idWYud3JpdGVJbnQzMkxFKHZhbCAmIC0xLCB0aGlzLnBvcyk7XG4gICAgICAgIHRoaXMuYnVmLndyaXRlSW50MzJMRShNYXRoLmZsb29yKHZhbCAqIFNISUZUX1JJR0hUXzMyKSwgdGhpcy5wb3MgKyA0KTtcbiAgICAgICAgdGhpcy5wb3MgKz0gODtcbiAgICB9LFxuXG4gICAgd3JpdGVWYXJpbnQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICB2YWwgPSArdmFsO1xuXG4gICAgICAgIGlmICh2YWwgPiAweGZmZmZmZmYpIHtcbiAgICAgICAgICAgIHdyaXRlQmlnVmFyaW50KHZhbCwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlYWxsb2MoNCk7XG5cbiAgICAgICAgdGhpcy5idWZbdGhpcy5wb3MrK10gPSAgICAgICAgICAgdmFsICYgMHg3ZiAgfCAodmFsID4gMHg3ZiA/IDB4ODAgOiAwKTsgaWYgKHZhbCA8PSAweDdmKSByZXR1cm47XG4gICAgICAgIHRoaXMuYnVmW3RoaXMucG9zKytdID0gKCh2YWwgPj4+PSA3KSAmIDB4N2YpIHwgKHZhbCA+IDB4N2YgPyAweDgwIDogMCk7IGlmICh2YWwgPD0gMHg3ZikgcmV0dXJuO1xuICAgICAgICB0aGlzLmJ1Zlt0aGlzLnBvcysrXSA9ICgodmFsID4+Pj0gNykgJiAweDdmKSB8ICh2YWwgPiAweDdmID8gMHg4MCA6IDApOyBpZiAodmFsIDw9IDB4N2YpIHJldHVybjtcbiAgICAgICAgdGhpcy5idWZbdGhpcy5wb3MrK10gPSAgICh2YWwgPj4+IDcpICYgMHg3ZjtcbiAgICB9LFxuXG4gICAgd3JpdGVTVmFyaW50OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdGhpcy53cml0ZVZhcmludCh2YWwgPCAwID8gLXZhbCAqIDIgLSAxIDogdmFsICogMik7XG4gICAgfSxcblxuICAgIHdyaXRlQm9vbGVhbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMud3JpdGVWYXJpbnQoQm9vbGVhbih2YWwpKTtcbiAgICB9LFxuXG4gICAgd3JpdGVTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICAgICAgdmFyIGJ5dGVzID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3RyKTtcbiAgICAgICAgdGhpcy53cml0ZVZhcmludChieXRlcyk7XG4gICAgICAgIHRoaXMucmVhbGxvYyhieXRlcyk7XG4gICAgICAgIHRoaXMuYnVmLndyaXRlKHN0ciwgdGhpcy5wb3MpO1xuICAgICAgICB0aGlzLnBvcyArPSBieXRlcztcbiAgICB9LFxuXG4gICAgd3JpdGVGbG9hdDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMucmVhbGxvYyg0KTtcbiAgICAgICAgdGhpcy5idWYud3JpdGVGbG9hdExFKHZhbCwgdGhpcy5wb3MpO1xuICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgIH0sXG5cbiAgICB3cml0ZURvdWJsZTogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHRoaXMucmVhbGxvYyg4KTtcbiAgICAgICAgdGhpcy5idWYud3JpdGVEb3VibGVMRSh2YWwsIHRoaXMucG9zKTtcbiAgICAgICAgdGhpcy5wb3MgKz0gODtcbiAgICB9LFxuXG4gICAgd3JpdGVCeXRlczogZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgIHZhciBsZW4gPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB0aGlzLndyaXRlVmFyaW50KGxlbik7XG4gICAgICAgIHRoaXMucmVhbGxvYyhsZW4pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB0aGlzLmJ1Zlt0aGlzLnBvcysrXSA9IGJ1ZmZlcltpXTtcbiAgICB9LFxuXG4gICAgd3JpdGVSYXdNZXNzYWdlOiBmdW5jdGlvbihmbiwgb2JqKSB7XG4gICAgICAgIHRoaXMucG9zKys7IC8vIHJlc2VydmUgMSBieXRlIGZvciBzaG9ydCBtZXNzYWdlIGxlbmd0aFxuXG4gICAgICAgIC8vIHdyaXRlIHRoZSBtZXNzYWdlIGRpcmVjdGx5IHRvIHRoZSBidWZmZXIgYW5kIHNlZSBob3cgbXVjaCB3YXMgd3JpdHRlblxuICAgICAgICB2YXIgc3RhcnRQb3MgPSB0aGlzLnBvcztcbiAgICAgICAgZm4ob2JqLCB0aGlzKTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMucG9zIC0gc3RhcnRQb3M7XG5cbiAgICAgICAgaWYgKGxlbiA+PSAweDgwKSByZWFsbG9jRm9yUmF3TWVzc2FnZShzdGFydFBvcywgbGVuLCB0aGlzKTtcblxuICAgICAgICAvLyBmaW5hbGx5LCB3cml0ZSB0aGUgbWVzc2FnZSBsZW5ndGggaW4gdGhlIHJlc2VydmVkIHBsYWNlIGFuZCByZXN0b3JlIHRoZSBwb3NpdGlvblxuICAgICAgICB0aGlzLnBvcyA9IHN0YXJ0UG9zIC0gMTtcbiAgICAgICAgdGhpcy53cml0ZVZhcmludChsZW4pO1xuICAgICAgICB0aGlzLnBvcyArPSBsZW47XG4gICAgfSxcblxuICAgIHdyaXRlTWVzc2FnZTogZnVuY3Rpb24odGFnLCBmbiwgb2JqKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuQnl0ZXMpO1xuICAgICAgICB0aGlzLndyaXRlUmF3TWVzc2FnZShmbiwgb2JqKTtcbiAgICB9LFxuXG4gICAgd3JpdGVQYWNrZWRWYXJpbnQ6ICAgZnVuY3Rpb24odGFnLCBhcnIpIHsgdGhpcy53cml0ZU1lc3NhZ2UodGFnLCB3cml0ZVBhY2tlZFZhcmludCwgYXJyKTsgICB9LFxuICAgIHdyaXRlUGFja2VkU1ZhcmludDogIGZ1bmN0aW9uKHRhZywgYXJyKSB7IHRoaXMud3JpdGVNZXNzYWdlKHRhZywgd3JpdGVQYWNrZWRTVmFyaW50LCBhcnIpOyAgfSxcbiAgICB3cml0ZVBhY2tlZEJvb2xlYW46ICBmdW5jdGlvbih0YWcsIGFycikgeyB0aGlzLndyaXRlTWVzc2FnZSh0YWcsIHdyaXRlUGFja2VkQm9vbGVhbiwgYXJyKTsgIH0sXG4gICAgd3JpdGVQYWNrZWRGbG9hdDogICAgZnVuY3Rpb24odGFnLCBhcnIpIHsgdGhpcy53cml0ZU1lc3NhZ2UodGFnLCB3cml0ZVBhY2tlZEZsb2F0LCBhcnIpOyAgICB9LFxuICAgIHdyaXRlUGFja2VkRG91YmxlOiAgIGZ1bmN0aW9uKHRhZywgYXJyKSB7IHRoaXMud3JpdGVNZXNzYWdlKHRhZywgd3JpdGVQYWNrZWREb3VibGUsIGFycik7ICAgfSxcbiAgICB3cml0ZVBhY2tlZEZpeGVkMzI6ICBmdW5jdGlvbih0YWcsIGFycikgeyB0aGlzLndyaXRlTWVzc2FnZSh0YWcsIHdyaXRlUGFja2VkRml4ZWQzMiwgYXJyKTsgIH0sXG4gICAgd3JpdGVQYWNrZWRTRml4ZWQzMjogZnVuY3Rpb24odGFnLCBhcnIpIHsgdGhpcy53cml0ZU1lc3NhZ2UodGFnLCB3cml0ZVBhY2tlZFNGaXhlZDMyLCBhcnIpOyB9LFxuICAgIHdyaXRlUGFja2VkRml4ZWQ2NDogIGZ1bmN0aW9uKHRhZywgYXJyKSB7IHRoaXMud3JpdGVNZXNzYWdlKHRhZywgd3JpdGVQYWNrZWRGaXhlZDY0LCBhcnIpOyAgfSxcbiAgICB3cml0ZVBhY2tlZFNGaXhlZDY0OiBmdW5jdGlvbih0YWcsIGFycikgeyB0aGlzLndyaXRlTWVzc2FnZSh0YWcsIHdyaXRlUGFja2VkU0ZpeGVkNjQsIGFycik7IH0sXG5cbiAgICB3cml0ZUJ5dGVzRmllbGQ6IGZ1bmN0aW9uKHRhZywgYnVmZmVyKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuQnl0ZXMpO1xuICAgICAgICB0aGlzLndyaXRlQnl0ZXMoYnVmZmVyKTtcbiAgICB9LFxuICAgIHdyaXRlRml4ZWQzMkZpZWxkOiBmdW5jdGlvbih0YWcsIHZhbCkge1xuICAgICAgICB0aGlzLndyaXRlVGFnKHRhZywgUGJmLkZpeGVkMzIpO1xuICAgICAgICB0aGlzLndyaXRlRml4ZWQzMih2YWwpO1xuICAgIH0sXG4gICAgd3JpdGVTRml4ZWQzMkZpZWxkOiBmdW5jdGlvbih0YWcsIHZhbCkge1xuICAgICAgICB0aGlzLndyaXRlVGFnKHRhZywgUGJmLkZpeGVkMzIpO1xuICAgICAgICB0aGlzLndyaXRlU0ZpeGVkMzIodmFsKTtcbiAgICB9LFxuICAgIHdyaXRlRml4ZWQ2NEZpZWxkOiBmdW5jdGlvbih0YWcsIHZhbCkge1xuICAgICAgICB0aGlzLndyaXRlVGFnKHRhZywgUGJmLkZpeGVkNjQpO1xuICAgICAgICB0aGlzLndyaXRlRml4ZWQ2NCh2YWwpO1xuICAgIH0sXG4gICAgd3JpdGVTRml4ZWQ2NEZpZWxkOiBmdW5jdGlvbih0YWcsIHZhbCkge1xuICAgICAgICB0aGlzLndyaXRlVGFnKHRhZywgUGJmLkZpeGVkNjQpO1xuICAgICAgICB0aGlzLndyaXRlU0ZpeGVkNjQodmFsKTtcbiAgICB9LFxuICAgIHdyaXRlVmFyaW50RmllbGQ6IGZ1bmN0aW9uKHRhZywgdmFsKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuVmFyaW50KTtcbiAgICAgICAgdGhpcy53cml0ZVZhcmludCh2YWwpO1xuICAgIH0sXG4gICAgd3JpdGVTVmFyaW50RmllbGQ6IGZ1bmN0aW9uKHRhZywgdmFsKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuVmFyaW50KTtcbiAgICAgICAgdGhpcy53cml0ZVNWYXJpbnQodmFsKTtcbiAgICB9LFxuICAgIHdyaXRlU3RyaW5nRmllbGQ6IGZ1bmN0aW9uKHRhZywgc3RyKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuQnl0ZXMpO1xuICAgICAgICB0aGlzLndyaXRlU3RyaW5nKHN0cik7XG4gICAgfSxcbiAgICB3cml0ZUZsb2F0RmllbGQ6IGZ1bmN0aW9uKHRhZywgdmFsKSB7XG4gICAgICAgIHRoaXMud3JpdGVUYWcodGFnLCBQYmYuRml4ZWQzMik7XG4gICAgICAgIHRoaXMud3JpdGVGbG9hdCh2YWwpO1xuICAgIH0sXG4gICAgd3JpdGVEb3VibGVGaWVsZDogZnVuY3Rpb24odGFnLCB2YWwpIHtcbiAgICAgICAgdGhpcy53cml0ZVRhZyh0YWcsIFBiZi5GaXhlZDY0KTtcbiAgICAgICAgdGhpcy53cml0ZURvdWJsZSh2YWwpO1xuICAgIH0sXG4gICAgd3JpdGVCb29sZWFuRmllbGQ6IGZ1bmN0aW9uKHRhZywgdmFsKSB7XG4gICAgICAgIHRoaXMud3JpdGVWYXJpbnRGaWVsZCh0YWcsIEJvb2xlYW4odmFsKSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcmVhZFZhcmludFJlbWFpbmRlcih2YWwsIHBiZikge1xuICAgIHZhciBidWYgPSBwYmYuYnVmLCBiO1xuXG4gICAgYiA9IGJ1ZltwYmYucG9zKytdOyB2YWwgKz0gKGIgJiAweDdmKSAqIDB4MTAwMDAwMDA7ICAgICAgICAgaWYgKGIgPCAweDgwKSByZXR1cm4gdmFsO1xuICAgIGIgPSBidWZbcGJmLnBvcysrXTsgdmFsICs9IChiICYgMHg3ZikgKiAweDgwMDAwMDAwMDsgICAgICAgIGlmIChiIDwgMHg4MCkgcmV0dXJuIHZhbDtcbiAgICBiID0gYnVmW3BiZi5wb3MrK107IHZhbCArPSAoYiAmIDB4N2YpICogMHg0MDAwMDAwMDAwMDsgICAgICBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG4gICAgYiA9IGJ1ZltwYmYucG9zKytdOyB2YWwgKz0gKGIgJiAweDdmKSAqIDB4MjAwMDAwMDAwMDAwMDsgICAgaWYgKGIgPCAweDgwKSByZXR1cm4gdmFsO1xuICAgIGIgPSBidWZbcGJmLnBvcysrXTsgdmFsICs9IChiICYgMHg3ZikgKiAweDEwMDAwMDAwMDAwMDAwMDsgIGlmIChiIDwgMHg4MCkgcmV0dXJuIHZhbDtcbiAgICBiID0gYnVmW3BiZi5wb3MrK107IHZhbCArPSAoYiAmIDB4N2YpICogMHg4MDAwMDAwMDAwMDAwMDAwOyBpZiAoYiA8IDB4ODApIHJldHVybiB2YWw7XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHZhcmludCBub3QgbW9yZSB0aGFuIDEwIGJ5dGVzJyk7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmlnVmFyaW50KHZhbCwgcGJmKSB7XG4gICAgcGJmLnJlYWxsb2MoMTApO1xuXG4gICAgdmFyIG1heFBvcyA9IHBiZi5wb3MgKyAxMDtcblxuICAgIHdoaWxlICh2YWwgPj0gMSkge1xuICAgICAgICBpZiAocGJmLnBvcyA+PSBtYXhQb3MpIHRocm93IG5ldyBFcnJvcignR2l2ZW4gdmFyaW50IGRvZXNuXFwndCBmaXQgaW50byAxMCBieXRlcycpO1xuICAgICAgICB2YXIgYiA9IHZhbCAmIDB4ZmY7XG4gICAgICAgIHBiZi5idWZbcGJmLnBvcysrXSA9IGIgfCAodmFsID49IDB4ODAgPyAweDgwIDogMCk7XG4gICAgICAgIHZhbCAvPSAweDgwO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVhbGxvY0ZvclJhd01lc3NhZ2Uoc3RhcnRQb3MsIGxlbiwgcGJmKSB7XG4gICAgdmFyIGV4dHJhTGVuID1cbiAgICAgICAgbGVuIDw9IDB4M2ZmZiA/IDEgOlxuICAgICAgICBsZW4gPD0gMHgxZmZmZmYgPyAyIDpcbiAgICAgICAgbGVuIDw9IDB4ZmZmZmZmZiA/IDMgOiBNYXRoLmNlaWwoTWF0aC5sb2cobGVuKSAvIChNYXRoLkxOMiAqIDcpKTtcblxuICAgIC8vIGlmIDEgYnl0ZSBpc24ndCBlbm91Z2ggZm9yIGVuY29kaW5nIG1lc3NhZ2UgbGVuZ3RoLCBzaGlmdCB0aGUgZGF0YSB0byB0aGUgcmlnaHRcbiAgICBwYmYucmVhbGxvYyhleHRyYUxlbik7XG4gICAgZm9yICh2YXIgaSA9IHBiZi5wb3MgLSAxOyBpID49IHN0YXJ0UG9zOyBpLS0pIHBiZi5idWZbaSArIGV4dHJhTGVuXSA9IHBiZi5idWZbaV07XG59XG5cbmZ1bmN0aW9uIHdyaXRlUGFja2VkVmFyaW50KGFyciwgcGJmKSAgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZVZhcmludChhcnJbaV0pOyAgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkU1ZhcmludChhcnIsIHBiZikgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZVNWYXJpbnQoYXJyW2ldKTsgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkRmxvYXQoYXJyLCBwYmYpICAgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZUZsb2F0KGFycltpXSk7ICAgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkRG91YmxlKGFyciwgcGJmKSAgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZURvdWJsZShhcnJbaV0pOyAgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkQm9vbGVhbihhcnIsIHBiZikgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZUJvb2xlYW4oYXJyW2ldKTsgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkRml4ZWQzMihhcnIsIHBiZikgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZUZpeGVkMzIoYXJyW2ldKTsgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkU0ZpeGVkMzIoYXJyLCBwYmYpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZVNGaXhlZDMyKGFycltpXSk7IH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkRml4ZWQ2NChhcnIsIHBiZikgIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZUZpeGVkNjQoYXJyW2ldKTsgIH1cbmZ1bmN0aW9uIHdyaXRlUGFja2VkU0ZpeGVkNjQoYXJyLCBwYmYpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHBiZi53cml0ZVNGaXhlZDY0KGFycltpXSk7IH1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBQb2ludDtcblxuZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbn1cblxuUG9pbnQucHJvdG90eXBlID0ge1xuICAgIGNsb25lOiBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7IH0sXG5cbiAgICBhZGQ6ICAgICBmdW5jdGlvbihwKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX2FkZChwKTsgICAgIH0sXG4gICAgc3ViOiAgICAgZnVuY3Rpb24ocCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9zdWIocCk7ICAgICB9LFxuICAgIG11bHQ6ICAgIGZ1bmN0aW9uKGspIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fbXVsdChrKTsgICAgfSxcbiAgICBkaXY6ICAgICBmdW5jdGlvbihrKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX2RpdihrKTsgICAgIH0sXG4gICAgcm90YXRlOiAgZnVuY3Rpb24oYSkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9yb3RhdGUoYSk7ICB9LFxuICAgIG1hdE11bHQ6IGZ1bmN0aW9uKG0pIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fbWF0TXVsdChtKTsgfSxcbiAgICB1bml0OiAgICBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuY2xvbmUoKS5fdW5pdCgpOyB9LFxuICAgIHBlcnA6ICAgIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5jbG9uZSgpLl9wZXJwKCk7IH0sXG4gICAgcm91bmQ6ICAgZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmNsb25lKCkuX3JvdW5kKCk7IH0sXG5cbiAgICBtYWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gICAgfSxcblxuICAgIGVxdWFsczogZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBwLnggJiZcbiAgICAgICAgICAgICAgIHRoaXMueSA9PT0gcC55O1xuICAgIH0sXG5cbiAgICBkaXN0OiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0U3FyKHApKTtcbiAgICB9LFxuXG4gICAgZGlzdFNxcjogZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgZHggPSBwLnggLSB0aGlzLngsXG4gICAgICAgICAgICBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgIH0sXG5cbiAgICBhbmdsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICB9LFxuXG4gICAgYW5nbGVUbzogZnVuY3Rpb24oYikge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMih0aGlzLnkgLSBiLnksIHRoaXMueCAtIGIueCk7XG4gICAgfSxcblxuICAgIGFuZ2xlV2l0aDogZnVuY3Rpb24oYikge1xuICAgICAgICByZXR1cm4gdGhpcy5hbmdsZVdpdGhTZXAoYi54LCBiLnkpO1xuICAgIH0sXG5cbiAgICAvLyBGaW5kIHRoZSBhbmdsZSBvZiB0aGUgdHdvIHZlY3RvcnMsIHNvbHZpbmcgdGhlIGZvcm11bGEgZm9yIHRoZSBjcm9zcyBwcm9kdWN0IGEgeCBiID0gfGF8fGJ8c2luKM64KSBmb3IgzrguXG4gICAgYW5nbGVXaXRoU2VwOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKFxuICAgICAgICAgICAgdGhpcy54ICogeSAtIHRoaXMueSAqIHgsXG4gICAgICAgICAgICB0aGlzLnggKiB4ICsgdGhpcy55ICogeSk7XG4gICAgfSxcblxuICAgIF9tYXRNdWx0OiBmdW5jdGlvbihtKSB7XG4gICAgICAgIHZhciB4ID0gbVswXSAqIHRoaXMueCArIG1bMV0gKiB0aGlzLnksXG4gICAgICAgICAgICB5ID0gbVsyXSAqIHRoaXMueCArIG1bM10gKiB0aGlzLnk7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfYWRkOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHRoaXMueCArPSBwLng7XG4gICAgICAgIHRoaXMueSArPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfc3ViOiBmdW5jdGlvbihwKSB7XG4gICAgICAgIHRoaXMueCAtPSBwLng7XG4gICAgICAgIHRoaXMueSAtPSBwLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfbXVsdDogZnVuY3Rpb24oaykge1xuICAgICAgICB0aGlzLnggKj0gaztcbiAgICAgICAgdGhpcy55ICo9IGs7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBfZGl2OiBmdW5jdGlvbihrKSB7XG4gICAgICAgIHRoaXMueCAvPSBrO1xuICAgICAgICB0aGlzLnkgLz0gaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF91bml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fZGl2KHRoaXMubWFnKCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgX3BlcnA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeSA9IHRoaXMueTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy54O1xuICAgICAgICB0aGlzLnggPSAteTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9yb3RhdGU6IGZ1bmN0aW9uKGFuZ2xlKSB7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSksXG4gICAgICAgICAgICB4ID0gY29zICogdGhpcy54IC0gc2luICogdGhpcy55LFxuICAgICAgICAgICAgeSA9IHNpbiAqIHRoaXMueCArIGNvcyAqIHRoaXMueTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIF9yb3VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMueCA9IE1hdGgucm91bmQodGhpcy54KTtcbiAgICAgICAgdGhpcy55ID0gTWF0aC5yb3VuZCh0aGlzLnkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RzIFBvaW50IGZyb20gYW4gYXJyYXkgaWYgbmVjZXNzYXJ5XG5Qb2ludC5jb252ZXJ0ID0gZnVuY3Rpb24gKGEpIHtcbiAgICBpZiAoYSBpbnN0YW5jZW9mIFBvaW50KSB7XG4gICAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICByZXR1cm4gbmV3IFBvaW50KGFbMF0sIGFbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuIiwibW9kdWxlLmV4cG9ydHMuVmVjdG9yVGlsZSA9IHJlcXVpcmUoJy4vbGliL3ZlY3RvcnRpbGUuanMnKTtcbm1vZHVsZS5leHBvcnRzLlZlY3RvclRpbGVGZWF0dXJlID0gcmVxdWlyZSgnLi9saWIvdmVjdG9ydGlsZWZlYXR1cmUuanMnKTtcbm1vZHVsZS5leHBvcnRzLlZlY3RvclRpbGVMYXllciA9IHJlcXVpcmUoJy4vbGliL3ZlY3RvcnRpbGVsYXllci5qcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVmVjdG9yVGlsZUxheWVyID0gcmVxdWlyZSgnLi92ZWN0b3J0aWxlbGF5ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3JUaWxlO1xuXG5mdW5jdGlvbiBWZWN0b3JUaWxlKHBiZiwgZW5kKSB7XG4gICAgdGhpcy5sYXllcnMgPSBwYmYucmVhZEZpZWxkcyhyZWFkVGlsZSwge30sIGVuZCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRUaWxlKHRhZywgbGF5ZXJzLCBwYmYpIHtcbiAgICBpZiAodGFnID09PSAzKSB7XG4gICAgICAgIHZhciBsYXllciA9IG5ldyBWZWN0b3JUaWxlTGF5ZXIocGJmLCBwYmYucmVhZFZhcmludCgpICsgcGJmLnBvcyk7XG4gICAgICAgIGlmIChsYXllci5sZW5ndGgpIGxheWVyc1tsYXllci5uYW1lXSA9IGxheWVyO1xuICAgIH1cbn1cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9pbnQgPSByZXF1aXJlKCdwb2ludC1nZW9tZXRyeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvclRpbGVGZWF0dXJlO1xuXG5mdW5jdGlvbiBWZWN0b3JUaWxlRmVhdHVyZShwYmYsIGVuZCwgZXh0ZW50LCBrZXlzLCB2YWx1ZXMpIHtcbiAgICAvLyBQdWJsaWNcbiAgICB0aGlzLnByb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLmV4dGVudCA9IGV4dGVudDtcbiAgICB0aGlzLnR5cGUgPSAwO1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHRoaXMuX3BiZiA9IHBiZjtcbiAgICB0aGlzLl9nZW9tZXRyeSA9IC0xO1xuICAgIHRoaXMuX2tleXMgPSBrZXlzO1xuICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcblxuICAgIHBiZi5yZWFkRmllbGRzKHJlYWRGZWF0dXJlLCB0aGlzLCBlbmQpO1xufVxuXG5mdW5jdGlvbiByZWFkRmVhdHVyZSh0YWcsIGZlYXR1cmUsIHBiZikge1xuICAgIGlmICh0YWcgPT0gMSkgZmVhdHVyZS5pZCA9IHBiZi5yZWFkVmFyaW50KCk7XG4gICAgZWxzZSBpZiAodGFnID09IDIpIHJlYWRUYWcocGJmLCBmZWF0dXJlKTtcbiAgICBlbHNlIGlmICh0YWcgPT0gMykgZmVhdHVyZS50eXBlID0gcGJmLnJlYWRWYXJpbnQoKTtcbiAgICBlbHNlIGlmICh0YWcgPT0gNCkgZmVhdHVyZS5fZ2VvbWV0cnkgPSBwYmYucG9zO1xufVxuXG5mdW5jdGlvbiByZWFkVGFnKHBiZiwgZmVhdHVyZSkge1xuICAgIHZhciBlbmQgPSBwYmYucmVhZFZhcmludCgpICsgcGJmLnBvcztcblxuICAgIHdoaWxlIChwYmYucG9zIDwgZW5kKSB7XG4gICAgICAgIHZhciBrZXkgPSBmZWF0dXJlLl9rZXlzW3BiZi5yZWFkVmFyaW50KCldLFxuICAgICAgICAgICAgdmFsdWUgPSBmZWF0dXJlLl92YWx1ZXNbcGJmLnJlYWRWYXJpbnQoKV07XG4gICAgICAgIGZlYXR1cmUucHJvcGVydGllc1trZXldID0gdmFsdWU7XG4gICAgfVxufVxuXG5WZWN0b3JUaWxlRmVhdHVyZS50eXBlcyA9IFsnVW5rbm93bicsICdQb2ludCcsICdMaW5lU3RyaW5nJywgJ1BvbHlnb24nXTtcblxuVmVjdG9yVGlsZUZlYXR1cmUucHJvdG90eXBlLmxvYWRHZW9tZXRyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYmYgPSB0aGlzLl9wYmY7XG4gICAgcGJmLnBvcyA9IHRoaXMuX2dlb21ldHJ5O1xuXG4gICAgdmFyIGVuZCA9IHBiZi5yZWFkVmFyaW50KCkgKyBwYmYucG9zLFxuICAgICAgICBjbWQgPSAxLFxuICAgICAgICBsZW5ndGggPSAwLFxuICAgICAgICB4ID0gMCxcbiAgICAgICAgeSA9IDAsXG4gICAgICAgIGxpbmVzID0gW10sXG4gICAgICAgIGxpbmU7XG5cbiAgICB3aGlsZSAocGJmLnBvcyA8IGVuZCkge1xuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGNtZExlbiA9IHBiZi5yZWFkVmFyaW50KCk7XG4gICAgICAgICAgICBjbWQgPSBjbWRMZW4gJiAweDc7XG4gICAgICAgICAgICBsZW5ndGggPSBjbWRMZW4gPj4gMztcbiAgICAgICAgfVxuXG4gICAgICAgIGxlbmd0aC0tO1xuXG4gICAgICAgIGlmIChjbWQgPT09IDEgfHwgY21kID09PSAyKSB7XG4gICAgICAgICAgICB4ICs9IHBiZi5yZWFkU1ZhcmludCgpO1xuICAgICAgICAgICAgeSArPSBwYmYucmVhZFNWYXJpbnQoKTtcblxuICAgICAgICAgICAgaWYgKGNtZCA9PT0gMSkgeyAvLyBtb3ZlVG9cbiAgICAgICAgICAgICAgICBpZiAobGluZSkgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpbmUucHVzaChuZXcgUG9pbnQoeCwgeSkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY21kID09PSA3KSB7XG5cbiAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwbmlrLXZlY3Rvci10aWxlL2lzc3Vlcy85MFxuICAgICAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgICAgICBsaW5lLnB1c2gobGluZVswXS5jbG9uZSgpKTsgLy8gY2xvc2VQb2x5Z29uXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBjb21tYW5kICcgKyBjbWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxpbmUpIGxpbmVzLnB1c2gobGluZSk7XG5cbiAgICByZXR1cm4gbGluZXM7XG59O1xuXG5WZWN0b3JUaWxlRmVhdHVyZS5wcm90b3R5cGUuYmJveCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYmYgPSB0aGlzLl9wYmY7XG4gICAgcGJmLnBvcyA9IHRoaXMuX2dlb21ldHJ5O1xuXG4gICAgdmFyIGVuZCA9IHBiZi5yZWFkVmFyaW50KCkgKyBwYmYucG9zLFxuICAgICAgICBjbWQgPSAxLFxuICAgICAgICBsZW5ndGggPSAwLFxuICAgICAgICB4ID0gMCxcbiAgICAgICAgeSA9IDAsXG4gICAgICAgIHgxID0gSW5maW5pdHksXG4gICAgICAgIHgyID0gLUluZmluaXR5LFxuICAgICAgICB5MSA9IEluZmluaXR5LFxuICAgICAgICB5MiA9IC1JbmZpbml0eTtcblxuICAgIHdoaWxlIChwYmYucG9zIDwgZW5kKSB7XG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgY21kTGVuID0gcGJmLnJlYWRWYXJpbnQoKTtcbiAgICAgICAgICAgIGNtZCA9IGNtZExlbiAmIDB4NztcbiAgICAgICAgICAgIGxlbmd0aCA9IGNtZExlbiA+PiAzO1xuICAgICAgICB9XG5cbiAgICAgICAgbGVuZ3RoLS07XG5cbiAgICAgICAgaWYgKGNtZCA9PT0gMSB8fCBjbWQgPT09IDIpIHtcbiAgICAgICAgICAgIHggKz0gcGJmLnJlYWRTVmFyaW50KCk7XG4gICAgICAgICAgICB5ICs9IHBiZi5yZWFkU1ZhcmludCgpO1xuICAgICAgICAgICAgaWYgKHggPCB4MSkgeDEgPSB4O1xuICAgICAgICAgICAgaWYgKHggPiB4MikgeDIgPSB4O1xuICAgICAgICAgICAgaWYgKHkgPCB5MSkgeTEgPSB5O1xuICAgICAgICAgICAgaWYgKHkgPiB5MikgeTIgPSB5O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY21kICE9PSA3KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gY29tbWFuZCAnICsgY21kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbeDEsIHkxLCB4MiwgeTJdO1xufTtcblxuVmVjdG9yVGlsZUZlYXR1cmUucHJvdG90eXBlLnRvR2VvSlNPTiA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICB2YXIgc2l6ZSA9IHRoaXMuZXh0ZW50ICogTWF0aC5wb3coMiwgeiksXG4gICAgICAgIHgwID0gdGhpcy5leHRlbnQgKiB4LFxuICAgICAgICB5MCA9IHRoaXMuZXh0ZW50ICogeSxcbiAgICAgICAgY29vcmRzID0gdGhpcy5sb2FkR2VvbWV0cnkoKSxcbiAgICAgICAgdHlwZSA9IFZlY3RvclRpbGVGZWF0dXJlLnR5cGVzW3RoaXMudHlwZV0sXG4gICAgICAgIGksIGo7XG5cbiAgICBmdW5jdGlvbiBwcm9qZWN0KGxpbmUpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsaW5lLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgcCA9IGxpbmVbal0sIHkyID0gMTgwIC0gKHAueSArIHkwKSAqIDM2MCAvIHNpemU7XG4gICAgICAgICAgICBsaW5lW2pdID0gW1xuICAgICAgICAgICAgICAgIChwLnggKyB4MCkgKiAzNjAgLyBzaXplIC0gMTgwLFxuICAgICAgICAgICAgICAgIDM2MCAvIE1hdGguUEkgKiBNYXRoLmF0YW4oTWF0aC5leHAoeTIgKiBNYXRoLlBJIC8gMTgwKSkgLSA5MFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgICB2YXIgcG9pbnRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBvaW50c1tpXSA9IGNvb3Jkc1tpXVswXTtcbiAgICAgICAgfVxuICAgICAgICBjb29yZHMgPSBwb2ludHM7XG4gICAgICAgIHByb2plY3QoY29vcmRzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb2plY3QoY29vcmRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgIGNhc2UgMzpcbiAgICAgICAgY29vcmRzID0gY2xhc3NpZnlSaW5ncyhjb29yZHMpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgY29vcmRzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdChjb29yZHNbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb29yZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvb3JkcyA9IGNvb3Jkc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlID0gJ011bHRpJyArIHR5cGU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3Jkc1xuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0aWVzOiB0aGlzLnByb3BlcnRpZXNcbiAgICB9O1xuXG4gICAgaWYgKCdpZCcgaW4gdGhpcykge1xuICAgICAgICByZXN1bHQuaWQgPSB0aGlzLmlkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyBjbGFzc2lmaWVzIGFuIGFycmF5IG9mIHJpbmdzIGludG8gcG9seWdvbnMgd2l0aCBvdXRlciByaW5ncyBhbmQgaG9sZXNcblxuZnVuY3Rpb24gY2xhc3NpZnlSaW5ncyhyaW5ncykge1xuICAgIHZhciBsZW4gPSByaW5ncy5sZW5ndGg7XG5cbiAgICBpZiAobGVuIDw9IDEpIHJldHVybiBbcmluZ3NdO1xuXG4gICAgdmFyIHBvbHlnb25zID0gW10sXG4gICAgICAgIHBvbHlnb24sXG4gICAgICAgIGNjdztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGFyZWEgPSBzaWduZWRBcmVhKHJpbmdzW2ldKTtcbiAgICAgICAgaWYgKGFyZWEgPT09IDApIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChjY3cgPT09IHVuZGVmaW5lZCkgY2N3ID0gYXJlYSA8IDA7XG5cbiAgICAgICAgaWYgKGNjdyA9PT0gYXJlYSA8IDApIHtcbiAgICAgICAgICAgIGlmIChwb2x5Z29uKSBwb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xuICAgICAgICAgICAgcG9seWdvbiA9IFtyaW5nc1tpXV07XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvbHlnb24ucHVzaChyaW5nc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBvbHlnb24pIHBvbHlnb25zLnB1c2gocG9seWdvbik7XG5cbiAgICByZXR1cm4gcG9seWdvbnM7XG59XG5cbmZ1bmN0aW9uIHNpZ25lZEFyZWEocmluZykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSByaW5nLmxlbmd0aCwgaiA9IGxlbiAtIDEsIHAxLCBwMjsgaSA8IGxlbjsgaiA9IGkrKykge1xuICAgICAgICBwMSA9IHJpbmdbaV07XG4gICAgICAgIHAyID0gcmluZ1tqXTtcbiAgICAgICAgc3VtICs9IChwMi54IC0gcDEueCkgKiAocDEueSArIHAyLnkpO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVmVjdG9yVGlsZUZlYXR1cmUgPSByZXF1aXJlKCcuL3ZlY3RvcnRpbGVmZWF0dXJlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yVGlsZUxheWVyO1xuXG5mdW5jdGlvbiBWZWN0b3JUaWxlTGF5ZXIocGJmLCBlbmQpIHtcbiAgICAvLyBQdWJsaWNcbiAgICB0aGlzLnZlcnNpb24gPSAxO1xuICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgdGhpcy5leHRlbnQgPSA0MDk2O1xuICAgIHRoaXMubGVuZ3RoID0gMDtcblxuICAgIC8vIFByaXZhdGVcbiAgICB0aGlzLl9wYmYgPSBwYmY7XG4gICAgdGhpcy5fa2V5cyA9IFtdO1xuICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xuICAgIHRoaXMuX2ZlYXR1cmVzID0gW107XG5cbiAgICBwYmYucmVhZEZpZWxkcyhyZWFkTGF5ZXIsIHRoaXMsIGVuZCk7XG5cbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuX2ZlYXR1cmVzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gcmVhZExheWVyKHRhZywgbGF5ZXIsIHBiZikge1xuICAgIGlmICh0YWcgPT09IDE1KSBsYXllci52ZXJzaW9uID0gcGJmLnJlYWRWYXJpbnQoKTtcbiAgICBlbHNlIGlmICh0YWcgPT09IDEpIGxheWVyLm5hbWUgPSBwYmYucmVhZFN0cmluZygpO1xuICAgIGVsc2UgaWYgKHRhZyA9PT0gNSkgbGF5ZXIuZXh0ZW50ID0gcGJmLnJlYWRWYXJpbnQoKTtcbiAgICBlbHNlIGlmICh0YWcgPT09IDIpIGxheWVyLl9mZWF0dXJlcy5wdXNoKHBiZi5wb3MpO1xuICAgIGVsc2UgaWYgKHRhZyA9PT0gMykgbGF5ZXIuX2tleXMucHVzaChwYmYucmVhZFN0cmluZygpKTtcbiAgICBlbHNlIGlmICh0YWcgPT09IDQpIGxheWVyLl92YWx1ZXMucHVzaChyZWFkVmFsdWVNZXNzYWdlKHBiZikpO1xufVxuXG5mdW5jdGlvbiByZWFkVmFsdWVNZXNzYWdlKHBiZikge1xuICAgIHZhciB2YWx1ZSA9IG51bGwsXG4gICAgICAgIGVuZCA9IHBiZi5yZWFkVmFyaW50KCkgKyBwYmYucG9zO1xuXG4gICAgd2hpbGUgKHBiZi5wb3MgPCBlbmQpIHtcbiAgICAgICAgdmFyIHRhZyA9IHBiZi5yZWFkVmFyaW50KCkgPj4gMztcblxuICAgICAgICB2YWx1ZSA9IHRhZyA9PT0gMSA/IHBiZi5yZWFkU3RyaW5nKCkgOlxuICAgICAgICAgICAgdGFnID09PSAyID8gcGJmLnJlYWRGbG9hdCgpIDpcbiAgICAgICAgICAgIHRhZyA9PT0gMyA/IHBiZi5yZWFkRG91YmxlKCkgOlxuICAgICAgICAgICAgdGFnID09PSA0ID8gcGJmLnJlYWRWYXJpbnQ2NCgpIDpcbiAgICAgICAgICAgIHRhZyA9PT0gNSA/IHBiZi5yZWFkVmFyaW50KCkgOlxuICAgICAgICAgICAgdGFnID09PSA2ID8gcGJmLnJlYWRTVmFyaW50KCkgOlxuICAgICAgICAgICAgdGFnID09PSA3ID8gcGJmLnJlYWRCb29sZWFuKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gcmV0dXJuIGZlYXR1cmUgYGlgIGZyb20gdGhpcyBsYXllciBhcyBhIGBWZWN0b3JUaWxlRmVhdHVyZWBcblZlY3RvclRpbGVMYXllci5wcm90b3R5cGUuZmVhdHVyZSA9IGZ1bmN0aW9uKGkpIHtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSB0aGlzLl9mZWF0dXJlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignZmVhdHVyZSBpbmRleCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgICB0aGlzLl9wYmYucG9zID0gdGhpcy5fZmVhdHVyZXNbaV07XG5cbiAgICB2YXIgZW5kID0gdGhpcy5fcGJmLnJlYWRWYXJpbnQoKSArIHRoaXMuX3BiZi5wb3M7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3JUaWxlRmVhdHVyZSh0aGlzLl9wYmYsIGVuZCwgdGhpcy5leHRlbnQsIHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcyk7XG59O1xuIiwiLy9hZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvYmxvYi81ODg2NDIxZWE5YTVhZTI2Nzk3Yzk1MGVjNjk4YmU0NzNmZTg3ZDE3L3NyYy9zdHlsZS1zcGVjL2ZlYXR1cmVfZmlsdGVyL2luZGV4LmpzXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVGaWx0ZXI7XG5cbmNvbnN0IHR5cGVzID0gWydVbmtub3duJywgJ1BvaW50JywgJ0xpbmVTdHJpbmcnLCAnUG9seWdvbiddO1xuXG4vKipcbiAqIEdpdmVuIGEgZmlsdGVyIGV4cHJlc3NlZCBhcyBuZXN0ZWQgYXJyYXlzLCByZXR1cm4gYSBuZXcgZnVuY3Rpb25cbiAqIHRoYXQgZXZhbHVhdGVzIHdoZXRoZXIgYSBnaXZlbiBmZWF0dXJlICh3aXRoIGEgLnByb3BlcnRpZXMgb3IgLnRhZ3MgcHJvcGVydHkpXG4gKiBwYXNzZXMgaXRzIHRlc3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlciBtYXBib3ggZ2wgZmlsdGVyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGZpbHRlci1ldmFsdWF0aW5nIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZpbHRlcihmaWx0ZXIpIHtcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdmJywgYHZhciBwID0gKGYgJiYgZi5wcm9wZXJ0aWVzIHx8IHt9KTsgcmV0dXJuICR7Y29tcGlsZShmaWx0ZXIpfWApO1xufVxuXG5mdW5jdGlvbiBjb21waWxlKGZpbHRlcikge1xuICAgIGlmICghZmlsdGVyKSByZXR1cm4gJ3RydWUnO1xuICAgIGNvbnN0IG9wID0gZmlsdGVyWzBdO1xuICAgIGlmIChmaWx0ZXIubGVuZ3RoIDw9IDEpIHJldHVybiBvcCA9PT0gJ2FueScgPyAnZmFsc2UnIDogJ3RydWUnO1xuICAgIGNvbnN0IHN0ciA9XG4gICAgICAgIG9wID09PSAnPT0nID8gY29tcGlsZUNvbXBhcmlzb25PcChmaWx0ZXJbMV0sIGZpbHRlclsyXSwgJz09PScsIGZhbHNlKSA6XG4gICAgICAgIG9wID09PSAnIT0nID8gY29tcGlsZUNvbXBhcmlzb25PcChmaWx0ZXJbMV0sIGZpbHRlclsyXSwgJyE9PScsIGZhbHNlKSA6XG4gICAgICAgIG9wID09PSAnPCcgfHxcbiAgICAgICAgb3AgPT09ICc+JyB8fFxuICAgICAgICBvcCA9PT0gJzw9JyB8fFxuICAgICAgICBvcCA9PT0gJz49JyA/IGNvbXBpbGVDb21wYXJpc29uT3AoZmlsdGVyWzFdLCBmaWx0ZXJbMl0sIG9wLCB0cnVlKSA6XG4gICAgICAgIG9wID09PSAnfj0nID8gY29tcGlsZVJlZ2V4T3AoZmlsdGVyWzFdLCBmaWx0ZXJbMl0pIDpcbiAgICAgICAgb3AgPT09ICdhbnknID8gY29tcGlsZUxvZ2ljYWxPcChmaWx0ZXIuc2xpY2UoMSksICd8fCcpIDpcbiAgICAgICAgb3AgPT09ICdhbGwnID8gY29tcGlsZUxvZ2ljYWxPcChmaWx0ZXIuc2xpY2UoMSksICcmJicpIDpcbiAgICAgICAgb3AgPT09ICdub25lJyA/IGNvbXBpbGVOZWdhdGlvbihjb21waWxlTG9naWNhbE9wKGZpbHRlci5zbGljZSgxKSwgJ3x8JykpIDpcbiAgICAgICAgb3AgPT09ICdpbicgPyBjb21waWxlSW5PcChmaWx0ZXJbMV0sIGZpbHRlci5zbGljZSgyKSkgOlxuICAgICAgICBvcCA9PT0gJyFpbicgPyBjb21waWxlTmVnYXRpb24oY29tcGlsZUluT3AoZmlsdGVyWzFdLCBmaWx0ZXIuc2xpY2UoMikpKSA6XG4gICAgICAgIG9wID09PSAnaGFzJyA/IGNvbXBpbGVIYXNPcChmaWx0ZXJbMV0pIDpcbiAgICAgICAgb3AgPT09ICchaGFzJyA/IGNvbXBpbGVOZWdhdGlvbihjb21waWxlSGFzT3AoZmlsdGVyWzFdKSkgOlxuICAgICAgICAndHJ1ZSc7XG4gICAgcmV0dXJuIGAoJHtzdHJ9KWA7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVQcm9wZXJ0eVJlZmVyZW5jZShwcm9wZXJ0eSkge1xuICAgIHJldHVybiBwcm9wZXJ0eSA9PT0gJyR0eXBlJyA/ICdmLnR5cGUnIDpcbiAgICAgICAgcHJvcGVydHkgPT09ICckaWQnID8gJ2YuaWQnIDpcbiAgICAgICAgYHBbJHtKU09OLnN0cmluZ2lmeShwcm9wZXJ0eSl9XWA7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVDb21wYXJpc29uT3AocHJvcGVydHksIHZhbHVlLCBvcCwgY2hlY2tUeXBlKSB7XG4gICAgY29uc3QgbGVmdCA9IGNvbXBpbGVQcm9wZXJ0eVJlZmVyZW5jZShwcm9wZXJ0eSk7XG4gICAgY29uc3QgcmlnaHQgPSBwcm9wZXJ0eSA9PT0gJyR0eXBlJyA/IHR5cGVzLmluZGV4T2YodmFsdWUpIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIHJldHVybiAoY2hlY2tUeXBlID8gYHR5cGVvZiAke2xlZnR9PT09IHR5cGVvZiAke3JpZ2h0fSYmYCA6ICcnKSArIGxlZnQgKyBvcCArIHJpZ2h0O1xufVxuXG5mdW5jdGlvbiBjb21waWxlUmVnZXhPcChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBjb25zdCBsZWZ0ID0gY29tcGlsZVByb3BlcnR5UmVmZXJlbmNlKHByb3BlcnR5KTtcbiAgICBjb25zdCByaWdodCA9IHZhbHVlOyAvL0pTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICByZXR1cm4gYCR7J2Z1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7JyArXG4gICAgJ3JldHVybiBsZWZ0LnRvU3RyaW5nKCkubWF0Y2gocmlnaHQpOycgK1xuICAgICd9KCd9JHtsZWZ0fSwgJHtyaWdodH0pYDtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUxvZ2ljYWxPcChleHByZXNzaW9ucywgb3ApIHtcbiAgICByZXR1cm4gZXhwcmVzc2lvbnMubWFwKGNvbXBpbGUpLmpvaW4ob3ApO1xufVxuXG5mdW5jdGlvbiBjb21waWxlSW5PcChwcm9wZXJ0eSwgdmFsdWVzKSB7XG4gICAgaWYgKHByb3BlcnR5ID09PSAnJHR5cGUnKSB2YWx1ZXMgPSB2YWx1ZXMubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZXMuaW5kZXhPZih2YWx1ZSk7XG4gICAgfSk7XG4gICAgY29uc3QgbGVmdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlcy5zb3J0KGNvbXBhcmUpKTtcbiAgICBjb25zdCByaWdodCA9IGNvbXBpbGVQcm9wZXJ0eVJlZmVyZW5jZShwcm9wZXJ0eSk7XG5cbiAgICBpZiAodmFsdWVzLmxlbmd0aCA8PSAyMDApIHJldHVybiBgJHtsZWZ0fS5pbmRleE9mKCR7cmlnaHR9KSAhPT0gLTFgO1xuXG4gICAgcmV0dXJuIGAkeydmdW5jdGlvbih2LCBhLCBpLCBqKSB7JyArXG4gICAgICAgICd3aGlsZSAoaSA8PSBqKSB7IHZhciBtID0gKGkgKyBqKSA+PiAxOycgK1xuICAgICAgICAnICAgIGlmIChhW21dID09PSB2KSByZXR1cm4gdHJ1ZTsgaWYgKGFbbV0gPiB2KSBqID0gbSAtIDE7IGVsc2UgaSA9IG0gKyAxOycgK1xuICAgICAgICAnfScgK1xuICAgICdyZXR1cm4gZmFsc2U7IH0oJ30ke3JpZ2h0fSwgJHtsZWZ0fSwwLCR7dmFsdWVzLmxlbmd0aCAtIDF9KWA7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVIYXNPcChwcm9wZXJ0eSkge1xuICAgIHJldHVybiBwcm9wZXJ0eSA9PT0gJyRpZCcgPyAnXCJpZFwiIGluIGYnIDogYCR7SlNPTi5zdHJpbmdpZnkocHJvcGVydHkpfSBpbiBwYDtcbn1cblxuZnVuY3Rpb24gY29tcGlsZU5lZ2F0aW9uKGV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gYCEoJHtleHByZXNzaW9ufSlgO1xufVxuXG4vLyBDb21wYXJpc29uIGZ1bmN0aW9uIHRvIHNvcnQgbnVtYmVycyBhbmQgc3RyaW5nc1xuZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2dCA9IHJlcXVpcmUoJ3ZlY3Rvci10aWxlJyk7XG5jb25zdCBQcm90b2J1ZiA9IHJlcXVpcmUoJ3BiZicpO1xuY29uc3QgR2VvSlNPTkZlYXR1cmUgPSByZXF1aXJlKCdtYXBib3gtZ2wvc3JjL3V0aWwvdmVjdG9ydGlsZV90b19nZW9qc29uJyk7XG5jb25zdCBUaWxlQ29vcmQgPSByZXF1aXJlKCdtYXBib3gtZ2wvc3JjL3NvdXJjZS90aWxlX2Nvb3JkJyk7XG5jb25zdCBmZWF0dXJlRmlsdGVyID0gcmVxdWlyZSgnLi9mZWF0dXJlX2ZpbHRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIHF1ZXJ5U291cmNlRmVhdHVyZXMoc291cmNlSUQsIHBhcmFtcywgbWFwKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZUNhY2hlID0gbWFwLnN0eWxlLnNvdXJjZUNhY2hlc1tzb3VyY2VJRF07XG5cbiAgICAgICAgIC8vZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvYmxvYi81ODg2NDIxZWE5YTVhZTI2Nzk3Yzk1MGVjNjk4YmU0NzNmZTg3ZDE3L3NyYy9zb3VyY2UvcXVlcnlfZmVhdHVyZXMuanMjTDI1XG4gICAgICAgIGNvbnN0IHRpbGVzID0gc291cmNlQ2FjaGUuZ2V0UmVuZGVyYWJsZUlkcygpLm1hcCgoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VDYWNoZS5nZXRUaWxlQnlJRChpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGRhdGFUaWxlcyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0aWxlID0gdGlsZXNbaV07XG4gICAgICAgICAgICBjb25zdCBkYXRhSUQgPSBuZXcgVGlsZUNvb3JkKE1hdGgubWluKHRpbGUuc291cmNlTWF4Wm9vbSwgdGlsZS5jb29yZC56KSwgdGlsZS5jb29yZC54LCB0aWxlLmNvb3JkLnksIDApLmlkO1xuICAgICAgICAgICAgaWYgKCFkYXRhVGlsZXNbZGF0YUlEXSkge1xuICAgICAgICAgICAgICAgIGRhdGFUaWxlc1tkYXRhSURdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXJ5VGlsZShyZXN1bHQsIHBhcmFtcywgdGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfSxcblxuICAgIHF1ZXJ5VGlsZShyZXN1bHQsIHBhcmFtcywgdGlsZSkge1xuICAgICAgICBpZiAoIXRpbGUucmF3VGlsZURhdGEpIHJldHVybjtcblxuICAgICAgICBpZiAoIXRpbGUudnRMYXllcnMpIHtcbiAgICAgICAgICAgIHRpbGUudnRMYXllcnMgPSBuZXcgdnQuVmVjdG9yVGlsZShuZXcgUHJvdG9idWYodGlsZS5yYXdUaWxlRGF0YSkpLmxheWVycztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxheWVyID0gdGlsZS52dExheWVycy5fZ2VvanNvblRpbGVMYXllciB8fCB0aWxlLnZ0TGF5ZXJzW3BhcmFtcy5zb3VyY2VMYXllcl07XG5cbiAgICAgICAgaWYgKCFsYXllcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IGZlYXR1cmVGaWx0ZXIocGFyYW1zICYmIHBhcmFtcy5maWx0ZXIpO1xuICAgICAgICBjb25zdCBjb29yZCA9IHt6OiB0aWxlLmNvb3JkLnosIHg6IHRpbGUuY29vcmQueCwgeTogdGlsZS5jb29yZC55fTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBmZWF0dXJlID0gbGF5ZXIuZmVhdHVyZShpKTtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIoZmVhdHVyZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnZW9qc29uRmVhdHVyZSA9IG5ldyBHZW9KU09ORmVhdHVyZShmZWF0dXJlLCB0aWxlLmNvb3JkLnosIHRpbGUuY29vcmQueCwgdGlsZS5jb29yZC55KTtcbiAgICAgICAgICAgICAgICBnZW9qc29uRmVhdHVyZS50aWxlID0gY29vcmQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZ2VvanNvbkZlYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59O1xuIl19
