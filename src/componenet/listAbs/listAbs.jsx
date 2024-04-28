import React from 'react';
import "./listAbs.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import DatatableAbs from '../../composantes/datatableAbs/datatableAbs'; // Utilisez DatatableAbs avec une première lettre en majuscule

const ListAbs = () => {
  
  return (
    <div className='list'>
      <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
      
        <DatatableAbs/> {/* Utilisez DatatableAbs avec une première lettre en majuscule */}
     
        </div> 
    </div>
  );
}

export default ListAbs;
