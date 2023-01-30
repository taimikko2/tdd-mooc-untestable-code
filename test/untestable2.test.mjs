import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  it("value is a number", () => {
    expect(diceHandValue(1,2)).to.be.a("number");
  });

  it("diceHandValue is bigger of two digits", () => {
    expect(diceHandValue(1,2)).to.be.equal(2);
  });
  xit("diceHandValue is 100+number when numers are same", () => {
        expect(diceHandValue(2,2)).to.be.equal(102);
  });
  xit("todo", () => {
    expect(diceHandValue()).to.be.a("number");
  });
});
