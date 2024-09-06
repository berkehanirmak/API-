const PostSchema = require("../models/post.js");

const createPosts = async (req, res) => {
  try { 
    const newPost = await PostSchema.create(req.body);

    res.status(201).json({ newPost });
  } catch (error) {
    return res.status(400).json({ msg: error.message });    
  }
};

const getPosts = async (req, res) => {
  try { 
    const getPosts = await PostSchema.find();
    res.status(200).json({ getPosts });
  } catch (error) {
    return res.status(400).json({ msg: error.message });    
  }
}
const getDetail = async (req, res) => {
  try { 
    const {id}  = req.params
    const detailPost = await PostSchema.findById(id);
    res.status(200).json({ detailPost });
  } catch (error) {
    return res.status(400).json({ msg: error.message });    
  }
}
const updatePost = async (req, res) => {
  try { 
    const {id}  = req.params
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({ updatePost });
  } catch (error) {
    return res.status(400).json({ msg: error.message });    
  }
}
const getUpdate = async (req, res) => {
  try { 
    const {id}  = req.params
    const getUpdate = await PostSchema.findById(id);
    res.status(200).json({ getUpdate });
  } catch (error) {
    return res.status(400).json({ msg: error.message });    
  }
}
const deletePost = async (req, res) => {
  try { 
    const {id}  = req.params
    await PostSchema.findByIdAndDelete(id);
    res.status(200).json({ msg: "Post silindi" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });

  } 
}

const searchPost=async(req,res)=>{
  try{
    const {search,tag} = req.query
    const title = new RegExp(search, "i")

    const posts = await PostSchema.find({$or:[{title}],tag:{ $in: tag.split(",")}})


    res.status(200).json({posts})
  }catch(error){
    return res.status(400).json({ msg: error.message });
  }
}

module.exports = {createPosts, getPosts, getDetail, updatePost, deletePost, getUpdate,searchPost}