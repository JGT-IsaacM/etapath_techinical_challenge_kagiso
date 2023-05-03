import React from "react";
import axios from 'axios'

import './Login.css';
import {sanitizeCheck} from '../../utility';
import CredentialsForm from "./CredentialsForm/CredentialsForm";

export default class Login extends React.Component{

    constructor()
    {
        super()
        this.state = {
            email: "tawomusash@gmail.com",
            password: "tawona123",
            login: false,
            createUser: false
        }
    }

    handleLoginSubmit = async e => {
        e.preventDefault();
        const {token,id,email} = await this.loginUser();
        this.props.setToken({token});
        this.props.setUserData({id,email});
    }

    handleCreateSubmit = async e => {
        e.preventDefault();
        const {token,id,email} = await this.createUser();
        this.props.setToken({token});
        this.props.setUserData({id,email});
    }

    loginUser = async () => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/sessions',
            {
                email: sanitizeCheck(this.state.email),
                password: sanitizeCheck(this.state.password)
            });

            const {id,email} = (await response).data;
            const token = (await response).data.authentication_token;
            return {
                token,
                id,
                email
            }
        }
        catch(error){
            alert('Failed to log user in! Please try again.');
            console.log(error.message);
        }
        return {}
    }

    createUser = async () => {
        try{
            const response = await axios.post('http://localhost:3000/api/v1/profile',
            {
                email: sanitizeCheck(this.state.email),
                password: sanitizeCheck(this.state.password)
            });

            const {id,email} = (await response).data;
            const token = (await response).data.authentication_token;
            
            return {
                token,
                id,
                email
            }
        }
        catch(error){
            alert('User create failed! Please try agin later.');
            console.log(error.message);
        }
        return {}
    }

    render()
    {
        if(this.state.login){
            return <CredentialsForm
                heading="Log into your account"
                buttonLabel="Login"
                callbackFunction={this.handleLoginSubmit}
                defaultValues={this.state}
            />
        }
        else if(this.state.createUser){
            return <CredentialsForm
                heading="Create new user"
                buttonLabel="Create"
                callbackFunction={this.handleCreateSubmit}
                defaultValues={this.state}
            />
        }
        else{
            return(
                <div className = "signin-options">
                    <h2> Hi, there... </h2>
                    <h1> welcome back!</h1>
                    <p>Please click on add user if you are a first time user</p>
                    <div>
                        <button type="button" onClick={()=>this.setState({...this.state, createUser:true})}>Add user</button>
                        <button type="button" onClick={()=>this.setState({...this.state, login:true})}>Login</button>
                    </div>
                </div>
            )
        }
    }
   
}