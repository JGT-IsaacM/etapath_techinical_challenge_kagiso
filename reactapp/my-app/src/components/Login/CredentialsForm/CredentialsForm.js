import React, { useState } from "react";

export default function CredentialsForm ({
    heading = '', 
    buttonLabel = "submit", 
    callbackFunction, 
    defaultValues,
}){

    const [email, emailChanged] = useState(defaultValues.email);
    const [password, passwordChanged] = useState(defaultValues.password);

    return (
        <div className = "login-wrapper">
            <h1>{heading}</h1>
            <form onSubmit = {callbackFunction}>
                <label>
                    <p>Email</p>
                    <input 
                        type="text" 
                        onChange = {e=>emailChanged(e.target.value)}
                        placeholder = {"Enter email"}
                        value = {email}
                        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                        required
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input 
                        type="password"
                        onChange = {e=>passwordChanged(e.target.value)} 
                        placeholder = {"Enter password"}
                        value = {password}
                        minLength={5}
                        required
                    />
                </label>
                <div>
                    <button 
                        type="submit"
                    >{buttonLabel}</button>
                </div>
            </form>
        </div>
    );
}