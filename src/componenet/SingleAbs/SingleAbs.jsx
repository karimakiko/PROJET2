import React, { useEffect, useState } from 'react';
import "./single.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleAbs = () => {
    const { code } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchData(code);
    }, [code]); 

    const fetchData = async (code) => {
        try {
            const demandResponse = await axios.get(`http://localhost:8082/ressourcehumaine/demandeabsence/${code}`);
            setUser(demandResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="bottom">
                    <div className='info'>
                        {user && (
                            <div className='item'>
                                <div className="details">
                                    <h1 className="itemTitle">La demande d'absence :</h1>
                                    <div className="detailItem row">
                                        <div className="col-md-4">
                                            <span className="itemKey">Type de la demande d'absence :</span>
                                            <span className="itemValue">{user.type}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Date de départ :</span>
                                            <span className="itemValue">{user.datededepart}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Date de retour :</span>
                                            <span className="itemValue">{user.dateRetour}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Nombre de jours :</span>
                                            <span className="itemValue">{user.nbrjours}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Nombre de jours à déduire :</span>
                                            <span className="itemValue">{user.nbrjourdeduire}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Nombre de jours à ne pas déduire :</span>
                                            <span className="itemValue">{user.nbrjournepasdeduire}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Reliquat :</span>
                                            <span className="itemValue">{user.reliquat}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Le remplaçant :</span>
                                            <span className="itemValue">{user.remplacant}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="itemKey">Cumul des absences de maladie :</span>
                                            <span className="itemValue">{user.cumul}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleAbs;
