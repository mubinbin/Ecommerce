import React, {useContext} from "react";
// import { navigate } from "@reach/router";
// import axios from "axios";
import {Button} from "@material-ui/core";
import AuthContext from "../AuthContext";

const Logout = props => {
    const context = useContext(AuthContext);
    const onClickHandler = e =>{
        context.logout();
    };

    return(
        <>
        <Button variant="contained" color="secondary" onClick={onClickHandler}>Log out</Button>
        </>
    );
};

export default Logout;