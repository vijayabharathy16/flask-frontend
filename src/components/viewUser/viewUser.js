import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {  NavLink,useParams} from 'react-router-dom';
import "./viewUser.css";

const Details = () => {

    const [users, setUserdata] = useState([]);
    console.log(users);

    const { id } = useParams("");
    console.log(id);

    // const navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`http://212.38.94.29:5000/oneuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

  

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome to users</h1>

            <Card sx={{ maxWidth: 600 }}  className='shadow bg-body-tertiary rounded p-2 border'>
                <CardContent>
                    <div className="add_btn">
                    <NavLink to={"/"}>  <button className="btns mx-2"><ArrowCircleLeftIcon /> Back</button></NavLink>
                       
                    </div>
                    <div className="row mt-4">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h4 className="mt-3 text-dark">Name: <span >{users.name}</span></h4>
                            {/* <h3 className="mt-3">Age: <span >{users.age}</span></h3> */}
                            <p className="mt-3 fw-semibold text-dark"><MailOutlineIcon />Email: <span className='fw-semibold'>{users.email}</span></p>
                            {/* <p className="mt-3"><WorkIcon />Occuption: <span>{users.work}</span></p> */}
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-4 fw-semibold text-dark"><LocationOnIcon />location: <span className='fw-semibold'>{users.address}</span></p>
                            <p className="mt-5 fw-semibold text-dark"><PhoneAndroidIcon />mobile: <span className='fw-semibold'>+91 {users.contact}</span></p>
                            
                            {/* <p className="mt-3">Description: <span>{getuserdata.desc}</span></p> */}
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
