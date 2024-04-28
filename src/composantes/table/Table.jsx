import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";

import "./table.scss";
export const List = () => {
  const [data, setData] = useState([]); //declarer que data aura les donnes des users 

  useEffect(() => {
    loadData(); //gets data
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/info/displayAll");
      setData(response.data);//mettre a jour data avec donnes escupere
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (

     
      <div className="datatable"> 

        <DataGrid className="datagrid"//affiche les donnees dans une grille 
          rows={data}
          columns={userColumns} //les collonees a affiche sont usercolumns
          getRowId={(row) => row.cin} // obtenir l'identifiant unique de chaque ligne de données dans la grille. Dans ce cas, l'identifiant unique est extrait du champ cin de l'objet de données de chaque ligne
          pageSize={9} //Nombre d'éléments à afficher par page dans la grille
          rowsPerPageOptions={[9]} //Options pour le nombre d'éléments par page. Dans ce cas, seulement l'option 9 est disponible
          checkboxSelection
        />
      </div>
    );


}
export default List;