const User = require("../../models/User");
const Dashbord = require("../../models/Dashbord");

const output = {
    dashbord : (req, res) => {
        const userInfo = req.session.user;
        res.render("home/dashbord", {userInfo})
    },
    login : (req, res) => {
        const userInfo = req.session.user;
        res.render("home/login", {userInfo});
    },
    main : async (req, res) => {
        const userInfo = req.session.user;
        res.render("home/main", {userInfo});
    },
    mainText : async (req, res) => {
        const userInfo = req.session.user;
        const dashbord = new Dashbord();
        const responseDashbord = await dashbord.read(req.params.title);
        req.session.responseDashbord = responseDashbord;
        res.render("home/text", {userInfo, responseDashbord});
    }
};

const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        req.session.user = response.userInfo;
        return res.json(response);
    },
    isAuthenticated : (req, res, next) => {
        if (req.session.user) {
            return next(); // 인증된 사용자일 경우 다음 미들웨어로 이동
        }
        res.status(401).render("home/error"); // 인증되지 않은 사용자 처리
    },
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    getUserInfo : (req, res) => {
        if (req.session.user) {
            const response = {success: true, info: req.session.user}
            res.json(response)
        } else {
            const response = {success: false, msg: "유저의 정보가 없음"}
            res.json(response)
        }
    },
    createDashbord : async (req, res) => {
        const dashbord = new Dashbord(req.body);
        const response = await dashbord.create();
        return res.json(response);
    },
    readText : (req, res) => {
        if (req.session.responseDashbord) {
            const response = {success : true};
            return res.json(response);
        }
        const response = {success : false, msg : "해당 게시판은 존재하지 않습니다."};
        return res.json(response);
    },
    dashbordList : async (req, res) => {
        const userInfo = req.session.user;
        const dashbord = new Dashbord();
        const dashbordList = await dashbord.list(userInfo.userId);
        return res.json(dashbordList);
    },
    deleteDashbord : async (req, res) => {
        const dashbordInfo = req.body;
        const userInfo = req.session.user;
        if (dashbordInfo.writer === userInfo.userId ) {
            const dashbord = new Dashbord();
            const response = await dashbord.delete(dashbordInfo.title);
            return res.json(response);
        }
        return res.json({success: false, msg: "작성자만 해당 게시물을 삭제 할 수 있습니다."});
        
    }
}

module.exports = {
    output,
    process
};