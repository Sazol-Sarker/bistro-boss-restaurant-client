import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import NavBar from '../Pages/Shared/NavBar';

const Main = () => {
    return (
        <div>
            <title>Bistro Boss | Home Page</title>
            <NavBar></NavBar>
            <h2>Main layout</h2>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default Main;