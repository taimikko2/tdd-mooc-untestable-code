import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";

describe("Untestable 4: enterprise application", () => {
  let service;
  //let pgDao;
  const user = { userId: 1, passwordHash: "kissa" };
  const user2 = { userId: 2, passwordHash: "koira" };
  //var salt = await argon2.generateSalt(); // = argon2.generateSaltSync(); // "1234567890"; //

  beforeEach(() => {
    //pgDao = new PostgresUserDao();
    service = new PasswordService("vähemmän suolaa");
  });

  afterEach(() => {
    //pgDao.close();
    service.users.close();
  });

  it("save user and get user back from db", async () => {
    await service.save(user);
    let u2 = await service.getById(1);
    expect(u2).to.deep.equal(user);
  });

  it("password can be hashed ja verified", async () => {
    const word = "koira";
    let hash = await service.hashPassword(word);
    console.log(" hash " + word + " on " + hash);
    let verified = await service.verifyHash(hash, word);
    console.log("verified = "+verified);
    expect(verified).to.be.true;
  });

  xit("password can be changed", async () => {
    let tmp;
    tmp = argon2.hashSync("koira", salt);
    user2.passwordHash = tmp;
    console.log("hash " + tmp);
    return;
    await service.users.save(user2);
    let newPassword = "changed" + user2.passwordHash;
    console.log("viedään käyttäjä: " + JSON.stringify(user) + " new pw: " + newPassword);
    await service.changePassword(user.userId, user.passwordHash, newPassword);
    user.passwordHash = newPassword;
    let u2 = await service.users.getById(1);
    console.log("saadaan käyttäjä: " + JSON.stringify(u2));
    expect(u2).to.deep.equal(user);
  });

  xit("can't change password if old password is wrong", async () => {
    await service.users.save(user);
    //console.log("viedään käyttäjä: " + JSON.stringify(user));
    const newPassword = "changed " + user.passwordHash;
    await service.changePassword(user.userId, user.passwordHash, newPassword);
    user.passwordHash = newPassword;
    let u2 = await service.users.getById(1);
    //console.log("saadaan käyttäjä: " + JSON.stringify(u2));
    expect(u2).to.deep.equal(user);
  });
});
