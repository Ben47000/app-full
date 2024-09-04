import express from "express";

import { admin_index , admin_story, admin_story_create } from "../controller/admin/view.js";
import { create_story } from "../controller/admin/post.js";

const router = express.Router();


router.get("/", admin_index);

router.get("/story", admin_story );

router.get("/story/create", admin_story_create );



//POST Create story
router.post("/story/create", create_story);

export default router;