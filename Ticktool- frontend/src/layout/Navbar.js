import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "./lo.png";
import "./Navbar.css"
import AuthUser from '../pages/AuthUser';

export default function Navbar() {
const { token,logout } = AuthUser();
const tok = "Bearer  "+token;
const handleDownload = () => {

  axios.get("http://localhost:8081/incident/tickets",{
      headers: {
        'Authorization': tok
      },
      responseType: 'blob'
    }).then(response => {
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'handover.xlsx');
    document.body.appendChild(link);
    link.click();
  });
};





  return (
    <div className>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top Navbar bd-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand rounded border px-2 " to="/">
          <img src={img} width="35" height="35" class="d-inline-block align-top me-2" alt="" />
            TickTool-- Designed By Kamal Mishra
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


         
          <form class="form-inline">
    <button class="btn btn-outline-light me-2" type="button" onClick={() => handleDownload()}>Generate Handover</button>
    <Link className="btn btn-outline-light me-2" to="/adduser">
            Add Ticket
          </Link>
          <Link className="btn btn-outline-light me-2" to="/home">
            Ticket Basket
          </Link>
          <button class="btn btn-outline-light me-2" type="button" onClick={logout}>Logout</button>
          
  
  </form>
        </div>
      </nav>
    </div>
  );
}
