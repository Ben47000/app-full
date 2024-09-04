import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";


import { home, story, authentification, error, subscribe } from "../controller/view.js";
import admin_routes from "./admin.routes.js";

const router = express.Router();

router.get("/", home );

router.get("/story/:id", story ); 

router.get("/authentification", authentification);

router.get("/subscribe", subscribe);

router.get("/logout", (req, res) =>{

    req.session.destroy(() =>{
        req.session = null;
        res.clearCookie("connect.sid");
        res.redirect("/")
    })
});


//CREATE USER//

router.post("/subscribe", async (req, res) =>{

    if(req.body.username.length > 3 && req.body.password.length > 3){
        console.log(req.body)
        
        const hash = await bcrypt.hash(req.body.password, 10);

        const q = "INSERT INTO user (username, password) VALUES (?, ?)";

        await pool.execute(q, [req.body.username, hash]);

        res.redirect("/authentification");
        return;

    }

    res.redirect("/subscribe");
})

//LOGIN//

router.post("/authentification", async (req, res) =>{
    const q = "SELECT username, password, role FROM `user` WHERE username = ?";

    const[[user]]= await pool.execute(q, [req.body.username]);
    console.log(user)
    if(user){

        const same = await bcrypt.compare(req.body.password, user.password)
        console.log(req.body.password)
        console.log(same);

        if(same){

            req.session.user = req.body;
            req.session.isLogged = true;

            res.redirect("/");

            return;
        }
    }

    
    console.log("MAUVAIS IDENTIFIANT(S), VEUILLEZ REESSAYER !");
    res.redirect("/authentification");
})



router.use("/admin", admin_routes)
router.get("*", error );



export default router;