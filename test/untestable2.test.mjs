import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

function distinctNumbers(amount) {
  const distinct = new Set();
  let die;
  for (let i = 0; i < amount; i++) {
    die = diceRoll();
    distinct.add(die);
  }
  return distinct;
}

describe("Untestable 2: a dice game", () => {
  it("value is a number", () => {
    expect(diceHandValue(1,2)).to.be.a("number");
  });

  it("diceHandValue is bigger of two digits", () => {
    expect(diceHandValue(1,2)).to.be.equal(2);
  });
  it("diceHandValue is 100+number when numers are same", () => {
        expect(diceHandValue(2,2)).to.be.equal(102);
  });

  xit("diceRoll gives values netween 1 and 6", () => {
    const numbers = distinctNumbers(100);
    expect(numbers.size).to.equal(6);
    // expect them all be between 1 and 6
  });
});
