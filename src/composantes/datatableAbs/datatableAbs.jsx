import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { userColumns2 } from "../../datatablesource";
import AddCommentIcon from '@mui/icons-material/AddComment';
const DatatableAbs = () => {
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/ressourcehumaine/demandeabsence/afficher-tous');
      // Add unique id to each row
      const demandesWithIds = response.data.map((row, index) => ({ ...row, id: row.code }));
      setDemandes(demandesWithIds);
    } catch (error) {
      console.error('Error fetching demandes:', error);
    }
  };
  

  const handleViewDetails = (code) => {
    navigate(`/Demandes/Absence/${code}`);
  };

  const handleEditDetails = (code) => {
    navigate(`/Demandes/Absence/Edit/${code}`);
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:8082/ressourcehumaine/demandeabsence/supprimer/${code}`);
      fetchDemandes(); // Refresh demandes after deletion
    } catch (error) {
      console.error('Error deleting demande:', error);
    }
  };

  const columns = [
    { field: 'code', headerName: 'Code', width: 150 },
    // Add other columns as needed
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <div className="viewButton" onClick={() => handleViewDetails(params.row.code)}>
            <PreviewIcon />
          </div>
          <div className="deleteButton" onClick={() => handleDelete(params.row.code)}>
            <DeleteIcon />
          </div>
          <div className="editButton" onClick={() => handleEditDetails(params.row.code)}>
            <ModeEditIcon />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Liste des demandes d'absences :
        <Link to="/Demandes/Absence/new" className="link">
          <AddCommentIcon />
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={demandes}
        columns={userColumns2.concat(columns)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableAbs;
