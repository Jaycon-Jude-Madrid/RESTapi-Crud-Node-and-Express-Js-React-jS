import React, { useState, useEffect } from "react";
import "./AddEdit.css";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide a value");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          onChange={handleInputChange}
          value={name}
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInputChange}
          value={email}
          type="email"
          id="name"
          name="email"
          placeholder="Enter email"
        />
        <label htmlFor="contact">Contact</label>
        <input
          onChange={handleInputChange}
          value={contact}
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Contact Number"
        />

        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
