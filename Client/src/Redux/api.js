import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:3030"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

export const signIn = (FormData) => API.post("/users/signin",FormData);
export const signUp = (FormData) => API.post("/users/signup",FormData);

export const createPost = (FormData) => API.post("/post",FormData);
export const getPosts = (page) => API.get(`/post?page=${page}`);
export const getPostsDashboad = (page) => API.get(`/post/dashboard?page=${page}`);
export const getPost = (id) => API.get(`/post/${id}`);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const updatePost = (updatedData,id)  => API.patch(`/post/${id}`,updatedData);
export const getPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery}`);
