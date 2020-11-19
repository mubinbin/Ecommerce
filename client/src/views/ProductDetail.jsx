import React, {useState, useEffect} from "react";
import axios from "axios";
import Rating from "../components/Rating/Rating";
import CommentForm from "../components/Comment/CommentForm";
import io from "socket.io-client";
import CommentHolder from "../components/Comment/CommentHolder"
import moment from "moment";
import Logout from "../components/RegLoginLogout/Logout";
import {Link} from "@reach/router";


const ProductDetail = props =>{

    const [product, setProduct] = useState({});
    const [user, setUser] = useState({});
    const [comments, setComments] = useState([]);
    const [loggedin] = useState(()=> localStorage.getItem("loggedin"));
    const [loaded, setLoaded] = useState(false);
    const [socket] = useState(() => io(":8000"));
    const [eachBid, setEachBid] = useState(0);
    const [error, setError] = useState("");
    const [userId] = useState(localStorage.getItem("loggedin"))


    useEffect(()=>{
        // get current user
        axios.get("http://localhost:8000/api/users/"+userId, {withCredentials:true})
        .then(res => {
            setUser(res.data);
        })
        .catch(err=> console.log("Error: "+ err));
        
        // get current product
        axios.get("http://localhost:8000/api/products/"+props.id, {withCredentials:true})
        .then(res => {
            setProduct(res.data)
        })
        .catch(err=>console.log(err));

        // get comment list
        axios.get("http://localhost:8000/api/comments/"+props.id, {withCredentials:true})
        .then(res => {
            setComments(res.data);
            setLoaded(true);
        })
        .catch(err => console.log("Error: " + err))

    },[props.id, userId]);

    useEffect(()=>{
        socket.on("sendCommentToClient", msg=>{
            setComments([
                msg,
                ...comments
            ]);
        });
        return () => socket.off("sendCommentToClient");
    }, [socket, comments])

    // new comment
    const createComment = newComment =>{
        // create new comment
        axios.post("http://localhost:8000/api/comments/new", newComment, {withCredentials:true})
        .then(res => {
            socket.emit("createComment", res.data);
        })
        .catch(err=>console.log("Error: " + err));
        
        // update product numReviews and rating
        if(newComment.rating !== 0){
            var numReviews = product.numReviews + 1;
            var rating = Number(product.rating) + Number(newComment.rating);
        }

        const updated = {...product, numReviews:numReviews, rating:rating};
        // console.log(updated);
        axios.put("http://localhost:8000/api/products/"+props.id, updated, {withCredentials: true})
        .then(res=>{
            socket.emit("updateProductReview", res.data);
            
        })
        .catch(err=>console.log("Error: "+err));
    };

    useEffect(()=>{
        socket.on("sendUpdatedProductToClient", msg=>{
            setProduct(msg);
        });
        return () => socket.off("sendUpdatedProductToClient");
    },[socket])

    // bid
    const placeBid = e => {
        e.preventDefault();

        if(Number(eachBid) < Number(product.eachBid)){
            return setError("Your bid cannot be less than the minimum bid increment")
        }
        const totalPrice = Number(product.price) + Number(eachBid);

        const updatedBid = {
            ...product,
            price: totalPrice
        }
        axios.put("http://localhost:8000/api/products/"+props.id, updatedBid, {withCredentials: true})
        .then(res=>{
            socket.emit("updateProductReview", res.data);
        })
        .catch(err=>console.log("Error: "+err));
    };

    return(
        <>
        {loggedin? 
        (
            <>
            <h2>Welcome, {user.username}!</h2>
            <Logout/>
            </>
        ) : 
        <Link className="btn btn-info" to="/">Register or log in to bid</Link>}
        <h3>{product.title}</h3>
        <p>Rating: {product.numReviews} reviews</p>
        <Rating product={product}/>
        <div>
            <img style={{width:"200px", height:"300px"}} src={product.image} alt=""/>
        </div>
        <p>Current Bid: ${product.price}</p>
        <p>Minimum Bid Increment: ${product.eachBid}</p>

        {
            loggedin &&
            <form onSubmit={placeBid} >
                {error && <small className="text-danger">{error}</small>}
                <input className="form-control col-sm" type="number" placeholder="Enter your bid" name="eachBid" onChange={e => setEachBid(e.target.value)}/>
                <button type="submit" className="btn btn-success btn-sm">Bid</button>
            </form>
        }

        <p>Time Left: {moment(product.enddate).from(Date.now(), true)}</p>
        <p>End Time: {new Date(product.enddate).toLocaleString("en-US", {dateStyle: "short",timeStyle: "short"})}</p>
        <p>Description: </p>
        <p>{product.desc}</p>
        
        {
            (loggedin && loaded) &&
            <CommentForm productId={product._id} callBack={createComment} user={user} btn="Comment"/>
        }
        {
            loaded &&
            comments.map(
                (comment,i)=>{
                    return(
                    <div key={i}>
                    {
                        comment.content.length>0 &&
                        <>
                        <CommentHolder comment={comment}/>
                        </>
                    }
                    </div>
                );
                }
            )
        }
        </>
    );
};


export default ProductDetail;