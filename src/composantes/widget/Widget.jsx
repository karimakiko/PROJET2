import React, { useState, useEffect } from 'react';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import axios from 'axios';

import "./widget.scss";

const Widget = ({ type }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchData();
  }, [type]); // Add 'type' to the dependency array

  const fetchData = async () => {
    try {
      let response;
      if (type === "Utilisateur") {
        response = await axios.get('http://localhost:8082/api/info/count');
      } else if (type === "Demandes d'absence") {
        response = await axios.get('http://localhost:8082/ressourcehumaine/demandeabsence/count');
      }
      setCounter(response.data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors gracefully, e.g., set counter to 0 or display an error message
    }
  };

  const data = {
    title: type === "Utilisateur" ? "Utilisateurs" : "Demandes d'absence",
   
    icon: type === "Utilisateur" ? (
      <PersonOutlinedIcon
        className="icon"
        style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        }}
      />
    ) : (
      <ForwardToInboxIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  };

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
