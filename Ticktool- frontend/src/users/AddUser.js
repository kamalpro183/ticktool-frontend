import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "./18.png";
import AuthUser from "../pages/AuthUser"


export default function AddUser() {
  let navigate = useNavigate();
const { token} = AuthUser();
const tok = "Bearer  "+token;
  

  const [user, setUser] = useState({
    id: "",
    remarks: "",
    applicationName: "",
    priority: "",
    assignedTo: "",
    status: "",
  });

  const { id, remarks, applicationName, priority, assignedTo, status } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/incident/save", user,{
      headers: {
        'Authorization': tok
      }});
    navigate("/home");
  };

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 rounded border pt-5 mt-7 my-4 shadow" style={{ backgroundImage: `url(${background})` }}>
          <h2 className="text-center m-4">Insert Ticket</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3 fw-bolder">
              <label htmlFor="Ticket-Id" className="form-label">
                Ticket Id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ticket Id"
                name="id"
                value={id}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3 fw-bolder">
              <label htmlFor="Remarks" className="form-label">
                Remarks
              </label>
              <textarea
                type={"text"}
                className="form-control"
                placeholder="Remarks"
                name="remarks"
                value={remarks}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3 fw-bolder">
              <label htmlFor="Application-Name" className="form-label">
                Application Name
              </label>

              <select
              className="form-control"
              type={"text"}
              value={applicationName}
               name="applicationName"
               onChange={(e) => onInputChange(e)}
              >
                <option></option>
              <option>IPM</option>
              <option>Zenon</option>
              <option>iSI</option>
              </select>

              {/* <input
                type={"text"}
                className="form-control"
                placeholder="Application Name"
                name="applicationName"
                value={applicationName}
                onChange={(e) => onInputChange(e)}
              /> */}
            </div>
            <div className="mb-3 fw-bolder">
              <label htmlFor="Priority" className="form-label">
                Priority
              </label>

              <select
              className="form-control"
              type={"text"}
              value={priority}
               name="priority"
               onChange={(e) => onInputChange(e)}
              >
                <option></option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              </select>

              {/* <input
                type={"text"}
                className="form-control"
                placeholder="Priority"
                name="priority"
                value={priority}
                onChange={(e) => onInputChange(e)}
              /> */}
            </div>
            <div className="mb-3 fw-bolder">
              <label htmlFor="AssignedTo" className="form-label">
              Assigned To
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Assigned To"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <div className="mb-3 fw-bolder">
              <label htmlFor="Status" className="form-label">
                Status
              </label>

              <select
              className="form-control"
              value={status}
               name="status"
               type={"text"}
               onChange={(e) => onInputChange(e)}
              >
                <option></option>
              <option>Working</option>
              <option>Resolved</option>
              <option>WOU</option>
              </select>
              
              {/* <input
                type={"text"}
                className="form-control"
                placeholder="Status"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              /> */}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link className="btn btn-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
