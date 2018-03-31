'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// js 浮点数加减精确加减计算

var padStart = function padStart(string, targetLength, padString) {
  // truncate if number or convert non-number to 0
  targetLength = targetLength >> 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (string.length > targetLength) {
    return String(string);
  }
  targetLength = targetLength - string.length;
  if (targetLength > padString.length) {
    // append to original to ensure we are longer than needed
    padString += padString.repeat(targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(string);
};

var padEnd = function padEnd(string, targetLength, padString) {
  // floor if number or convert non-number to 0
  targetLength = targetLength >> 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (string.length > targetLength) {
    return String(string);
  }
  targetLength = targetLength - string.length;
  if (targetLength > padString.length) {
    // append to original to ensure we are longer than needed
    padString += padString.repeat(targetLength / padString.length);
  }
  return String(string) + padString.slice(0, targetLength);
};

var fuxkCalc = function () {
  function fuxkCalc() {
    _classCallCheck(this, fuxkCalc);
  }

  _createClass(fuxkCalc, [{
    key: 'safeCheck',
    value: function safeCheck(number) {
      return !Number.isNaN(number) && Number.isFinite(number);
    }
  }, {
    key: 'typeCheck',
    value: function typeCheck(number) {
      // true 整数
      return Number.isInteger(number);
    }
  }, {
    key: 'toInt',
    value: function toInt(number) {
      return Number.parseInt(number, 10);
    }
  }, {
    key: 'toFloat',
    value: function toFloat(number) {
      return Number.parseFloat(number);
    }
  }, {
    key: 'add',
    value: function add(a, b) {
      if (!this.safeCheck(a) || !this.safeCheck(b)) {
        // input invalid
        return false;
      }
      if (this.typeCheck(a) && this.typeCheck(b)) {
        // must have a floating point
        return a + b;
      }

      var intA = void 0;
      var intB = void 0;
      var floatA = void 0;
      var floatB = void 0;

      var _a$toString$split = a.toString().split('.');

      var _a$toString$split2 = _slicedToArray(_a$toString$split, 2);

      intA = _a$toString$split2[0];
      var _a$toString$split2$ = _a$toString$split2[1];
      floatA = _a$toString$split2$ === undefined ? 0 : _a$toString$split2$;

      var _b$toString$split = b.toString().split('.');

      var _b$toString$split2 = _slicedToArray(_b$toString$split, 2);

      intB = _b$toString$split2[0];
      var _b$toString$split2$ = _b$toString$split2[1];
      floatB = _b$toString$split2$ === undefined ? 0 : _b$toString$split2$;

      if (!floatA || !floatB) {
        // one int numer in [a, b]
        return this.toFloat(this.toInt(intA) + this.toInt(intB) + '.' + (this.toFloat(floatA) + this.toFloat(floatB)));
      }

      var maxFloatLength = Math.max(floatA.length, floatB.length);
      floatA = padEnd(floatA, maxFloatLength, '0');
      floatB = padEnd(floatB, maxFloatLength, '0');
      var floatSum = (this.toInt(floatA) + this.toInt(floatB)).toString();
      var carry = Number(floatSum.length > maxFloatLength);
      floatSum = floatSum.substr(carry);
      return this.toFloat(this.toInt(intA) + this.toInt(intB) + carry + '.' + floatSum);
    }
  }, {
    key: 'subtract',
    value: function subtract(a, b) {
      if (!this.safeCheck(a) || !this.safeCheck(b)) {
        // input invalid
        return false;
      }
      if (this.typeCheck(a) && this.typeCheck(b)) {
        // must have a floating point
        return a - b;
      }

      var shouldReverse = b > a;
      var delta = void 0;

      // make a > b

      var intA = void 0;
      var intB = void 0;
      var floatA = void 0;
      var floatB = void 0;

      var _toString$split = (shouldReverse ? b : a).toString().split('.');

      var _toString$split2 = _slicedToArray(_toString$split, 2);

      intA = _toString$split2[0];
      var _toString$split2$ = _toString$split2[1];
      floatA = _toString$split2$ === undefined ? '0' : _toString$split2$;

      var _toString$split3 = (shouldReverse ? a : b).toString().split('.');

      var _toString$split4 = _slicedToArray(_toString$split3, 2);

      intB = _toString$split4[0];
      var _toString$split4$ = _toString$split4[1];
      floatB = _toString$split4$ === undefined ? '0' : _toString$split4$;


      var maxIntLength = Math.max(intA.length, intB.length);
      intA = padStart(intA, maxIntLength, '0');
      intB = padStart(intB, maxIntLength, '0');

      var maxFloatLength = Math.max(floatA.length, floatB.length);
      floatA = padEnd(floatA, maxFloatLength, '0');
      floatB = padEnd(floatB, maxFloatLength, '0');

      if (intA === intB) {
        delta = '0.' + (this.toInt(floatA) - this.toInt(floatB));
      } else {
        if (floatA.localeCompare(floatB) >= 0) {
          // floatA >= floatB
          delta = this.toInt(intA) - this.toInt(intB) + '.' + (this.toInt(floatA) - this.toInt(floatB));
        } else {
          // 借位再减
          var intDelta = this.toInt(intA) - this.toInt(intB) - 1;
          var floatDelta = this.toInt('1' + floatA) - this.toInt(floatB);

          delta = intDelta + '.' + floatDelta;
        }
      }
      return this.toFloat(shouldReverse ? '-' + delta : delta);
    }
  }]);

  return fuxkCalc;
}();

exports.default = fuxkCalc;
