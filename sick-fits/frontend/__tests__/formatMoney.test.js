import formatMoney from '../lib/formatMoney';

describe('format Money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
  });

  it("leave off cnts when it's whole dollars", () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(10000)).toEqual('$100');
    expect(formatMoney(50000000)).toEqual('$500,000');
  });

  it('it works with whole and fractonal dollars', () => {
    expect(formatMoney(140)).toEqual('$1.40');
    expect(formatMoney(5012)).toEqual('$50.12');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(45646461684123)).toEqual('$456,464,616,841.23');
  });
});
