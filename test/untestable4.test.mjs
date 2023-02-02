import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";

describe("Untestable 4: enterprise application", () => {
  let service;
  const user = { userId: 1, passwordHash: "kissa" };
  const user2 = { userId: 2, passwordHash: "koira" };

  beforeEach(() => {
    service = new PasswordService("vähemmän suolaa");
  });

  afterEach(() => {
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
    //console.log(" hash " + word + " on " + hash);
    let verified = await service.verifyHash(hash, word);
    //console.log("verified = "+verified);
    expect(verified).to.be.true;
  });

  it("password can be changed", async () => {
    const pwd = "koira";
    let hash = await service.hashPassword(pwd);
    user2.passwordHash = hash;
    console.log("talletetaan user2 " + JSON.stringify(user2));
    await service.save(user2);
    const newPwd = "toinen " + pwd;
    hash = await service.hashPassword(newPwd);
//    console.log("viedään käyttäjä: " + JSON.stringify(user2) + " new pw: " + newPassword);
    await service.changePassword(user.userId, user.passwordHash, newPwd);
    user2.passwordHash = hash;
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
