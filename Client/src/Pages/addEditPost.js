import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBSpinner, MDBTextArea, MDBValidation, MDBValidationItem } from "mdb-react-ui-kit"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import { createPost, updatePost } from '../Redux/Features/postSlice'

let initialState = {
    title: "",
    content: "",
}

export default function AddEditPost() {
    const [postData, setPostData] = useState(initialState);
    let { title, content } = postData;
    const {user} = useSelector((state)=>({...state.auth}))
    const {error,loading,posts} = useSelector((state)=>({...state.post}))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        error && toast.error(error);
    }, [error])

    useEffect(() => {
        if(id) {
            const singlePost = posts.find((item)=> item._id===id);
            setPostData({...singlePost});
        }
    },[id, posts])

    const handleInputChange= (e) => {
        const {name,value} = e.target;
        setPostData({...postData,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && content) {
            const updatedPostData = {...postData,name: user.result.name}
            if(id) {
                dispatch(updatePost({updatedPostData,id,toast,navigate}))
            }else {
                dispatch(createPost({updatedPostData,navigate,toast}))
            }
        }
    }

    const handleClear = () => {
        setPostData({title:"", content:""})
    }

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment='center'>
                <h5>{id ? "Update Post" : "Add Post"}</h5>
                <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className='col-md-12'>
                    <MDBValidationItem feedback='Please provide a title' invalid>
                        <MDBInput
                            label='Enter Title'
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            className='form-control'
                            required
                        />
                    </MDBValidationItem>
                    </div>
                    <div className='col-md-12'>    
                        <MDBValidationItem feedback='Please provide the content' invalid>
                            <MDBTextArea
                                label='Enter Content'
                                type="text"
                                name="content"
                                value={content}
                                onChange={handleInputChange}
                                className='form-control'
                                required
                                rows={4}
                            />
                        </MDBValidationItem>
                    </div>
                    <div className='col-md-12'>
                        <MDBBtn style={{width:"100%"}}>
                                {
                                    loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role="status"
                                            tag="span"
                                            className="me-2"
                                        />
                                    )
                                }{id ? "Update" : "Submit"}</MDBBtn>
                        <MDBBtn style={{width:"100%",marginTop:"10px"}} color='danger' onClick={handleClear}>Cancel</MDBBtn>
                    </div>
                </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
