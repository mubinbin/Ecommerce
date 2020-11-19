import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';

export default function ProductForm(props) {
    
    const [product, setProduct] = useState(props.initialState);
    const onChangeHandler = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        props.callBack(product);
        props.handleClose();
    }

    return(
        <form onSubmit={onSubmitHandler}>
            <div>
                <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                value={product.title}
                onChange={onChangeHandler}
                />
                <span className="col-sm-2"> </span>
                <TextField
                margin="dense"
                name="enddate"
                label="Auction End Time"
                type="datetime-local"
                defaultValue="2020-12-31T10:30"
                onChange={onChangeHandler}
                />
                <span className="col-sm-2"> </span>
                <TextField
                margin="dense"
                name="startBid"
                label="Starting Bid ($US Dollar)"
                type="text"
                value={product.startBid}
                onChange={onChangeHandler}
                />
                <span className="col-sm-2"> </span>
                <TextField
                margin="dense"
                name="eachBid"
                label="Bid Increment($US Dollar)"
                type="text"
                value={product.increment}
                onChange={onChangeHandler}
                />
            </div>
            <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            value={product.image}
            onChange={onChangeHandler}
            fullWidth
            />
            <TextField
            margin="dense"
            name="desc"
            label="Description"
            type="text"
            value={product.desc}
            onChange={onChangeHandler}
            fullWidth
            />
            <div style={{padding:"15px 15px 15px 0"}}>
                <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
                <span className="col-sm-2"> </span>
                <Button onClick={props.handleClose} variant="contained" color="secondary">Cancle</Button>
            </div>
        </form>
    )


};
