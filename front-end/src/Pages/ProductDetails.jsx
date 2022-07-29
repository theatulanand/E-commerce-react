import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { cartError, cartLoading, addCart, getCartItem } from '../Redux/Cart/actions';






export const ProductDetails = () => {
    const {cart} = useSelector((store) => store.cartStore)
    const dispatch = useDispatch()
    const [product, setProduct] = React.useState([]);
    const { title, imageBase, hex, price, rating, description } = product;
    const { productId } = useParams();
    const [count , setCount] = React.useState(1);
    

    const isItemInCart = () =>{
        const el = cart.find(el => el.title === title);
        return !!el
    }

    const getCount = () =>{
        axios.get(`http://localhost:3001/cart/${productId}`).then((res) => {
            setCount(res.data.count);
        }).catch((err) =>{
            console.log(err)
        })
    }

    


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:3001/products/${productId}`
        }).then((res) => {
            setProduct(res.data);
            if(isItemInCart()){
                getCount();
            }
        }).catch((err) => {
            console.log("error is : " + err);
        })
    },[productId])

    const addItemToCart = () => {
        dispatch(cartLoading());
        axios({
            method: 'post',
            url: 'http://localhost:3001/cart',
            data: { ...product, count: 1 }
        }).then((res) => {
            dispatch(addCart());
            dispatch(getCartItem());
            alert("Item Added To Cart")
            getCount()
        }).catch((err) => {
            console.log(err)
            dispatch(cartError())
        })
    }

    const incItemInCart = () => {
        dispatch(cartLoading());
        axios({
            method: 'patch',
            url: `http://localhost:3001/cart/${productId}`,
            data: { ...product, count: count + 1 }
        }).then((res) => {
            dispatch(addCart());
            dispatch(getCartItem());
            getCount()
        }).catch((err) => {
            console.log(err)
            dispatch(cartError())
        })
    }


    const decItemInCart = () => {
        if(count === 1) {
            axios.delete(`http://localhost:3001/cart/${productId}`).then((res) => {
                dispatch(getCartItem())
            })
            return
        }

        dispatch(cartLoading());
        axios({
            method: 'patch',
            url: `http://localhost:3001/cart/${productId}`,
            data: { ...product, count: count - 1 }
        }).then((res) => {
            dispatch(addCart());
            dispatch(getCartItem());
            getCount()
        }).catch((err) => {
            console.log(err)
            dispatch(cartError())
        })
    }


    return (

        <div style={{ width: "35%", margin: "auto", marginTop: "30px" }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageBase + "/" + String(hex).slice(1)}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography style={{ height: "50px" }} gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography style={{ height: "auto" }} gutterBottom variant="h5" component="div">
                        {description}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography style={{ background: "green", borderRadius: "8px", padding: "5px", color: "white" }} variant="body2" color="text.secondary">
                            {"₹ " + price}
                        </Typography>
                        <Typography style={{ background: "blue", borderRadius: "8px", padding: "5px", color: "white" }} variant="body2" color="text.success">
                            {"⭐ " + rating}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions>
                    {
                        isItemInCart() ? <div style={{width: "250px" , margin: "auto"}}>
                             <Button onClick={() => {decItemInCart()}} style={{marginRight: "10px"}}  variant="contained" size="small">-</Button>
                             <Button  style={{marginRight: "10px"}}  variant="outlined" size="small">{count}</Button>
                             <Button onClick={() => {incItemInCart()}}  variant="contained" size="small">+</Button>
                        </div>:
                      <Button onClick={() => {addItemToCart()}} fullWidth variant="contained" size="small">Add To Cart</Button>
                    }
                    
                </CardActions>
            </Card>
        </div>
    );
}