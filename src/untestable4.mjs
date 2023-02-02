import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresUserDao {
  static db;

  constructor(host = "127.0.0.1", database = "untestable", port = 5432, user = "untestable", password = "secret") {
    this.db = new pg.Pool({
      user: user, 
      host: host, 
      database: database, 
      password: password, 
      port: port,  
    });
  }

  close() {
    this.db.end();
  }

  rowToUser(row) {
    return { userId: row.user_id, passwordHash: row.password_hash };
  }

  async getById(userId) {
    const { rows } = await this.db.query(
      `select user_id, password_hash
       from users
       where user_id = $1`,
      [userId]
    );
    return rows.map(this.rowToUser)[0] || null;
  }

  async save(user) {
    //console.log("savessa excluded "+excluded.password_hash);
    console.log("argon2.defaults "+argon2.defaults);
    await this.db.query(
      `insert into users (user_id, password_hash)
       values ($1, $2)
       on conflict (user_id) do update
           set password_hash = excluded.password_hash`,
      [user.userId, user.passwordHash]
    );
  }
}

export class PasswordService {
  users = new PostgresUserDao();
  salt; // = argon2.generateSaltSync();

  constructor(salt="suolaa, suolaa, enemmän suolaa.") {
    console.log("PasswordService constructor salt "+salt);
    this.salt = salt;
  }

  async save(user) {
    // TODO: salasanalle hashSync ennen talletusta
    await this.users.save(user);
  }

  async getById(userId) {
    let user = await this.users.getById(userId);
    // TODO: userille vielä salasanan purku ennen palautusta?
    return user;
  }

  async hashPassword(word) {
    let tmp = argon2.hashSync(word, this.salt);
    return tmp;
  }

  async verifyHash(hash, word) {
    return argon2.verifySync(hash, word);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    let tmp;
    //tmp = argon2.verifySync(user.passwordHash, oldPassword);
    //tmp = argon2.hashSync(oldPassword, this.salt);
    tmp = oldPassword == user.passwordHash; 
    console.log("vaihtamassa\n"+user.passwordHash+"\n"+ oldPassword+"\nsync "+tmp);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = argon2.hashSync(newPassword);
    console.log("vanha salasana on sama, asetetaan uusi");
    await this.users.save(user);
  }
}
