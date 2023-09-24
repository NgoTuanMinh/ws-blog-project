import express from "express";
import { getPost, createPost, getPosts, updatePost, deletePost, getPostBySearch } from "../Controllers/postHandler.js";
import { auth } from "../Middlewares/auth.js";

const postRouter = express.Router();

postRouter.post('/',auth, createPost);
postRouter.get('/', getPosts);
postRouter.get('/search',getPostBySearch);
postRouter.get('/:id', getPost);
postRouter.delete('/:id',auth, deletePost);
postRouter.patch('/:id', auth, updatePost);

export default postRouter;