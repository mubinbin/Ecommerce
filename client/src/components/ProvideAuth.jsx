import React, {useState} from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import {navigate} from "@reach/router";

const ProvideAuth = props => {

    const [err, setErr] = useState({});

    const login= inputs => {
        axios.post("http://localhost:8000/api/login", inputs, { withCredentials: true })
        .then(res => {
            if(res.data.errors){
                setErr(res.data.errors);
            }else{
                console.log("Logged in succefully")
                localStorage.setItem("loggedin", res.data._id);
                navigate("/products");
            }
        })
        .catch(err=>console.log("Error: " + err));
    };

    const logout = e => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
        .then(res=>{
            localStorage.clear()
            navigate("/");
        })
        .catch(err=>console.log("Error: " + err));
    };

    return(
        <AuthContext.Provider value={{err, login, logout}} >
            {props.children}
        </AuthContext.Provider>
    );
};

export default ProvideAuth;