//모듈
const express = require("express");

const router = express.Router();

const ctrl = require("./ctrl");

router.get("/dashbord", 
// ctrl.process.isAuthenticated, 
ctrl.output.dashbord);
router.get("/login", ctrl.output.login);
router.get("/main", ctrl.process.isAuthenticated, ctrl.output.main);
router.get("/dashbord/main/:title", ctrl.output.mainText);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/getUserInfo", ctrl.process.getUserInfo);
router.post("/create/dashbord", ctrl.process.createDashbord);
router.post("/read/dashbord", ctrl.process.readText);
router.post("/read/dashbordLIst", ctrl.process.dashbordList);

module.exports = router;