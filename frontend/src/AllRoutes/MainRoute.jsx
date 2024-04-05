import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from '../Components/home'

import Signin from '../Components/Signin'
import Signup from '../Components/Signup'
import CartPage from '../Components/Cartpage'
import PrivateRoute from './PrivateRoute'
import MyStore from '../Components/MyStore'
import CategoryStore from '../Components/CategoryStore'
import ProductsTable from '../Components/Products_Operations/Productsbar'





const MainRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/mystore" element={<PrivateRoute><MyStore/></PrivateRoute>}/>

        <Route path="/categoryStore" element={<CategoryStore/>}/>

        <Route path="/productStore" element={<PrivateRoute><ProductsTable/></PrivateRoute>}/>


        <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>}/>

        {/* <Route path="/taskbar" element={<TaskBar/>}/>
        <Route path="/addtask" element={<PrivateRoute><Addtask/></PrivateRoute>}/>
        <Route path="/taskedit/:taskId" element={<PrivateRoute><EditTask/></PrivateRoute>}/> */}
       
    </Routes>
  )
}

export default MainRoute