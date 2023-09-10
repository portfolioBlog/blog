const db = require("../config/db");


class UserStorage {
    static getUsers (id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE id = ?", [id], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        })
    };

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                if (data[0] !== undefined) {
                    resolve(data[0]);
                }else {
                    resolve("err user not exisit")
                }
            });
        });
    };

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, password, email, name) VALUES(?, ?, ?, ?);";
            db.query(query, [userInfo.id, userInfo.password, userInfo.email, userInfo.name],
                (err) => {
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
}

module.exports = UserStorage;