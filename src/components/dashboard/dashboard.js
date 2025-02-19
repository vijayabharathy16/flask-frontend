import { useEffect, useState } from "react";
import { Col, Table, Row, Container, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Swal from "sweetalert2";
const Dashboard = () =>{
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
           const response = await fetch("http://212.38.94.29:5000/allusers");
           const data = await response.json();
           console.log(data);
           setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {  
        fetchUsers();
    },[]);

    const handleUpdate = (userId) => {
       
       navigate(`/user/${userId}`);
       
    }
  
    const viewUser = (userId) => {
        navigate(`/view/${userId}`);
    }
    const handleDelete = async (userId) => {  
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
            title: "User Deleted in successfully"
          });
        try {
            const response = await fetch(`http://212.38.94.29:5000/deleteUser/${userId}`,{
                method:"DELETE"
                
            });
            console.log(response);
           
            if(response.ok){
                
                fetchUsers();
             
            }
            // const data = await response.json();
            // console.log(data);
            // setUsers(data);
         } catch (error) {
             console.log(error);
         }
    }

    return(
        <>
        <Container className="mt-5 shadow body-tertiary rounded">
            <Row>
                <Col>
                <h3 className="text-center">Employee List</h3>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr className="table-dark">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) =>(
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.contact}</td>
                                    <td>
                                        <Button variant="warning"
                                        onClick={() => viewUser(user.id)}>
                                        <i className="bi bi-eye"></i>
                                        </Button>{" "}
                                        <Button variant="primary"
                                        onClick={() => handleUpdate(user.id)}>
                                        <i className="bi bi-pencil-square"></i>
                                        </Button>{" "}
                                        <Button variant="danger"
                                        onClick={() => handleDelete(user.id)}>
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                    
                                </tr>
                            
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Dashboard;
