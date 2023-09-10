const db = require("../config/db");

class DashbordStorage {
    static save(dashbordValue) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO dashbord(title, subtitle, category, text, writer) VALUE(?, ?, ?, ?, ?);";
            db.query(query, [dashbordValue.title, dashbordValue.subtitle, dashbordValue.category, dashbordValue.text, dashbordValue.writer],
                (err) => {
                    if (err) reject(`${err}`);
                    resolve({success: true});
                });
        });
    };

    static readDashbord(title) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dashbord WHERE title = ?;";
            db.query(query, [title],
                (err, data) => {
                    if (err) reject(`${err}`);

                    if (data[0] !== undefined) {
                        resolve(data[0]);
                    }else {
                        resolve("ERROR THESE TITLE IS NOT EXIST")
                    }
                })
        })
    }

    static listDashbord(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM dashbord WHERE writer = ?;";
            db.query(query, [id],
                (err, data) => {
                    if (err) reject(`${err}`);

                    if (data !== undefined) {
                        resolve(data);
                    } else {
                        resolve("ERROR THESE DASHBORD IS NOT EXIST")
                    }
                })
        })
    }

    static deleteDashbord(title) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM dashbord WHERE title = ?;";
            db.query(query, [title],
                (err, data) => {
                    if (err) reject(`${err}`);

                    if (data !== undefined) {
                        resolve({success: true});
                    } else {
                        resolve({success: false, msg: "게시물을 삭제하는데 실패하였습니다."});
                    }
                })
        })
    }
};

module.exports = DashbordStorage;