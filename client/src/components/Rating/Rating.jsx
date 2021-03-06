import React from "react";
import "./Rating.css"

const Rating = props => {
    let rate = 0;
    if(props.product.numReviews && props.product.numReviews!==0){
        rate = 100 - (props.product.rating / props.product.numReviews *20);
    }else if(!props.product.numReviews){
        rate = 100 -props.product.rating *20;
    }

    const styleStar = {
        clipPath: props.product.numReviews===0? `inset(0 100% 0 0)` : `inset(0 ${rate}% 0 0)`
    };

    return(
        <div className="rating">
            <div className="star">
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>
                <i className="far fa-star"></i>

                <div className="star-1" style={styleStar}>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
        </div>
        </div>
    );
};

export default Rating;