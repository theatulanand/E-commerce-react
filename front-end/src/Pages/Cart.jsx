import { Button, DialogTitle } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, cartError, cartLoading, getCartItem } from '../Redux/Cart/actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const products = useSelector((store) => store.cartStore.cart);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)

    const total = products.reduce((acc, cur) => {
        return acc += cur.count * cur.price
    }, 0)

    const incItemInCart = (product) => {
        dispatch(cartLoading());
        axios({
            method: 'patch',
            url: `https://e-com-fake-server.herokuapp.com/cart/${product.id}`,
            data: { ...product, count: product.count + 1 }
        }).then((res) => {
            dispatch(addCart());
            dispatch(getCartItem());
        }).catch((err) => {
            console.log(err)
            dispatch(cartError())
        })
    }


    const decItemInCart = (product) => {
        if (product.count === 1) {
            axios.delete(`https://e-com-fake-server.herokuapp.com/cart/${product.id}`).then((res) => {
                dispatch(getCartItem())
            })
            return
        }

        dispatch(cartLoading());
        axios({
            method: 'patch',
            url: `https://e-com-fake-server.herokuapp.com/cart/${product.id}`,
            data: { ...product, count: product.count - 1 }
        }).then((res) => {
            dispatch(addCart());
            dispatch(getCartItem());
        }).catch((err) => {
            console.log(err)
            dispatch(cartError())
        })
    }

    const clearCart = () => {
        products.forEach((el) => {
            axios.delete(`https://e-com-fake-server.herokuapp.com/cart/${el.id}`).then(() => {
                dispatch(getCartItem())
            })
        })
    }

    const checkout = () => {
        setOpen(true);

        axios({
            method: "post",
            url: "https://e-com-fake-server.herokuapp.com/orders",
            data: {
                time: Date(Date.now()).toString(),
                items: products
            }
        }).then(() => {
            clearCart();
        })

    }


    return (
        <><div style={{ display: "flex", width: "90%", margin: "auto", border: "1px solid gray", borderRadius: "10px", marginTop: "20px", justifyContent: "space-between", padding: "20px" }}>

            {
                products.length === 0 ? <h1>Cart Is Empty</h1> : <div style={{ height: "550Px", overflow: "scroll", width: "750px" }}>
                    {
                        products.map((el) => (
                            <div key={el.id} style={{ display: "flex", margin: "auto", border: "1px solid gray", borderRadius: "10px", marginTop: "20px", justifyContent: "space-between", padding: "20px", flexWrap: "wrap" }}>
                                <div>
                                    <img style={{ width: "170px" }} src={el.imageBase + "/" + String(el.hex).slice(1)} alt="" />
                                </div>
                                <div>
                                    <h3>{el.title}</h3>
                                    <h2>₹  {el.price}</h2>
                                    <Button onClick={() => decItemInCart(el)} style={{ marginRight: "10px" }} variant="contained">-</Button>
                                    <Button style={{ marginRight: "10px" }} variant="outlined">{el.count}</Button>
                                    <Button onClick={() => incItemInCart(el)} variant="contained">+</Button>
                                </div>
                                <div>
                                    <h2>Total</h2>
                                    <h3>₹ {el.price * el.count}</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            {
                products.length === 0 ? "" :


                    <div style={{ border: "1px solid gray", borderRadius: "10px", width: "35%", paddingTop: "50px", height: "400px" }}>


                        <>
                            <div style={{ border: "1px solid gray", borderRadius: "10px", width: "80%", margin: "auto", textAlign: "center", marginBottom: "50px" }} >
                                <h1>Total</h1>
                                <h2>₹ {total}</h2>
                            </div>
                            <div style={{ width: "80%", margin: "auto", textAlign: "center" }} >
                                <Button onClick={checkout} color="success" variant="contained" fullWidth>Checkout</Button>
                                <Button onClick={clearCart} style={{ marginTop: "20px" }} color="error" variant="contained" fullWidth>Clear Cart</Button>
                            </div>

                        </>


                    </div>
            }
        </div>

            {
                open ? <>
                    <Dialog
                        open={open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        </DialogTitle>
                        <DialogContent>
                            <h2 style={{ textAlign: "center" }}>Payment Success</h2>
                            <img style={{ width: "300px" }} src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="" />
                        </DialogContent>
                        <DialogActions style={{ marginRight: "100px" }}>
                            {
                                products.length === 0 ? <Link to="/"><Button variant="contained" onClick={() => setOpen(false)}>Shop More</Button></Link> : ""
                            }

                        </DialogActions>
                    </Dialog>
                </> : ""
            }
        </>
    )
}
