import React, { useEffect } from 'react'
import {MDBCol,MDBRow,MDBContainer,MDBTypography} from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, setCurrentPage } from '../Redux/Features/postSlice';
import CardPost from '../Components/cardPost';
import Pagination from '../Components/Pagination';
import { useLocation } from 'react-router-dom';
import SkeletonLoadingRendering from '../Components/SkeletonLoading';

export default function Home() {
  const dispatch = useDispatch();
  const {posts,loading,currentPage,noOfPages} = useSelector((state)=> ({...state.post}));
  const location = useLocation();

  useEffect(()=>{
    dispatch(getPosts(currentPage));
  },[currentPage, dispatch])

  if(loading) {
    return <SkeletonLoadingRendering/>
  }
  return (
    <div style={{margin: "auto",padding: "15px", maxWidth: "1000px", alignContent: "center"}}>
      <MDBRow className='mt-5'>
        {
          posts.length === 0 && location.pathname === "/" && (
            <MDBTypography className='text-center mb-0' tag="h2">
              No Post Found
            </MDBTypography>
          )
        }
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-3'>
                {posts && posts.map((item)=> <CardPost key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {posts.length > 0 && (
        <Pagination
        setCurrentPage={setCurrentPage}
        numberOfPages={noOfPages}
        currentPage={currentPage}
        dispatch={dispatch}
      />
      )}
    </div>
  )
}
