import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from "./Home";

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

 



    const [token,setToken] = useState(getToken());
    

    const saveToken = (token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        console.log(token)
        setToken(token);
        navigate('/Home');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const http = axios.create({
        baseURL:"http://localhost:8081",
        headers:{
            
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        getToken,
        http,
        logout
    }
}