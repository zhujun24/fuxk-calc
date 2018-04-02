# fuxk-calc [![npm package](https://img.shields.io/npm/v/fuxk-calc.svg?style=flat-square)](https://www.npmjs.org/package/fuxk-calc) [![NPM downloads](https://img.shields.io/npm/dm/fuxk-calc.svg?style=flat-square)](https://npmjs.org/package/fuxk-calc) [![Dependency Status](https://david-dm.org/zhujun24/fuxk-calc.svg?style=flat-square)](https://david-dm.org/zhujun24/fuxk-calc)

A js library for accurate math calculate.

## Install
```bash
npm install fuxk-calc
```

## Dev
```bash
grunt
```

## How to use
```js
let FuxkCalc = require('fuxk-calc');

let fuxkCalc = new FuxkCalc();

// add
console.log(fuxkCalc.add(13.3333, 1.8888888)); // 15.2221888

// subtract
console.log(fuxkCalc.subtract(13.3333, 1.8888888)); // 11.4444112
console.log(fuxkCalc.subtract(0.2, 0.3)); // -0.1

// multiply
console.log(fuxkCalc.multiply(0.3, 0.13)); // 0.039

// divide
console.log(fuxkCalc.divide(0.3, 0.2)); // 1.5
```
