import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import "./updateUser.css";
const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact:""
  });

  useEffect(() => {
    const fetchUser = async () => {
        try {
           const response = await fetch(`http://212.38.94.29:5000/oneuser/${id}`);
           const data = await response.json();
           console.log(data);
           setFormData(data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
},[id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       try {
        const response = await fetch(`http://212.38.94.29:5000/editUser/${id}`,{
            method: "PUT",
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
 
      <div className="center-form ">
      <NavLink to={"/"}>  <button className="btn btn-outline-secondary shadow"><ArrowCircleLeftIcon /> Back</button></NavLink>

        <Form onSubmit={handleSubmit} className="shadow body-tertiary rounded mt-2">
        <h3 className="text-center">Update Employee</h3>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicContact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="number"
              name="contact"
              placeholder="Enter your contact no"
              value={formData.contact}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
         
          <Button varient="success" type="submit" className="btn-success w-100">
            Update 
          </Button>{" "}      
          
        </Form>
      </div>{" "}
      
    </>
  );
};

export default UpdateUser;

