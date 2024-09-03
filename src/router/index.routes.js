import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const q = "SELECT * FROM story";
    pool.query(q)
        .then(([datas])=>{
           // console.log(datas)
            res.render("home", {datas});
        })
});

router.get("/story/:id", (req, res) =>{
   // console.log(req.params)

    const q = "SELECT * FROM story WHERE id =?";
    pool.execute(q, [req.params.id])
        .then(([[data]]) => {
            res.render("story", {data});
        })
        .catch(error => console.log(error));
}); 

router.get("/admin", (req, res) =>{
    res.render("admin/index");
});

router.get("/admin/story", (req, res) => {
    const q = "SELECT * FROM story";
    pool.query(q).then(([stories]) => {
        res.render("admin/story/list", {stories});
    });
});

router.get("/admin/story/create", (req, res) =>{
    const q = "SELECT * FROM category";
    pool.query(q).then(([categories]) =>{
        res.render("admin/story/create" ,{ categories});
    });
});

router.post("/admin/story/create", (req, res) => {
    console.log(req.body);
   
    const q = "INSERT INTO story (title, content, publishDate, img, category_id) VALUE  (?, ?, NOW(), ?, ? )";

    pool.execute(q, [
        req.body.title,
        req.body.content,
        req.body.publishDate,
        req.body.img,
        req.body.category_id,
    ])

    .then(() =>{
        res.redirect("/admin/story");
    })

    .catch((error) => console.log(error))
});

router.get("/authentification", (req, res) => {
    const q = "SELECT * FROM user";

    pool.query(q).then(([users]) => {

    res.render("authentification", {users})
    
})
});


router.get("*", (req, res) => {
    res.render("error");
});



export default router;