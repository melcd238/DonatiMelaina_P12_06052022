import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import Sidebar from '../Components/Sidebar/sidebar';


const Layout = (props)=>{
const location = useLocation()

if(location.pathname === "/"){
  return(
    <>
    <Header/>
    <div className='mainContainer'>
      {props.children} 
    </div>
    </>
)

} else{
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
   
}

export default Layout