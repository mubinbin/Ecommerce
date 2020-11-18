import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import AuthContext from "../components/AuthContext";
import Logout from "../components/RegLoginLogout/Logout";
import Modal from "../components/Modal";
import {Link} from "@reach/router";

const Loggedin = props => {

    const initialState = {
        title: "",
        price: 0,
        image: "",
        desc: "",
        rating: 0,
        numReviews: 0,
    };
    const context = useContext(AuthContext);
    const [createProduct] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products", {withCredentials: true})
        .then(res=>{
            setProducts(res.data)
        })
        .catch(err=>console.log(err));
    },[]);

    const addProduct = newProduct => {
        axios.post("http://localhost:8000/api/products/new", newProduct, {withCredentials: true})
        .then(res => {
            setProducts([
                ...products,
                res.data
            ]);
        })
        .catch(err => console.log("Error "+ err));
    };

    return(
        
        <>
        <div className="d-flex justify-content-around mt-2">
        {
            context.loggedin &&
            <Modal
            action="Add your product"
            modalTitle="New Product"
            create={createProduct}
            callBack={addProduct}
            initialState={initialState}
            />
        }
        {
            context.loggedin?
            <Logout/>:<Link className="btn btn-info" to="/">Register Now</Link>
        }
        </div>
        
        {
            products.map((product)=>{
                return (
                    <Link to={"/products/"+product._id}><h3 key={product._id}>
                        {product.title}
                    </h3></Link>
                );
            })
        }
        
        </>
    );
};

export default Loggedin;