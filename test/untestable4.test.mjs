import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  let pgDao;
  let users;
  const user = { userId: 1, passwordHash: "kissa" };
  const user2 = { userId: 2, passwordHash: "koira" };
  beforeEach(() => {
    pgDao = new PostgresUserDao();
    service = new PasswordService();
  });

  afterEach(() => {
    //pgDao.close();
    service.users.close();
  });

  it("save user and get user back from db", async () => {
    // console.log("user: "+process.env.POSTGRES_USER);
    // console.log("password: "+process.env.POSTGRES_PASSWORD);
    await service.users.save(user);
    //console.log("viedään käyttäjä: " + JSON.stringify(user));
    let u2 = await service.users.getById(1);
    //console.log("saadaan käyttäjä: " + JSON.stringify(u2));
    expect(u2).to.deep.equal(user);
  });

  xit("change password", async () => {
    await service.users.save(user);
    //console.log("viedään käyttäjä: " + JSON.stringify(user));
    const newPassword = "changed "+user.passwordHash;
    await service.changePassword(user.userId, user.passwordHash, newPassword);
    user.passwordHash = newPassword;
    let u2 = await service.users.getById(1);
    //console.log("saadaan käyttäjä: " + JSON.stringify(u2));
    expect(u2).to.deep.equal(user);
  });
  
  // vaihto ei pitäisi onnistua, jos vanha salasana ei vastaa olemassa olevaa ?
});

// Database


