import axios from "axios";
import React, { useEffect, useState } from "react";
import "./View.css";
import { useParams, Link } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  useEffect(() => {
    const viewIdData = async () => {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        setSingleUser({ ...response.data[0] });
      }
    };
    viewIdData();
  }, [id]);

  return (
    <div className="View" style={{ marginTop: "100px" }}>
      <div className="View-header">
        {" "}
        <h1>View</h1>
      </div>

      <div className="View-container">
        <h6>ID : {singleUser && singleUser.id}</h6>
        <h5>Name : {singleUser && singleUser.name}</h5>
        <h5>Email : {singleUser && singleUser.email}</h5>
        <h5>Contact : {singleUser && singleUser.contact}</h5>
        <Link to="/">
          <button> Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
