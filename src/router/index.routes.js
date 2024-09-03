import express from "express";
import pool from "../config/db.js";

import { home, story, admin, admin_story, admin_story_create, authentification, error } from "../controller/view.js";
const router = express.Router();

router.get("/", home );

router.get("/story/:id", story ); 

router.get("/admin", admin );

router.get("/admin/story", admin_story );

router.get("/admin/story/create", admin_story_create );

router.get("/authentification", authentification);

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




router.get("*", error );



export default router;