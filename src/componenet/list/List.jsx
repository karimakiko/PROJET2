import React from 'react'
import "./list.scss"
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import Datatable from '../../composantes/datatable/datatable';
export const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <Datatable/>
      </div>

    </div>
  )
}
export default List ;