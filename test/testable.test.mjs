import { expect } from "chai";
import {
  daysUntilChristmas,
  diceHandValue,
  diceRoll,
} from "../src/testable.mjs";

describe("Time: days until Christmas", () => {
  it("Christmas Day", () => {
    expect(daysUntilChristmas(new Date("2022-12-25T00:00:00"))).to.equal(0);
    expect(daysUntilChristmas(new Date("2022-12-25T12:00:00"))).to.equal(0);
    expect(daysUntilChristmas(new Date("2022-12-25T23:59:59"))).to.equal(0);
  });

  it("Christmas Eve", () => {
    expect(daysUntilChristmas(new Date("2022-12-24T00:00:00"))).to.equal(1);
    expect(daysUntilChristmas(new Date("2022-12-24T12:00:00"))).to.equal(1);
    expect(daysUntilChristmas(new Date("2022-12-24T23:59:59"))).to.equal(1);
  });

  it("1st of December", () => {
    expect(daysUntilChristmas(new Date("2022-12-01"))).to.equal(24);
  });

  it("the day after Christmas", () => {
    expect(daysUntilChristmas(new Date("2022-12-26"))).to.equal(364);
  });

  it("Midsummer's Day", () => {
    expect(daysUntilChristmas(new Date("2022-06-25"))).to.equal(183);
  });
});

describe("Randomness: a dice game", () => {
  it("dice rolls are between 1 and 6", () => {
    const roll = diceRoll();
    expect(roll).to.greaterThan(0.9);
    expect(roll).to.lessThan(6.1);
  });

  it("one pair", () => {
    expect(diceHandValue(1, 1)).to.equal(101);
    expect(diceHandValue(6, 6)).to.equal(106);
  });

  it("high die", () => {
    expect(diceHandValue(1, 2)).to.equal(2);
    expect(diceHandValue(6, 4)).to.equal(6);
  });
});
