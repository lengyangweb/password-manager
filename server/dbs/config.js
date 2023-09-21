const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();

/**
 * Open database
 * @returns database instance
 */
const openDB = () => {
    return new sqlite3.Database("./test.db", (err) => {
        if (err) return console.error(err.message.red);
    });
}

module.exports = { openDB };

// Create table
// sql = `CREATE TABLE users(
//     id INTEGER PRIMARY KEY,
//     username,
//     email,
//     password
// )`;
// db.run(sql); // run command

// drop table
// const db = openDB();
// db.run("DROP TABLE users");

// insertion
// sql = `INSERT INTO users(username, password, email)
//     VALUES (?, ?, ?)
// `;
// db.run(sql, ['lengyang', 'admin@gmail.com', '123456789@!'], (err) => {
//     if (err) return console.error(err.message);
// });

// query the data
// const db = openDB();
// let sql = `SELECT * FROM users`;
// db.all(sql, [], (err, users) => {
//     if (err) return console.error(err.message);

//     users.forEach((user) => console.log(user));
// })

// update data
// sql = `UPDATE users SET username = ? WHERE id = ?`;
// DB.run(sql, ["leng_yang", 1], (err, res) => {
//     if (err) return console.error(err.message);
//     console.log(res);
// })