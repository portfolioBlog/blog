//모듈
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();
dotenv.config();

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//세션
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use("/", home);

module.exports = app;
