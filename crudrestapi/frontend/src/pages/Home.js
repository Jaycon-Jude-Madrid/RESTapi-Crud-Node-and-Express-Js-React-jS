import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        toast.error(response.data);
        getUsers();
      }
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>

                  <td>
                    <div className="btn-parent">
                      <Link to={`/update/${item.id}`}>
                        <button type="submit" className="btn btn-edit">
                          {" "}
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteUser(item.id)}
                      >
                        {" "}
                        Delete
                      </button>
                      <Link to={`/view/${item.id}`}>
                        <button className="btn btn-view"> View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
