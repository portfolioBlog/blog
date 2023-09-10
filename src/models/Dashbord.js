const DashbordStorage = require("./DashbordStorage");

class Dashbord {
    constructor(body) {
        this.body = body;
    }

    async create () {
        const client = this.body;
        try {
            const response = await DashbordStorage.save(client);
            return response;
        } catch (err) {
            return {success : false, msg: err.toString()};
        };
    };
    async read(title) {
        try {
            const response = await DashbordStorage.readDashbord(title);
            if (response === "ERROR THESE TITLE IS NOT EXIST") {
                return {success : false, msg : "해당이름을 가진 게시물은 존재하지 않습니다."}
            }
            return response;
        } catch (err) {
            return {success:false, msg: err.toString()};
        }
    }
    async list(id) {
        try {
            const response = await DashbordStorage.listDashbord(id);
            return response;
        } catch (err) {

        }
    }
};

module.exports = Dashbord;