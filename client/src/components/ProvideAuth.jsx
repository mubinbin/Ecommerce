import React, {useState} from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import {navigate} from "@reach/router";

const ProvideAuth = props => {

    const [loggedin, setLoggedin] = useState(false);
    const [err, setErr] = useState({});

    const login= inputs => {
        axios.post("http://localhost:8000/api/login", inputs, { withCredentials: true })
        .then(res => {
            // console.log(res.data);
            if(res.data.errors){
                setErr(res.data.errors);
            }else{
                console.log("Logged in succefully")
                setLoggedin(true);
                navigate("/products");
            }
        })
        .catch(err=>console.log("Error: " + err));
    };

    const logout = e => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
        .then(res=>{
            setLoggedin(false);
            navigate("/");
        })
        .catch(err=>console.log("Error: " + err));
    };

    return(
        <AuthContext.Provider value={{err, loggedin, setLoggedin, login, logout}} >
            {props.children}
        </AuthContext.Provider>
    );
};

export default ProvideAuth;