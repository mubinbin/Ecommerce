import React, {useState, useContext} from "react";
import AuthContext from "../AuthContext";

const Login = props => {
    const context = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        email: "",
        password:""

    });
    

    const onChangeHandler = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        context.login(inputs);
    };

    return(
        <>
        <form style={{textAlign: "center"}} className="form-group" onSubmit={onSubmitHandler}>
            <div className="form-group col-8">
                <label htmlFor="email">Email: </label>
                <input type="text" className="form-control" name="email" onChange={onChangeHandler}/>
            </div>
            <div className="form-group col-8">
                <label htmlFor="password">Password: </label>
                <input type="text" className="form-control" name="password" onChange={onChangeHandler}/>
            </div>
            <div className="form-group col-8">
                {context.err.emailLogin && <small className="text-danger">{context.err.emailLogin.message}</small>}
            </div>
            <div className="form-group col-8">
                <input className="btn btn-sm btn-primary" type="submit" value="Log in"/>
            </div>
        </form>
        </>
    );
};

export default Login;
