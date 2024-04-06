import React from 'react'
import {Routes,Route} from "react-router-dom"


import Signin from '../Components/Signin'
import Signup from '../Components/Signup'

import PrivateRoute from './PrivateRoute'
import MyStore from '../Components/MyStore'

import ProductsTable from '../Components/Products_Operations/Productsbar'
import EditProduct from '../Components/Products_Operations/EditTask'
import AddProduct from '../Components/Products_Operations/AddTask'
import ForgotPassword from '../Components/ForgotPassword'
import CategoryTable from '../Components/CategoryOperationStore/Categorybar'
import EditCategory from '../Components/CategoryOperationStore/EditCategory'
import AddCategory from '../Components/CategoryOperationStore/AddCategory'

import Productsdisplay from '../Pages/Productsdisplay'
import CartPage from '../Pages/CartPage'
import Homepage from '../Components/Home'
import ProfilePage from '../Pages/ProfilePage'
import ChangePassPage from '../Pages/ChangePassword'






const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
        <Route path="/productdispaly" element={<PrivateRoute><Productsdisplay/></PrivateRoute>}/>
        
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/mystore" element={<PrivateRoute><MyStore/></PrivateRoute>}/>
        <Route path='/addproduct' element={<PrivateRoute><AddProduct/></PrivateRoute>}/>
        <Route path="/editproduct/:id" element={<PrivateRoute><EditProduct/></PrivateRoute>}/>
        <Route path='/addcategoy' element={<PrivateRoute><AddCategory/></PrivateRoute>}/>
        <Route path="/editcategoy/:id" element={<PrivateRoute><EditCategory/></PrivateRoute>}/>
        <Route path='/profilepage' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path="/changepassword/:id" element={<PrivateRoute><ChangePassPage/></PrivateRoute>}/>
      
   
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/respassword' />

        <Route path="/productStore" element={<PrivateRoute><ProductsTable/></PrivateRoute>}/>



        <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>}/>

       
       
    </Routes>
  )
}

export default MainRoute