import axios from "axios";
import React, {useState, useEffect} from "react";
import Logout from "../components/RegLoginLogout/Logout";
import Modal from "../components/Modal";
import {Link} from "@reach/router";


const Loggedin = props => {

    const [loggedin] = useState(()=> localStorage.getItem("loggedin"));
    const initialState = {
        title: "",
        startBid: 0,
        eachBid:1.00,
        price: 0,
        image: "",
        desc: "",
        rating: 0,
        numReviews: 0,
        user_id:loggedin
    };
    const [createProduct] = useState(true);
    const [activeProducts, setActiveProducts] = useState([]);
    const [pastProducts, setPastProducts] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products/active", {withCredentials: true})
        .then(res=>{
            setActiveProducts(res.data)
        })
        .catch(err=>console.log(err));
        
        axios.get("http://localhost:8000/api/products/past", {withCredentials: true})
        .then(res=>{
            setPastProducts(res.data)
        })
        .catch(err=>console.log(err));

    },[]);

    const addProduct = newProduct => {
        axios.post("http://localhost:8000/api/products/new", newProduct, {withCredentials: true})
        .then(res => {
            setActiveProducts([
                ...activeProducts,
                res.data
            ]);
        })
        .catch(err => console.log("Error "+ err));
    };

    return(
        
        <>
        <div className="d-flex justify-content-around mt-2">
        {
            loggedin &&
            <Modal
            action="Add your product"
            modalTitle="New Product"
            create={createProduct}
            callBack={addProduct}
            initialState={initialState}
            />
        }
        {
            loggedin?
            <Logout/>:<Link className="btn btn-info" to="/">Register Now</Link>
        }
        </div>

        <div className="list-left">
        {
            activeProducts.map((product)=>{
                return (
                    <Link key={product._id} to={"/products/"+product._id}><h5 >
                        {product.title}
                    </h5></Link>
                );
            })
        }
        </div>
        <div className="list-right">
        {
            pastProducts.map((product)=>{
                return (
                    // <Link key={product._id} to={"/products/"+product._id}><h5 >
                    //     {product.title}
                    // </h5></Link>
                    <h5 key={product._id}>{product.title}</h5>
                );
            })
        }
        </div>
        
        </>
    );
};

export default Loggedin;