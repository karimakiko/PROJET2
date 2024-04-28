import React from 'react'
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import "./home.scss";
import Widget from '../../composantes/widget/Widget';

import Table from '../../composantes/table/Table';
import axios from 'axios';
export const Home = () => {
  
  return (
    <div className='home'> 
      <Sidebar/>
      <div className='homecontainer'>
       <Navbar/>
        
         <div className="listContainer">
           <div className="listTitle">
            Liste des utilisateurs :
           </div>
          <Table/>

         </div>
      </div>
    </div>
  )
}
export default Home ;