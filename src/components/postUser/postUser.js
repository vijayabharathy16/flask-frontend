import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import Swal from "sweetalert2";

import "./postUser.css";
import {  NavLink, useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


const PostUser = () => {
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact:""
  });

  // const[errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "User added in successfully"
    });

       try {
        const response = await fetch("http://212.38.94.29:5000/add",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData)
        })
        console.log(response);

        const data = await response.json(response);
        console.log(data);
        navigate("/");
       } catch (error) {
          console.log(error);
       }
  };
  return (
    <>
     
      <div className="center-form col-sm-12">
      <NavLink to={"/"}>  <button className="btn btn-outline-secondary shadow"><ArrowCircleLeftIcon /> Back</button></NavLink>

        <Form onSubmit={handleSubmit} className="shadow body-tertiary rounded mt-2">
        <h3 className="text-center">Add Employee</h3>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicContact">
            <Form.Label>Contact</Form.Label>
            <input
              type="number"
              name="contact"
              className="form-control"
              placeholder="Enter your contact no"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button varient="success" type="submit" className="btn w-100">
            Submit
          </Button>{" "}
         
          
        </Form>
      </div>
    
    </>
  );
};

export default PostUser;

