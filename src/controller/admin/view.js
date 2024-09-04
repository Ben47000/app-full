import pool from "../../config/db.js"

const admin_index = (req, res) =>{
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
        res.render("admin/story/create" ,{categories});
    });
};

export {admin_index , admin_story, admin_story_create};