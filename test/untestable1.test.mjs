import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  let day;
  it("Current date is number", () => {
    day = new Date();
    expect(daysUntilChristmas(day)).to.be.a("number");
  });
  
  it("2020-12-24 gives 1", () => {
    day = new Date('2020-12-24T00:00:00');
    expect(daysUntilChristmas(day)).to.be.equal(1);

    day = new Date('2020-12-24T23:59:50');
    expect(daysUntilChristmas(day)).to.be.equal(1);
  });

  it("2020-12-25 gives 0", () => {
    day = new Date('2020-12-25T00:00:00');
    expect(daysUntilChristmas(day)).to.be.equal(0);

    day = new Date('2020-12-25T23:59:50');
    expect(daysUntilChristmas(day)).to.be.equal(0);
  });

  it("'March 1, 1995 03:24:00' gives 299", () => {
    day = new Date('March 1, 1995 03:24:00');
    expect(daysUntilChristmas(day)).to.be.equal(299);
  });

  it("2023-12-26 gives 365", () => {
    day = new Date('2023-12-26T00:00:00');
    expect(daysUntilChristmas(day)).to.be.equal(365);
  });

});

// add day to parameter