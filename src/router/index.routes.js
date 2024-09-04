import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import session from "express-session";

import { home, story, admin, admin_story, admin_story_create, authentification, error, subscribe } from "../controller/view.js";

const router = express.Router();

router.get("/", home );

router.get("/story/:id", story ); 

router.get("/admin", admin );

router.get("/admin/story", admin_story );

router.get("/admin/story/create", admin_story_create );

router.get("/authentification", authentification);

router.get("/subscribe", subscribe);

router.get("/logout", (req, res) =>{

    req.session.destroy(() =>{
        req.session = null;
        res.clearCookie("connect.sid");
        res.redirect("/")
    })
});


//CREATE STORY//

router.post("/admin/story/create", (req, res) => {
    console.log(req.body);
   
    const q = "INSERT INTO story (title, content, publishDate, img, category_id) VALUE  (?, ?, NOW(), ?, ? )";

    pool.execute(q, [
        req.body.title,
        req.body.content,
        //req.body.publishDate,
        req.body.img,
        req.body.category_id,
    ])

    .then(() =>{
        res.redirect("/admin/story");
    })

    .catch((error) => console.log(error))
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
    const q = "SELECT username, password FROM `user` WHERE username = ?";

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




router.get("*", error );



export default router;