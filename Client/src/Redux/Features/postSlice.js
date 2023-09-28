import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const createPost = createAsyncThunk("post/create", async({updatedPostData,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createPost(updatedPostData);
        toast.success("Created successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const getPosts = createAsyncThunk("post/get", async({page = 1, isOwner},{rejectWithValue})=>{
    try {
        const response = isOwner ? await api.getPostsDashboad(page) : await api.getPosts(page);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getPost = createAsyncThunk("post/getSinglePost", async(id,{rejectWithValue})=>{
    try {
        const response = await api.getPost(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deletePost = createAsyncThunk("post/deletePost", async({id,toast},{rejectWithValue})=>{
    try {
        const response = await api.deletePost(id);
        toast.success("Post deleted successfully");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updatePost = createAsyncThunk("post/updatePost", async({id,updatedPostData,toast,navigate},{rejectWithValue})=>{
    try {
        const response = await api.updatePost(updatedPostData,id);
        toast.success("Post updated successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getPostsBySearch = createAsyncThunk("post/getPostsBySearch", async(searchQuery,{rejectWithValue})=>{
    try {
        const response = await api.getPostsBySearch(searchQuery);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        posts: [],
        currentPage: 1,
        noOfPages: 1,
        error: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state,action) =>{
            state.currentPage = action.payload;
        }
    },
    extraReducers: {
        [createPost.pending] : (state,action)=> {
            state.loading = true;
        },
        [createPost.fulfilled] : (state,action)=> {
            state.loading = false;
            // state.posts = action.payload;
        },
        [createPost.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getPosts.pending] : (state,action)=> {
            state.loading = true;
        },
        [getPosts.fulfilled] : (state,action)=> {
            state.loading = false;
            state.posts = action.payload.data;
            state.noOfPages = action.payload.noOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getPosts.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getPost.pending] : (state,action)=> {
            state.loading = true;
        },
        [getPost.fulfilled] : (state,action)=> {
            state.loading = false;
            state.post = action.payload;
        },
        [getPost.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updatePost.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.posts = state.posts.filter((item)=> item._id === id ? action.payload : item);
                state.currentPage = 1;
            }
        },
        [updatePost.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [updatePost.pending] : (state,action)=> {
            state.loading = true;
        },
        [deletePost.pending] : (state,action)=> {
            state.loading = true;
        },
        [deletePost.fulfilled] : (state,action)=> {
            state.loading = false;
            const {arg: {id}} = action.meta;
            if(id) {
                state.posts = state.posts.filter((item)=> item._id !== id);
            }
        },
        [deletePost.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
        [getPostsBySearch.pending] : (state,action)=> {
            state.loading = true;
        },
        [getPostsBySearch.fulfilled] : (state,action)=> {
            state.loading = false;
            state.currentPage = 1;
            state.posts = action.payload.data;
            state.noOfPages = action.payload.noOfPages;
        },
        [getPostsBySearch.rejected] : (state,action)=> {
            state.loading = false;
            state.error = action.payload.error;
        },
    }
})

export const {setCurrentPage} = postSlice.actions;
export default postSlice.reducer;