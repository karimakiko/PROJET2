import React from 'react';
import "./single.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import List from "../../composantes/table/Table";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";
import { useParams } from "react-router-dom";



const Single = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/api/info/displayById/${userId}`);
                console.log("User data:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="bottom">
                    <div className='info'>

                        <div className='item'>
                            <div className="details">
                                <h1 className="itemTitle"> L'Affiche de l'utilisateur    :  {`${user.prenom} ${user.nom}`}</h1>
                                <h1 className='title'>Information Personnelle:</h1>
                                <div className="detailItem">
                                    <span className="itemKey">CIN:</span>
                                    <span className="itemValue">{user.cin}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Sexe:</span>
                                    <span className="itemValue">{user.sexe}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Date de naissance:</span>
                                    <span className="itemValue">{user.dateNaissance}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Lieu de naissance:</span>
                                    <span className="itemValue">{user.lieuNaissance}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Adresse:</span>
                                    <span className="itemValue">{user.adresse}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Téléphone:</span>
                                    <span className="itemValue">{user.numeroTel}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{user.email}</span>
                                </div>
                            </div>
                        </div>




                        <h1 className='title'>Informations Familiales:</h1>

                        <div className="details">
                            {user.infoFamiliales && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nom du pere:</span>
                                        <span className="itemValue">{user.infoFamiliales.situationFamiliale}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Situation Familiale:</span>
                                        <span className="itemValue">{user.infoFamiliales.situationFamiliale}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Mariage:</span>
                                        <span className="itemValue">{user.infoFamiliales.dateMariage}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Nombre d'Enfants:</span>
                                        <span className="itemValue">{user.infoFamiliales.nombreEnfants}</span>
                                    </div>
                                    <span className="itemKey">Conjoints:</span>
                                    <div className="details">
                                        
                                         <div className="DetailItem">
                                            {user.infoFamiliales.conjoints.map((conjoint, index) => (
                                                <div key={index} className="DetailItem">
                                                    <span className="subTitle">Conjoint {index + 1}:</span>
                                                    <div className="details">
                                                        <div className="detailItem">
                                                            <span className="itemKey">Nom:</span>
                                                            <span className="itemValue">{conjoint.nomConjoint}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Date de Mariage:</span>
                                                            <span className="itemValue">{conjoint.dateMariage}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Date de Divorce:</span>
                                                            <span className="itemValue">{conjoint.dateDivorce}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <span className="itemKey">Enfants :</span>
                         <div className="details">
                                        
                                         <div className="DetailItem">
                                            {user.infoFamiliales.enfants.map((enfant, index) => (
                                                <div key={index} className="DetailItem">
                                                    <span className="subTitle">Enfant {index + 1}:</span>
                                                    <div className="details">
                                                        <div className="detailItem">
                                                            <span className="itemKey">Prénom de l'Enfant:</span>
                                                            <span className="itemValue">{enfant.prenom}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                            <span className="itemKey">Nom de la Mère:</span>
                                                            <span className="itemValue">{enfant.nomMere}</span>
                                                        </div>
                                                        <div className="detailItem">
                                                           <span className="itemKey">Date de Naissance:</span>
                                                            <span className="itemValue">{enfant.dateNaissance}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                        


                        <h1 className='title'>Informations Administratives:</h1>

                        <div className="details">
                            {user.infoAdministratives && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Point de Présence Réseau (PPR):</span>
                                        <span className="itemValue">{user.infoAdministratives.ppr}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Point de Branchement (PB):</span>
                                        <span className="itemValue">{user.infoAdministratives.pb}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.dateRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Diplôme de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.diplomeRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Administration de Recrutement:</span>
                                        <span className="itemValue">{user.infoAdministratives.administrationRecrutement}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date de Titularisation:</span>
                                        <span className="itemValue">{user.infoAdministratives.dateTitularisation}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Grade:</span>
                                        <span className="itemValue">{user.infoAdministratives.grade}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Échelle:</span>
                                        <span className="itemValue">{user.infoAdministratives.echelle}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Échelon:</span>
                                        <span className="itemValue">{user.infoAdministratives.echelon}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Indice:</span>
                                        <span className="itemValue">{user.infoAdministratives.indice}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Statut Administratif:</span>
                                        <span className="itemValue">{user.infoAdministratives.statutAdministratif}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Situation Administrative:</span>
                                        <span className="itemValue">{user.infoAdministratives.situationAdministrative}</span>
                                    </div>
                                </div>
                            )}

                        </div>


                        <h1 className='title'>Informations Prévoyance Sociale:</h1>

                        <div className="details">
                            {user.infoPrevoyanceSociale && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme de Prévoyance Sociale:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.organismePrevoyanceSociale}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.numAffiliationCNOPS}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Immatriculation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.numImmatriculationCNOPS}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date d'Affiliation CNOPS:</span>
                                        <span className="itemValue">{user.infoPrevoyanceSociale.dateAffiliationCNOPS}</span>
                                    </div>
                                </div>)}
                        </div>



                        <h1 className='title'>Organismes Sociales:</h1>
                        <div className="details">
                            {user.organismesSociales && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation à la Fondation Hassan II:</span>
                                        <span className="itemValue">{user.organismesSociales.numAffiliationFondationHassan2}</span>
                                    </div>
                                </div>)}

                        </div>



                        <h1 className='title'>Informations Retraite:</h1>

                        <div className="details">
                            {user.infoRetraite && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme de Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.organismeRetraite}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.numeroAffiliationRetraite}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date d'Affiliation Retraite:</span>
                                        <span className="itemValue">{user.infoRetraite.dateAffiliationRetraite}</span>
                                    </div>
                                </div>)}
                        </div>



                        <h1 className='title'>Informations Assurance:</h1>
                        <div className="details">
                            {user.infoAssurance && (
                                <div>
                                    <div className="detailItem">
                                        <span className="itemKey">Organisme d'Assurance:</span>
                                        <span className="itemValue">{user.infoAssurance.organismeAssurance}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Numéro d'Affiliation Assurance:</span>
                                        <span className="itemValue">{user.infoAssurance.numeAffiliationAssurance}</span>
                                    </div>
                                </div>)}
                        </div>



                        <h1 className='title'>Sanctions:</h1>

                        <div className="details">
                            {user.sanctions && (
                                <div>
                                    {user.sanctions.map((sanction, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="itemKey">Sanction {index + 1}:</span>
                                            <span className="itemValue">{`${sanction.sanction} - ${sanction.nature} - ${sanction.motif} - ${sanction.dateSanction}`}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>



                        <h1 className='title'>Documents et Pièces Jointes:</h1>
                        <div className="details">
                            {user.documentsPiecesJointes && (
                                <div>
                                    {user.documentsPiecesJointes.map((document, index) => (
                                        <div key={index} className="detailItem">
                                            <span className="itemKey">document {index + 1}:</span>
                                            <span className="itemValue">{`${document.nom} - ${document.cheminStockage} - ${document.type}`}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>);


}
export default Single;
