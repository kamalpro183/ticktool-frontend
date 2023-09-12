import { useState } from "react"
import AuthUser from './AuthUser';
import axios from 'axios';
import Footer from "../layout/Footer";

export default function Login() {
    const {setToken} = AuthUser();
    // const [username,setEmail] = useState();
    const [cred,setCred] = useState({
        username: "",
        password: ""
    });

    const submitForm = () =>{
        // api call
        axios.post("http://localhost:8081/login", cred).then((res) => {
            console.log(res.data.token);
            setToken(res.data.token);
        })
    }
    const onInputChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
      };

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="username"
                            onChange={(e) => onInputChange(e)}
                        id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password"
                            onChange={(e) => onInputChange(e)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}