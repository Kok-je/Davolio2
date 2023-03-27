import mongoose from "mongoose";

// Schema function takes in an object
const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true },
})

// create a model of that schema
const PostSchema = mongoose.model('Post', Post);

export default PostSchema
