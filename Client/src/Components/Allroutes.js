import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import AddEditPost from '../Pages/addEditPost.js'
import SinglePost from '../Pages/SinglePost'
import Privateroute from './Privateroute'
import NotFoundPage from '../Pages/NotFoundPage'
import Dashboard from '../Pages/Dashboard'
function Allroutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/posts/search" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path ="/addPost" element={<Privateroute><AddEditPost/></Privateroute>}/>
            <Route path ="/editPost/:id" element={<Privateroute><AddEditPost/></Privateroute>}/>
            <Route path ="/dashboard" element={<Privateroute><Dashboard/></Privateroute>}/>
            <Route path ="/post/:id" element={<SinglePost/>}/>
            <Route path= "*" element= {<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Allroutes