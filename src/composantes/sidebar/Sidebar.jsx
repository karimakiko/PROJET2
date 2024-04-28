import React from 'react'
import "./sidebar.scss";
import GridViewIcon from '@mui/icons-material/GridView';
import { Link } from 'react-router-dom';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import FeedIcon from '@mui/icons-material/Feed';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import marocLogo from './maroclogo.jpg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';





export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='top'>
      <Link to="/" style={{ textDecoration: "none" }}>
     
      <span >
    
<img src={marocLogo} alt="Logo du Maroc" className='logo' /></span>
      </Link>
      </div>
      <div className='center'>
        <ul>
          <p className='title'>USEFUL</p>
          <li>
          <GridViewIcon className='icon'/>
          <Link to="/"  style={{ textDecoration: "none" }}>
            <span>Acceuil</span>
            </Link>
          </li>
          <li>
           <PeopleOutlineIcon className='icon'/> 
           <Link to="/users"  style={{ textDecoration: "none" }}>  
            <span>Utilisateurs</span>
           </Link>
          </li>
          <p className='title'>SERVICE</p>
          
          <li>
          <ForwardToInboxIcon className='icon'/>
           <Link to="/Demandes/Absence"  style={{ textDecoration: "none" }}>  
            <span>Demandes d'absences</span>
           </Link>
          </li>
          <li>
           <CheckCircleIcon className='icon'/> 
           <Link to="/users"  style={{ textDecoration: "none" }}>  
            <span>Demandes acceptées</span>
           </Link>
          </li>
          <li>
           <CancelIcon className='icon'/> 
           <Link to="/users"  style={{ textDecoration: "none" }}>  
            <span>Demandes refusées</span>
           </Link>
          </li>
          <li>
            <FeedIcon className='icon'/>
            <span>Formation Continues</span>
          </li>
          <li>
            <NotificationsNoneIcon className='icon'/>
            <span>Notifications</span>
          </li>
          <li>
            <SettingsIcon className='icon'/>
            <span>Parametrage</span>
          </li>
          <p className='title'>Utilisateur</p>
          <li>
            <AccountCircleIcon className='icon'/>
            <span>Profil</span>
          </li>
         
          <li>
          <LogoutIcon className='icon'/>
           <span>Deconnexion</span>
          </li>
        </ul>
      </div>
     
      
    </div>
  )
}
export default Sidebar ;