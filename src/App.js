import './App.css';
import {Routes, Route } from "react-router-dom";

//Components
import Layout from '../src/Layout/Layout';
import Profil from './Pages/Profil/Profil';
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error'


function App() {

  
  return (
    <>
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/profil/:id" element= {<Profil/>}></Route>
          <Route path="*" element={<Error />} /> 
      </Routes>
    </Layout>
    </>
 
  );
}

export default App;
