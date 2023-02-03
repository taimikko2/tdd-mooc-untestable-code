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
    let verified = await service.verifyHash(hash, word);
    expect(verified).to.be.true;
  });

  it("password can be changed", async () => {
    const pwd = "koira";
    const newPwd = "toinen " + pwd;
    user2.passwordHash = await service.hashPassword(pwd);
    const newHash = await service.hashPassword(newPwd);

    await service.save(user2);
    await service.changePassword(user2.userId, pwd, newPwd);
    let userChanged = await service.getById(user2.userId);
    expect(userChanged.userId).to.equal(user2.userId); 
    expect(await service.verifyHash(userChanged.passwordHash, newPwd)).to.be.true;
  });

  it("can't change password if old password is wrong", async () => {
    const pwd = "koira";
    const newPwd = "toinen " + pwd;
    user2.passwordHash = await service.hashPassword(pwd);
    const newHash = await service.hashPassword(newPwd);

    await service.save(user2);
    await service.changePassword(user2.userId, "kissa", newPwd);
    let userChanged = await service.getById(user2.userId);
    // virheilmoitus
    expect(userChanged.userId).to.equal(user2.userId); 
    expect(await service.verifyHash(userChanged.passwordHash, newPwd)).to.be.false;
  });
});
