import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
nav

const ProductDetail = props =>{

    const context = useContext(AuthContext);
    const [product, setProduct] = useState({});

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products/"+props.id, {withCredentials:true})
        .then(res => {
            setProduct(res.data)
        })
        .catch(err=>console.log(err));
    },[props.id]);

    return(
        <>
        <h3>{product.titile}</h3>
        <p>${product.price}</p>
        <p>{product.desc}</p>
        <p>Rating: {product.numReviews}</p>
        
        </>
    );
};


export default ProductDetail;