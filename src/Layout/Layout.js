import React from 'react';

import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/sidebar';


const Layout = (props)=>{
    return(
        <>
        <Header/>
        <div className='mainContainer'>
          <Sidebar/> 
          {props.children} 
        </div>
        </>
    )
}

export default Layout