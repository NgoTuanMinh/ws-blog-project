import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBBtn, MDBCardGroup, MDBRow, MDBCol, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPosts } from '../Redux/Features/postSlice';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import {toast} from "react-toastify"


export default function Dashboard() {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> ({...state.auth}));
    const {loading, posts} = useSelector((state)=>({...state.post}));
    
    useEffect(()=> {
        dispatch(getPosts({page: 1, isOwner: true}));
    },[dispatch])

    const excerpt = (str) => {
        if(str.length > 40) {
            str= str.substring(0, 40)+"...";
        }
        return str;
    }

    const deletHandler = (id) => {
        dispatch(deletePost({id,toast}));
    }

    if(loading) {
        return <Spinner/>
    }

  return (
    <div className='dashboard'>
        {
            posts.length > 0 && (
                <>
                    <h3 className='text-center'>Dashboard: {user?.result?.name}</h3>
                    <hr style={{maxWidth: "570px"}}/>
                </>
            )
        }
        {
            posts && posts.map((item)=>(
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{maxWidth: "600px"}} className="mt-2">
                        <MDBRow className='g-0'>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>
                                            {excerpt(item?.content)}
                                        </small>
                                    </MDBCardText>
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            float: 'right',
                                            marginTop: '-60px'
                                        }}
                                    >
                                        <MDBBtn className='mt-1' tag='a' color="none">
                                            <MDBIcon
                                                fas
                                                icon='trash'
                                                style={{color: '#dd4b39'}}
                                                size='lg'
                                                onClick= {()=>deletHandler(item._id)}
                                            />
                                        </MDBBtn>
                                        <Link to={`/editPost/${item._id}`}>
                                            <MDBIcon
                                                fas
                                                icon='edit'
                                                style={{color: '#55acee', marginLeft: '10px'}}
                                                size='lg'
                                            />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))
        }
    </div>
  )
}
