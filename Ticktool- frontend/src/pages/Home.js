import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import AuthUser from './AuthUser';



export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  const { token } = AuthUser();

  useEffect(() => {
    loadUsers();
  }, []);

 
  const tok = "Bearer  "+token
//  console.log(headers);
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/incident/tickets",{
      headers: {
        'Authorization': tok
      }
    });
  //  const result= await fetch('http://localhost:8081/incident/tickets',{
  //     method: "GET",
  //     headers:{
  //       'Authorization':tok

  //     }

  //   })

    // console.log(result.data);
  
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8081/incident/ticket/delete/${id}`,{
      headers: {
        'Authorization': tok
      }
    });
    loadUsers();
  };

  return (
    <div className="container" style={{maxWidth: 'fit-content',padding:'inherit'}}>
      <Navbar />
      <div className="py-4 my-4" >
        <table className="table border shadow table-striped table-bordered table-hover">
          <thead>
            <tr className="table-primary"> 
              <th scope="col">Ticket Id</th>
              <th scope="col"><nobr>Creation Date</nobr></th>
              <th scope="col"><nobr>Updated On</nobr></th>
              <th scope="col"><nobr>Applicaion Name</nobr></th>
              <th scope="col">Assigned To</th>
              <th scope="col">Priority</th>
              <th scope="col">Status</th>
              <th scope="col">Remarks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={user.id}>
                  {user.id}
                </th>
                <td>{user.creationDate}</td>
                <td><nobr>{user.updationDate}</nobr></td>
                <td>{user.applicatioName}</td>
                <td>{user.assignedTo}</td>
                <td>{user.priority}</td>
                <td>{user.status}</td>
                <td>{user.remarks}</td>
                <td>
                
                <button
                    className="btn btn-primary btn-sm"
                    to={`/edituser/${user.id}`}
                  >

                    Update
                    </button>
                  <button
                    className="btn btn-danger btn-sm my-2"
                    onClick={() => deleteUser(user.id)}
                  >

                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
      </div>
  );
}
