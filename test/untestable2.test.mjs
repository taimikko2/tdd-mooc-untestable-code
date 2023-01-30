import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  it("value is a number", () => {
    // TODO: write proper tests
    expect(diceHandValue()).to.be.a("number");
  });

  xit("todo", () => {
    expect(diceHandValue()).to.be.a("number");
  });
  xit("todo", () => {
        expect(diceHandValue()).to.be.a("number");
  });
  xit("todo", () => {
    expect(diceHandValue()).to.be.a("number");
  });
});
