import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardText } from "mdb-react-ui-kit"
import React from 'react'
import { Link } from "react-router-dom"

export default function CardPost({ content, title, _id, name }) {
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + "...";
        }
        return str;
    }

    return (
        <MDBCardGroup>
            <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: "20rem" }}>
                
                <div className='top-left'>{name}</div>
                <MDBCardBody>
                    <MDBCardText className='text-start'>{title}</MDBCardText>
                    <MDBCardText className='text-start'>
                        {excerpt(content)}
                        <Link style={{marginLeft: 20}} className="ml-2" to={`post/${_id}`}>Read More</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}
