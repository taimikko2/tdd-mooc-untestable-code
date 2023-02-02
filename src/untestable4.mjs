import argon2 from "@node-rs/argon2";
import pg from "pg";

export class PostgresUserDao {
  static instance;

  static getInstance() {
    return new PostgresUserDao();
    if (!this.instance) {
      this.instance = new PostgresUserDao();
    }
    return this.instance;
  }

  // TODO:lukee ympäristömuuttujia
  // TODO: porttien numerot

  db = new pg.Pool({
    user: "untestable", //process.env.PGUSER,
    host: "127.0.0.1", //process.env.PGHOST,
    database: "untestable", //process.env.PGDATABASE,
    password: "secret", //process.env.PGPASSWORD,
    port: 5432, //process.env.PGPORT,
  });

  close() {
    console.log("closing DB: " + JSON.stringify(this.db.options));
    // var propValue;
    // for (var propName in this.db) {
    //   propValue = this.db[propName];
    //   console.log(propName, propValue);
    // }
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
    console.log("getById(" + userId + ") " + JSON.stringify(rows.map(this.rowToUser)[0] || "{ei löytynyt}"));
    return rows.map(this.rowToUser)[0] || null;
  }

  async save(user) {
    console.log("saving user " + JSON.stringify(user));
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
  users = PostgresUserDao.getInstance();

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.users.getById(userId);
    if (!argon2.verifySync(user.passwordHash, oldPassword)) {
      throw new Error("wrong old password");
    }
    user.passwordHash = argon2.hashSync(newPassword);
    await this.users.save(user);
  }
}
