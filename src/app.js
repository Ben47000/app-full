import "dotenv/config";
import express from "express";
import path from "path";
import session from "express-session";

import router from "./router/index.routes.js"


//console.log("Hello woorld");

const app = express();

const PORT = process.env.LOCAL_PORT;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/view"));

app.use("/css", express.static(path.join(process.cwd(), "public/css")));
app.use("/img", express.static(path.join(process.cwd(), "public/img")));


app.use(express.urlencoded({extended : false}));

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true, maxAge: 259200000}
}));

app.use((req, res, next) =>{
    //console.log(req.session);

    const username = req.session.isLogged ? req.session.user.username : "Guest";
    res.locals.username = username;
    res.locals.isLogged = req.session.isLogged;

    next();
});

app.use(router)


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

