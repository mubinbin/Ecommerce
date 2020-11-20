import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Rating from "../components/Rating/Rating";
import CommentForm from "../components/Comment/CommentForm";
import io from "socket.io-client";
import CommentHolder from "../components/Comment/CommentHolder"
import moment from "moment";
import Logout from "../components/RegLoginLogout/Logout";
import {Link} from "@reach/router";
import "./ProductDetail.css"


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
    const commentsEndRef = useRef(null);

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
                ...comments,
                msg
            ]);
        });
        return () => socket.off("sendCommentToClient");
    }, [socket, comments])

    const isActive = () =>{
        if(loaded){
            var inputEndDate = new Date(product.enddate);
            if(inputEndDate < Date.now()) return false;
                return true;
        }
    }
    console.log(isActive())

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
    
    // auto scroll to the bottom when entering the window and when new messages come in
    const scrollToBottom = () => {
        if(commentsEndRef.current){
            commentsEndRef.current.scrollTop = commentsEndRef.current.scrollHeight - commentsEndRef.current.clientHeight;
        }
    };
    
    useEffect(()=>{
        scrollToBottom();
    },[comments]);

    return(
        <>
        {loggedin? 
        (
            <>
            <div className="header">
                <h2>Welcome, {user.username}!</h2>
                <Link className="text-uppercase" to="/"><p> Back to item list</p></Link>
                <Logout />
            </div>
            </>
        ) : 
        (
            <div className="py-2">
                <Link className="btn btn-info" to="/reg">Register or Log in to bid now!! </Link>
                <Link className="text-uppercase" to="/"> Back to item list</Link>
            </div>
        )}
        <h3>{product.title}</h3>
        <b className="d-inline-block">Rating:</b> <div className="d-inline-block"><Rating product={product}/></div>
        <p>{product.numReviews} reviews</p>
        <div className="main-content">
            <div className="left">
                <img src={product.image} alt=""/>
            </div>
            <div className="right">
                <b>Description: </b>
                <p>{product.desc}</p>
            </div>
        </div>
        <div className="bid-info">
            <div className="price">
                <h4>Current Bid: $ <span>{product.price}</span></h4>
                <h4>Minimum Bid Increment: $ <span>{product.eachBid}</span></h4>
            </div>

            <div className="time">
                <h5>End Time: <span>{new Date(product.enddate).toLocaleString("en-US", {dateStyle: "short",timeStyle: "short"})}</span></h5>
                {
                    isActive()?
                    <h5>Time Left: <span>{moment(product.enddate).from(Date.now(), true)}</span></h5>
                    :
                    <h5>Time Left: <span>Bid has ended</span></h5>
                }
            </div>
            
        </div>
        {
            (loggedin && isActive()) &&
            <form className="bid-form" onSubmit={placeBid} >
                {error && <p><small className="text-danger">{error}</small></p>}
                <input className="form-control col-sm" type="number" placeholder="Enter bid" name="eachBid" onChange={e => setEachBid(e.target.value)}/>
                <button type="submit" className="btn btn-danger">BID</button>
            </form>
        }
        <div ref={commentsEndRef} className="chat-window">
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
        </div>
        {
            (loggedin && loaded && isActive()) &&
            <CommentForm productId={product._id} callBack={createComment} user={user} btn="Say something"/>
        }
        </>
    );
};


export default ProductDetail;