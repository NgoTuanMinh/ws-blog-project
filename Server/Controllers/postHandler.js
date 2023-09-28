import mongoose from 'mongoose';
import postModel from '../Models/post.model.js';

export const createPost = async(req, res) => {
    const post = req.body;
    const newPost = postModel({...post, creator: req.userId});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const getPosts = async(req, res) => {
    try {
        const {page, limit = 10} = req.query;
        const total = await postModel.countDocuments({});
        const skip = (Number(page)-1 ) * limit;
        const posts = await postModel.find().limit(limit).skip(skip);
        res.json({
            data: posts,
            currentPage: Number(page),
            totalPosts: total,
            noOfPages: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getPostsDashboad = async(req, res) => {
    try {
        const {page, limit = 10} = req.query;
        const total = await postModel.countDocuments({});
        const skip = (Number(page)-1 ) * limit;
        const posts = await postModel.find({creator: req.userId}).limit(limit).skip(skip);
        res.json({
            data: posts,
            currentPage: Number(page),
            totalPosts: total,
            noOfPages: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getPost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await postModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const deletePost = async(req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "Not exist"});
        }
        await postModel.findByIdAndRemove(id);
        return res.status(200).json({message: "Post has been deleted"});   
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});  
    }
}

export const updatePost = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, content, creator} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: "Not exist"});
        }
        const updatedData = {title, content, creator, _id: id}

        const post = await postModel.findById(id);

        if (post.creator !== req.userId) return res.status(500).json({message: "Not permission"});

        if (title !== undefined || title !== null) {
            post.title = title
        }
        if (content !== undefined || content !== null) {
            post.content = content
        }
        await post.save();

        return res.status(200).json(updatedData);   
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});  
    }
}

export const getPostBySearch = async(req,res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery,"i");
        const posts = await postModel.find({title})
        const total = posts.length;
        const limit = 6;
        return res.status(200).json({data:posts,
            noOfPages: Math.ceil(total / limit)
        });
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}
