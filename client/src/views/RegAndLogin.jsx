import React from "react";
import RegForm from "../components/RegLoginLogout/RegForm";
import Login from "../components/RegLoginLogout/Login";

const RegAndLogin = props => {
    
    


    return(
        <div className="row">
            <div className="col-5">
                <RegForm/>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
                <Login/>
            </div>
        </div>
        
    );
};

export default RegAndLogin;