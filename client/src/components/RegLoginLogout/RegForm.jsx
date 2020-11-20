import React, {useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router"

const RegForm = props => {
    const initialState = {
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    };
    
    const [user, setUser] = useState(initialState);
    const [err, setErr] = useState({});

    const onChangeHandler = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onSumitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", user, { withCredentials: true })
        .then(res => {
            console.log(res.data)
            if(res.data.errors){
                setErr(res.data.errors);
            }else{
                console.log("register successfully");
                localStorage.setItem("loggedin", res.data._id);
                navigate("/");
            }
        })
        .catch(err=>console.log("Error: " + err));
    };


    return(
        <>
        <form style={{textAlign: "center"}} onSubmit={onSumitHandler}>
            <div className="form-group col-8">
                <label htmlFor="username">Username: </label>
                <input type="text" className="form-control" name="username" value={user.username} onChange={onChangeHandler}/>
                {err.username && <small className="text-danger">{err.username.message}</small>}
            </div>
            <div className="form-group col-8">
                <label htmlFor="email">Email: </label>
                <input type="text" className="form-control" name="email" value={user.email} onChange={onChangeHandler}/>
                {err.email && <small className="text-danger">{err.email.message}</small>}
            </div>
            <div className="form-group col-8">
                <label htmlFor="password">Password: </label>
                <input type="text" className="form-control" name="password" value={user.password} onChange={onChangeHandler}/>
                {err.password && <small className="text-danger">{err.password.message}</small>}
            </div>
            <div className="form-group col-8">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="text" className="form-control" name="confirmPassword" value={user.confirmPassword} onChange={onChangeHandler}/>
                {err.confirmPassword && <small className="text-danger">{err.confirmPassword.message}</small>}
            </div>
            <div className="form-group col-8">
                <input className="btn btn-sm btn-primary" type="submit" value="Register"/>
            </div>
        </form>
        </>
    );
};

export default RegForm;