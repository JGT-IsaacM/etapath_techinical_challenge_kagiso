import React, {useEffect} from "react";
import { Redirect } from 'react-router-dom';

import axios from 'axios'

import './Logout.css'

export default function Logout ({token, destroyToken}){
    useEffect(()=>{
        logoutUser();
        destroyToken();
    },[]);

    const logoutUser = async () =>{
        try {
        await axios.delete('http://localhost:3000/api/v1/sessions',{
            headers: {
                'Authorization': `${token}`
            }
        });
        } catch (error) {
            alert('Failed to log user out! Please try again.');
            console.log(error.message);
        }
    }

    return (<Redirect to="/" />)
}