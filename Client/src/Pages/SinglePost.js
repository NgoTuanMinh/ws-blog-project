import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBContainer, MDBCardText, MDBIcon, MDBBtn, MDBInput } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../Redux/Features/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

export default function SinglePost() {
    const dispatch = useDispatch();
    const {post} = useSelector((state)=>({...state.post}));
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        dispatch(getPost(id));
    },[dispatch, id])


  return (
    <MDBContainer>
        <MDBCard className='mb-3' style={{marginTop: 60}}>
            <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon fas icon="backward" style={{ float: "left" }} size="16" />
            </MDBBtn>
                <h3>{post?.title}</h3>
                <span>
                    <p className='text-start postName'>Created By: {post.name}</p>
                </span>
                <br />
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon
                        style={{float: "left", margin: "5px" , marginTop: "13px" , marginRight: "10px"}}
                        far
                        icon='calendar-alt'
                        size='lg'
                    />
                    <small className='text-muted'>
                        {moment(post.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {post.content}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>

        <MDBCard>
            <MDBInput />
        </MDBCard>
    </MDBContainer>
  )
}
