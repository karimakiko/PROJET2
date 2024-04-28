import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";

const Datatable = () => {
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

  const handleDelete = async(cin) => {
    try {
      // Envoi de la requête DELETE à votre API backend
      await axios.delete(`http://localhost:8082/api/info/delete/${cin}`);
  
      // Si la suppression dans la base de données réussit,
      // mise à jour de l'état local des données pour refléter le changement
      setData(data.filter((item) => item.cin !== cin));//cette ligne filtre les éléments de data pour supprimer celui dont la propriété cin correspond à la valeur passée en paramètre cin, puis met à jour l'état data avec le nouveau tableau filtré à l'aide de setData.
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } 
  };
  const navigate = useNavigate();

  const handleViewDetails = (cin) => {
    navigate(`/users/${cin}`);
  };
  const handleEditDetails = (cin) => {
    navigate(`/users/Edit/${cin}`);
  };


  const actionColumn = [
    {
      field: "action",
      headerName: " Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          <div className="viewButton" onClick={() => handleViewDetails(params.row.cin)}>
              <PreviewIcon />
            </div>
            
            <div className="deleteButton"
              onClick={() => handleDelete(params.row.cin)}
            >
              <DeleteIcon />
            </div>

            <div className="editButton" onClick={() => handleEditDetails(params.row.cin)}>
            <ModeEditIcon />
            </div>
           

          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Liste des utilisateurs:
        <Link to="/users/new" className="link"><PersonAddIcon /></Link>
      </div>
      <DataGrid className="datagrid"//affiche les donnees dans une grille 
        rows={data}
        columns={userColumns.concat(actionColumn)} //les collonees a affiche sont usercolumns
        getRowId={(row) => row.cin} // obtenir l'identifiant unique de chaque ligne de données dans la grille. Dans ce cas, l'identifiant unique est extrait du champ cin de l'objet de données de chaque ligne
        pageSize={9} //Nombre d'éléments à afficher par page dans la grille
        rowsPerPageOptions={[9]} //Options pour le nombre d'éléments par page. Dans ce cas, seulement l'option 9 est disponible
        checkboxSelection
      />
  
    </div>
  );
};

export default Datatable;
//getRowId={(row) => row.cin} : Identification des lignes : Lorsque vous effectuez des opérations telles que la sélection, la mise à jour ou la suppression de lignes dans la grille, le composant DataGrid doit savoir comment identifier chaque ligne de manière unique. L'identifiant unique permet au composant de faire la distinction entre les différentes lignes.