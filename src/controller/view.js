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

 

const authentification = (req, res) => {
    res.render("authentification")
};

const subscribe = (req, res) => {
    res.render("subscribe");
}

const error = (req, res) => {
    res.render("error");
};


export {home, story, authentification, error, subscribe};