import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";

describe("Untestable 4: enterprise application", () => {
  let service;
  let users;
  const user = {userId:1, passwordHash: "kissa"};

  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
  //  PostgresUserDao.getInstance().close();
  });

  it("save user and get user back from db", async () => {
    users = service.users;
   await users.save(user);
   //console.log("käyttäjiä: "+JSON.stringify(users));
//   expect(await users.getById(1)).to.deep.equal(user);

  });
  // PasswordService: service.changePassword(userId, oldPassword, newPassword)
});


// Database