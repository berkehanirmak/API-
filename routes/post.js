const express = require("express");
const router= express.Router();
const auth = require("../middleware/auth.js");
const {getPosts,createPosts,getDetail,updatePost,deletePost,getUpdate,searchPost} = require("../controllers/post.js")

router.get("/getPosts",getPosts)
router.post("/createPost",auth,createPosts)
router.get("/getDetail/:id",getDetail)
router.patch("/updatePost/:id",auth,updatePost)
router.get("/getUpdate/:id",getUpdate)
router.delete("/deletePost/:id",auth,deletePost)
router.get("/searchPost",searchPost)

module.exports = router


