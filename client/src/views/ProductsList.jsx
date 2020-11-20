import axios from "axios";
import React, {useState, useEffect} from "react";
import Logout from "../components/RegLoginLogout/Logout";
import Modal from "../components/Modal";
import {Link} from "@reach/router";
import ItemCard from "../components/ItemCards/ItemCard";
import "./ProductList.css"


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
            var newProductEndDate = new Date(newProduct.enddate);

            if(newProductEndDate >= Date.now()){
                setActiveProducts([
                    ...activeProducts,
                    res.data
                ]);
            }else{
                setPastProducts([
                    ...pastProducts,
                    res.data
                ]);
            }
        })
        .catch(err => console.log("Error "+ err));
    };

    return(
        
        <>
        <div className="welcome-header">
        {
            loggedin?
            (
                <>
                <Modal
                action="Add your item"
                modalTitle="New Product"
                create={createProduct}
                callBack={addProduct}
                initialState={initialState}
                />
                <Logout/> 
                </>
            )
            :
            (
                <>
                    <h2>Welcome to RealTimeBid!</h2>
                <div>
                    <Link className="btn btn-info" to="/reg">Register or Log in to bid now!!</Link>
                </div>
                </>
            )
        }
        </div>
        <h3>Active Items</h3>
        <div className="list-grid">
        {
            activeProducts.map((product, i)=>{
                return (
                    <div className="each-item">
                        <ItemCard key={i} active="active" product={product}/>
                    </div>
                );
            })
        }
        </div>
        <h3>Bid Ended</h3>
        <div className="list-grid">
        {
            pastProducts.map((product, i)=>{
                return (
                    <div className="each-item">
                        <ItemCard key={i} active="non-active" product={product}/>
                    </div>
                );
            })
        }
        </div>
        
        </>
    );
};

export default Loggedin;