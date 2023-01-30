import { expect } from "chai";
import { writeFile, unlink } from "node:fs/promises";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

const file1 = "untestable3-1.csv";
const file2 = "untestable3-2.csv";
const file3 = "people.csv";
describe("Untestable 3: CSV file parsing", () => {
  beforeEach(() => {
    let data = `Jaska,Jokunen,6,Male`;
    writeFile(file1, data, (error) => {
      if (error) {
        console.error("ERROR: untestable3-1.csv "+error);
        throw err;
      }
    });
    writeFile(file2, data, (error) => {
      if (error) {
        console.error("ERROR: untestable3-2.csv "+error);
        throw err;
      }
    });
    data = `Loid,Forger,,Male
    Anya,Forger,6,Female
    Yor,Forger,27,Female`;
    writeFile(file3, data, (error) => {
      if (error) throw err;
    });
  });

  it("can parse one people", async () => {
    try {
      const res = await parsePeopleCsv(file1);
      expect(res).to.deep.equal([{ firstName: "Jaska", lastName: "Jokunen", age: 6, gender: "m" }]);
    } catch (e) {
      expect(e).not.to.exist;
      console.log("ERROR: can parse one people " + e);
    } finally {
      unlink(file1);
    }
  });

  it("does not accept wrong result (gender should be 'm' not 'Male')", async () => {
    try {
      const r = await parsePeopleCsv(file2);
      expect(r).not.to.deep.equal([{ firstName: "Jaska", lastName: "Jokunen", age: 6, gender: "Male" }]);
    } catch (e) {
      console.log("does not accept wrong result (gender should be 'm' not 'Male') " + e);
      expect(e).not.to.exist;
      //expect(e).to.be.an('error');
    } finally {
      unlink(file2);
    }
  });

  xit("can parse several people", async () => {
    // TODO: write proper tests
    let res = await parsePeopleCsv(file3);
    let person;
    for (let i = 0; i < res.length; i++) {
      person = res[i];
      console.log("it can parse People Csv " + person.firstName + " " + person.lastName + " " + person.age);
    }
    res.forEach(function (value, key) {
      console.log("for each " + JSON.stringify(key) + " = " + JSON.stringify(value));
    });
    try {
      // await parsePeopleCsv("people.csv"))
      expect(res).to.deep.equal([{ firstName: "Jaska", lastName: "Jokunen", gender: "male", age: 6 }]);
    } catch (e) {
      console.error("Virhe " + e);
      console.log(e.firstName + " " + e.lastName + " " + e.age + " " + e.gender);
    }
  });

  // skip empty lines

  // trim

  unlink(file1);
  unlink(file2);

});

// File System
// File name as parameter
