import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Private } from '../Components/Private'
import { getCartItem } from '../Redux/Cart/actions'
import { Cart } from './Cart'
import { Grocery } from './Grocery'
import { Home } from "./Home"
import { Login } from './Login'
import { Orders } from './Orders'
import { Pharmacy } from './Pharmacy'
import { ProductDetails } from './ProductDetails'

export const Pages = () => {
  const dispatch = useDispatch();

  dispatch(getCartItem());
  return (
    <Routes>
        <Route path="/" element={<Private><Home/></Private>}/>
        <Route path="/grocery" element={<Private><Grocery/></Private>}/>
        <Route path="/pharmacy" element={<Private><Pharmacy/></Private>}/>
        <Route path="/cart" element={<Private><Cart/></Private>}/>
        <Route path="/orders" element={<Private><Orders/></Private>}/>
        <Route path="/product/view/:productId" element={<Private><ProductDetails/></Private>}/>
        <Route path="/login" element = {<Login/>}/>
    </Routes>
  )
}
