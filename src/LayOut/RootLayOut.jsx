import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shear/Navbar';
import Footer from '../Pages/Shear/Footer';
import '../index.css'
const RootLayOut = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='min-h-screen'>
      <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;