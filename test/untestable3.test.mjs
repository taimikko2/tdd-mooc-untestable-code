import { expect, assert } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";
import { writeFile } from "node:fs/promises";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const result = []
describe("Untestable 3: CSV file parsing", () => {
  beforeEach(() => {
    let data = `Jaska,Jokunen,6,Male`; 
    writeFile('untestable3.csv', data, (error) => {
      if (error) throw err;
    });
    data = `Loid,Forger,,Male
    Anya,Forger,6,Female
    Yor,Forger,27,Female`;
    writeFile('people.csv', data, (error) => {
      if (error) throw err;
    })

  });

  it("can parse one people", async () => {
    try {
      let res = await parsePeopleCsv("untestable3.csv");
      res.forEach (function(value, key) {
        console.log("for each "+ JSON.stringify(key) + ' = ' + JSON.stringify(value));
      })
      expect(res).to.deep.equal([{firstName: "Jaska",
        lastName: "Jokunen",
        age: 6,
        gender: "m"}]);
    } catch (e) {
      console.error("Virhe "+e);
    }
  });

  it("noes not accept wrong result (gender should be 'm' not 'Male')", async () => {
    try {
      let res = await parsePeopleCsv("untestable3.csv");
      res.forEach (function(value, key) {
        console.log("for each "+ JSON.stringify(key) + ' = ' + JSON.stringify(value));
      })
      expect(res).to.deep.equal([{firstName: "Jaska",
        lastName: "Jokunen",
        age: 6,
        gender: "Male"}]);
      assert.doesNotThrow(parsePeopleCsv, AssertionError);
    } catch (e) {
      console.error("Virhe "+e);
    }
  });


  xit("can parse several people", async () => {
    // TODO: write proper tests
    let res = await parsePeopleCsv("people.csv");
    let person;
    for (let i=0; i<res.length; i++) {
      person = res[i];
      console.log("it can parse People Csv "+person.firstName+" "+person.lastName+" "+person.age);
    }
    res.forEach (function(value, key) {
      console.log("for each "+ JSON.stringify(key) + ' = ' + JSON.stringify(value));
    })
    try {
      // await parsePeopleCsv("people.csv"))
      expect(res).to.deep.equal([{firstName: "Jaska",
        lastName: "Jokunen",
        gender: "male",
        age: 6}]);
    } catch (e) {
      console.error("Virhe "+e);
      console.log(e.firstName+" "+e.lastName+" "+e.age+" "+e.gender);
    }
  });

  // skip empty lines

  // trim

});

// File System
// File name as parameter