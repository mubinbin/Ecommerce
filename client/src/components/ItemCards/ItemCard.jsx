import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {navigate} from "@reach/router";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        maxHeight: 450,
        padding: "10px",
    },
});

export default function ImgMediaCard(props) {
    const classes = useStyles();

    return (
    <Card onClick={()=>navigate("/products/"+props.product._id)} className={classes.root}>
        <CardActionArea>
        <CardMedia
            component="img"
            alt={props.product.title}
            height="300"
            image={props.product.image}
            title={props.product.title}
        />
        <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
            {props.product.title}
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button onClick={()=>navigate("/products/"+props.product._id)} size="small" color="primary">
        {props.active==="active"? "Learn More and Bid" : "Learn More (Bid Ended)"}
        </Button>
        </CardActions>
    </Card>
    );
}
