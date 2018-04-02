// padStart & padEnd 无需判断 string.length > targetLength，调用方已经处理
const padStart = (string, targetLength, padString) => {
  // truncate if number or convert non-number to 0
  targetLength = targetLength >> 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '));
  // if (string.length > targetLength) {
  //   return String(string);
  // }
  targetLength = targetLength - string.length;
  if (targetLength > padString.length) {
    // append to original to ensure we are longer than needed
    padString += padString.repeat(targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(string);
};

const padEnd = (string, targetLength, padString) => {
  // floor if number or convert non-number to 0
  targetLength = targetLength >> 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '));
  // if (string.length > targetLength) {
  //   return String(string);
  // }
  targetLength = targetLength - string.length;
  if (targetLength > padString.length) {
    // append to original to ensure we are longer than needed
    padString += padString.repeat(targetLength / padString.length);
  }
  return String(string) + padString.slice(0, targetLength);
};

export default class fuxkCalc {
  safeCheck(number) {
    return !Number.isNaN(number) && Number.isFinite(number);
  }

  typeCheck(number) {
    // true 整数
    return Number.isInteger(number);
  }

  toInt(number) {
    return Number.parseInt(number, 10);
  }

  toFloat(number) {
    return Number.parseFloat(number);
  }

  add(a, b) {
    if (!this.safeCheck(a) || !this.safeCheck(b)) {
      // input invalid
      return false;
    }
    // if (this.typeCheck(a) && this.typeCheck(b)) {
    //   // must have a floating point
    //   return a + b;
    // }

    let intA;
    let intB;
    let floatA;
    let floatB;
    [intA, floatA = 0] = a.toString().split('.');
    [intB, floatB = 0] = b.toString().split('.');
    if (!floatA || !floatB) {
      // one int numer in [a, b]
      return this.toFloat(`${this.toInt(intA) + this.toInt(intB)}.${this.toFloat(floatA) + this.toFloat(floatB)}`);
    }

    let maxFloatLength = Math.max(floatA.length, floatB.length);
    floatA = padEnd(floatA, maxFloatLength, '0');
    floatB = padEnd(floatB, maxFloatLength, '0');
    let floatSum = (this.toInt(floatA) + this.toInt(floatB)).toString();
    let carry = Number(floatSum.length > maxFloatLength);
    floatSum = floatSum.substr(carry);
    return this.toFloat(`${this.toInt(intA) + this.toInt(intB) + carry}.${floatSum}`);
  }

  subtract(a, b) {
    if (!this.safeCheck(a) || !this.safeCheck(b)) {
      // input invalid
      return false;
    }
    // if (this.typeCheck(a) && this.typeCheck(b)) {
    //   // must have a floating point
    //   return a - b;
    // }

    let shouldReverse = b > a;
    let delta;

    // make a > b

    let intA;
    let intB;
    let floatA;
    let floatB;
    [intA, floatA = '0'] = (shouldReverse ? b : a).toString().split('.');
    [intB, floatB = '0'] = (shouldReverse ? a : b).toString().split('.');

    let maxIntLength = Math.max(intA.length, intB.length);
    intA = padStart(intA, maxIntLength, '0');
    intB = padStart(intB, maxIntLength, '0');

    let maxFloatLength = Math.max(floatA.length, floatB.length);
    floatA = padEnd(floatA, maxFloatLength, '0');
    floatB = padEnd(floatB, maxFloatLength, '0');

    if (intA === intB) {
      delta = `0.${this.toInt(floatA) - this.toInt(floatB)}`;
    } else {
      if (floatA.localeCompare(floatB) >= 0) {
        // floatA >= floatB
        delta = `${this.toInt(intA) - this.toInt(intB)}.${this.toInt(floatA) - this.toInt(floatB)}`;
      } else {
        // 借位再减
        let intDelta = this.toInt(intA) - this.toInt(intB) - 1;
        let floatDelta = this.toInt(`1${floatA}`) - this.toInt(floatB);

        delta = `${intDelta}.${floatDelta}`;
      }
    }
    return this.toFloat(shouldReverse ? `-${delta}` : delta);
  }

  multiply(a, b) {
    if (!this.safeCheck(a) || !this.safeCheck(b)) {
      // input invalid
      return false;
    }
    // if (this.typeCheck(a) && this.typeCheck(b)) {
    //   // must have a floating point
    //   return a * b;
    // }

    a = a.toString().replace(/0*$/, '');
    b = b.toString().replace(/0*$/, '');
    let floatA = a.split('.')[1] || '';
    let floatB = b.split('.')[1] || '';

    let pow = floatA.length + floatB.length;
    return (this.toInt(a.replace('.', '')) * this.toInt(b.replace('.', ''))) / Math.pow(10, pow);
  }

  divide(a, b) {
    if (!this.safeCheck(a) || !this.safeCheck(b)) {
      // input invalid
      return false;
    }
    // if (this.typeCheck(a) && this.typeCheck(b)) {
    //   // must have a floating point
    //   return a / b;
    // }

    a = a.toString().replace(/0*$/, '');
    b = b.toString().replace(/0*$/, '');
    let floatA = a.split('.')[1] || '';
    let floatB = b.split('.')[1] || '';

    let pow = floatA.length - floatB.length;
    return (this.toInt(a.replace('.', '')) / this.toInt(b.replace('.', ''))) / Math.pow(10, pow);
  }
}
