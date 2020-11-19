import React from "react";
import moment from "moment";
import Rating from "../Rating/Rating";


const CommentHolder = props =>{

    const createdTime = new Date(props.comment.createdAt).toLocaleString("en-US", {dateStyle: "short",timeStyle: "short"});

    return(
        <div className="commentHolder">
            <div className="commentHeader">
                <h3>{props.comment._creator.username}</h3>
                {
                    props.comment.rating !==0 &&
                    <Rating product={props.comment}/>
                }
            </div>
            <span> {moment(props.comment.createdAt).fromNow()}</span>
            <span>{createdTime} </span>
            <p>{props.comment.content}</p>
            <div className="commentFooter">
                <div className="footer-1">
                    <small>reply</small>
                </div>
                <div className="footer-2">
                    <small>delete</small>
                </div>
            </div>
        </div>
    );
};

export default CommentHolder;