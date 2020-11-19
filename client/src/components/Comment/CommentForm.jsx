import React, {useState} from "react";
import {TextField, Button} from '@material-ui/core';
import "./CommentForm.css";


const CommentForm = props => {
    
    const [comment, setComment] = useState({
        product_id: props.productId,
        _creator: props.user,
        content:"",
        rating: 0,
        createdAt: "",
    });

    const onChangeHandler = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        const createdAt = new Date().toISOString();
        setComment({
            ...comment,
            createdAt:createdAt,
        });
        props.callBack(comment);
        setComment({
            ...comment,
            content:"",
        });
    };

    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <div className="reviews">
                    <input type="radio" name="rating" id="rd-5" value={5} onChange={onChangeHandler}/>
                    <label htmlFor="rd-5" className="fas fa-star"></label>

                    <input type="radio" name="rating" id="rd-4" value={4} onChange={onChangeHandler}/>
                    <label htmlFor="rd-4" className="fas fa-star"></label>

                    <input type="radio" name="rating" id="rd-3" value={3} onChange={onChangeHandler}/>
                    <label htmlFor="rd-3" className="fas fa-star"></label>

                    <input type="radio" name="rating" id="rd-2" value={2} onChange={onChangeHandler}/>
                    <label htmlFor="rd-2" className="fas fa-star"></label>

                    <input type="radio" name="rating" id="rd-1" value={1} onChange={onChangeHandler}/>
                    <label htmlFor="rd-1" className="fas fa-star"></label>
                </div>

                <TextField
                    required
                    id="standard-multiline-flexible"
                    label="Required"
                    name="content"
                    multiline
                    rowsMax={4}
                    placeholder="Enter your comment"
                    variant="outlined"
                    value={comment.content}
                    onChange={onChangeHandler}
                />
                <div>
                    <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;