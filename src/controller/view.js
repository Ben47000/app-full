import pool from "../config/db.js"

const home = (req, res) => {
    const q = "SELECT * FROM story";
    pool.query(q)
        .then(([datas])=>{

            res.render("home", {datas});
        });
    };

const story = (req, res) =>{

     const q = "SELECT * FROM story WHERE id =?";
     pool.execute(q, [req.params.id])
         .then(([[data]]) => {
             res.render("story", {data});
         })
         .catch(error => console.log(error));
 };

 const admin = (req, res) =>{
    res.render("admin/index");
};

const admin_story = (req, res) => {
    const q = "SELECT * FROM story";
    pool.query(q).then(([stories]) => {
        res.render("admin/story/list", {stories});
    });
};

const admin_story_create = (req, res) =>{
    const q = "SELECT * FROM category";
    pool.query(q).then(([categories]) =>{
        res.render("admin/story/create" ,{ categories});
    });
}

const authentification = (req, res) => {
    const q = "SELECT * FROM user";

    pool.query(q).then(([users]) => {

    res.render("authentification", {users})

})
};

const error = (req, res) => {
    res.render("error");
};


export {home, story, admin, admin_story, admin_story_create, authentification, error};