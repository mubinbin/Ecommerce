import React, {useState, useEffect} from "react";
import moment from "moment";
import Rating from "../Rating/Rating";
import axios from "axios";
import "./CommentHolder.css"


const CommentHolder = props =>{

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/" + props.comment._creator)
        .then(res=>{
            setUser(res.data);
        })
        .catch(err=>console.log(err));
    }, [props.comment._creator]);

    const createdTime = new Date(props.comment.createdAt).toLocaleString("en-US", {dateStyle: "short",timeStyle: "short"});

    return(
        <div className="commentHolder">
            <div className="commentHeader">
                <div className="name-time">
                    <div>{user===null? <b>Deleted user</b>  : <b>{user.username}</b>}</div>
                    <div>
                        <small>{moment(props.comment.createdAt).fromNow()}, </small>
                        <small> {createdTime}</small>
                    </div>
                </div>
                <div>
                    {
                        props.comment.rating !==0 &&
                        (
                        <>
                        
                        <Rating product={props.comment}/>
                        </>
                        )
                    }
                </div>
            </div>
            <p>{props.comment.content}</p>
        </div>
    );
};

export default CommentHolder;