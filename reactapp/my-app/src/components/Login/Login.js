import React from "react";
import axios from 'axios'

import './Login.css'

export default class Login extends React.Component{

    constructor()
    {
        super()
        this.state = {
            email: "tawomusash@gmail.com",
            password: "tawona123",
        }
    }

    emailChanged =(email)=>
    {
        this.setState({email});
    }

    passwordChanged =(password)=>
    {
        this.setState({password});
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {token,id,email} = await this.loginUser();

        this.props.setToken({token});
        this.props.setUserData({id,email});
        console.log("token is: " + token);
    }

    loginUser = async () =>
    {
        const response = await axios.post('http://localhost:3000/api/v1/sessions',
        {
            email: this.state.email,
            password: this.state.password
        });

        const {id,email} = (await response).data;
        const token = (await response).data.authentication_token;
        
        return {
            token,
            id,
            email
        }
    }

    render()
    {
        return (
            <div className = "login-wrapper">
                <h1> Login to your account </h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        <p>Email</p>
                        <input 
                            type="text" 
                            onChange = {e=>this.emailChanged(e.target.value)}
                            placeholder = {"Enter email"}
                            value = {this.state.email}
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            type="password"
                            onChange = {e=>this.passwordChanged(e.target.value)} 
                            placeholder = {"Enter password"}
                            value = {this.state.password}
                        />
                    </label>
                    <div>
                        <button 
                            type="submit"
                        >Submit</button>
                    </div>
                </form>
            </div>
           
        )
    }
   
}