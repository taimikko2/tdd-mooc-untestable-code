import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2.mjs";

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
    expect(diceHandValue(1, 2)).to.be.a("number");
  });

  it("diceHandValue is bigger of two digits", () => {
    expect(diceHandValue(1, 2)).to.be.equal(2);
  });
  it("diceHandValue is 100+number when numers are same", () => {
    expect(diceHandValue(2, 2)).to.be.equal(102);
  });

  it("diceRoll gives 6 different values", () => {
    const numbers = distinctNumbers(100);
    expect(numbers.size).to.equal(6);
  });

  it("diceRoll gives values netween 1 and 6", () => {
    const numbers = distinctNumbers(100);
    numbers.forEach(function (value) {
      expect(value).to.be.lte(6).and.gte(1);
    });
  });
});
