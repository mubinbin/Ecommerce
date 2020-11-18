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
                name="price"
                label="Price ($US Dollar)"
                type="text"
                value={product.price}
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
            <Button onClick={props.handleClose} variant="contained" color="secondary">Cancle</Button>
            <span className="col-sm-2"> </span>
            <Button type="submit" variant="contained" color="primary">{props.btn}</Button>
        </form>
    )


};
