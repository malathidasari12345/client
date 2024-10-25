import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Form, Button } from "react-bootstrap";

const UpdateUser = () => {
  const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://crud-operations-nj3v.onrender.com/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
         toast.error("Failed to fetch user data");
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://crud-operations-nj3v.onrender.com/api/update/user/${id}`, user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update user data");
      });
  };

  return (
    <Container className="addUser mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        <i className="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Update User</h3>
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={user.firstName}
            placeholder="Enter First Name"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={user.lastName}
            placeholder="Enter Last Name"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter Email"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={user.phone}
            placeholder="Enter Phone Number"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={user.address}
            placeholder="Enter Address"
            onChange={inputHandler}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Select name="gender" value={user.gender} onChange={inputHandler} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
