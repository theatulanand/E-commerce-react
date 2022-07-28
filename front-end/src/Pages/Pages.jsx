import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Private } from '../Components/Private'
import { Grocery } from './Grocery'
import { Home } from "./Home"
import { Login } from './Login'
import { Pharmacy } from './Pharmacy'

export const Pages = () => {
  return (
    <Routes>
        <Route path="/" element={<Private><Home/></Private>}/>
        <Route path="/grocery" element={<Private><Grocery/></Private>}/>
        <Route path="/pharmacy" element={<Private><Pharmacy/></Private>}/>
        <Route path="/login" element = {<Login/>}/>
    </Routes>
  )
}
