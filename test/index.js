var expect = require('chai').expect;
var FuxkCalc = require('../');
var fuxkCalc = new FuxkCalc();

describe('js 浮点数加减精确加减计算测试', function () {
  it('13.3333 + 1.8888888 测试', function () {
    expect(fuxkCalc.add(13.3333, 1.8888888)).to.equal(15.2221888);
  });
  it('13.3333 - 1.8888888 测试', function () {
    expect(fuxkCalc.subtract(13.3333, 1.8888888)).to.equal(11.4444112);
  });
  it('0.2 - 0.3 测试', function () {
    expect(fuxkCalc.subtract(0.2, 0.3)).to.equal(-0.1);
  });
});
