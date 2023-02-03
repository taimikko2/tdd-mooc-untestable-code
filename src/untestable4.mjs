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
    this.salt = salt;
  }

  async save(user) {
    await this.users.save(user);
  }

  async getById(userId) {
    let user = await this.users.getById(userId);
    return user;
  }

  async hashPassword(word) {
    return argon2.hashSync(word, this.salt);
  }

  async verifyHash(hash, word) {
    return argon2.verifySync(hash, word);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    } 
    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}
