import React, { useEffect, useState } from 'react';
import "./form.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Form = () => {
  let navigate = useNavigate();

  const { userId } = useParams();

  const [user, setUser] = useState({
    cin: "",
    nom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    numeroTel: "",
    email: "",
    infoFamiliales: {
      nomPere: "",
      nomMere: "",
      situationFamiliale: "",
      dateMariage: "",
      nomConjoint: "",
      cinConjoint: "",
      dateNaissanceConjoint: "",
      fonctionConjoint: "",
      nombreEnfants: "",
      conjoints: [],
      enfants: [],
    },
    infoAdministratives: {
      ppr: "",
      pb: "",
      dateRecrutement: "",
      diplomeRecrutement: "",
      administrationRecrutement: "",
      dateTitularisation: "",
      grade: "",
      echelle: "",
      echelon: "",
      indice: "",
      statutAdministratif: "",
      situationAdministrative: ""
    },
    infoPrevoyanceSociale: {
      organismePrevoyanceSociale: "",
      numAffiliationCNOPS: "",
      numImmatriculationCNOPS: "",
      dateAffiliationCNOPS: ""
    },
    sanctions: [{
      sanction: "",
      nature: "",
      motif: "",
      dateSanction: ""
    }]
  });

  useEffect(() => {
    loadUser()
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => {
      const updatedUser = { ...prevUser };

      // Gestion des champs imbriqués
      const keys = name.split('.');
      const lastKeyIndex = keys.length - 1;

      keys.reduce((acc, currentKey, index) => {
        if (index === lastKeyIndex) {
          acc[currentKey] = value;
        } else {
          acc[currentKey] = { ...acc[currentKey] };
        }
        return acc[currentKey];
      }, updatedUser);

      return updatedUser;
    });
  };
  const handleArrayChange = (index, name, e) => {
    const { value } = e.target;
    const newArray = [...user[name]];
    newArray[index][e.target.name] = value;
    setUser({ ...user, [name]: newArray });
  };
  const handleAddItem = (name) => {
    setUser({ ...user, [name]: [...user[name], {}] });
  };

  const handleRemoveItem = (name, index) => {
    const newArray = [...user[name]];
    newArray.splice(index, 1);
    setUser({ ...user, [name]: newArray });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result =await axios.put(`http://localhost:8080/api/info/update/${userId}`, user);
      console.log(result.data);
      alert('Données mises à jour avec succès !');
      navigate("/users");
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      alert('Une erreur s\'est produite lors de la mise à jour des données. Veuillez réessayer.');    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/info/displayById/${userId}`);
      setUser(result.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

 
    return (
      <div className='new'>
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className='bottom'>
            <form onSubmit={onSubmit}>
              <h1>Modifier les informations de l'utilisateur :</h1>
              <div className='info'>
                <div className="details">
                  <h1 className='title'>Information Personnelle:</h1>
                  <div className="detailItem">
                    <label className="itemKey">Prénom:</label>
                    <input type="text" name="prenom" value={user.prenom} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Nom:</label>
                    <input type="text" name="nom" value={user.nom} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>CIN:</label>
                    <input type="text" name="cin" value={user.cin} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Sexe:</label>
                    <input type="text" name="sexe" value={user.sexe} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date de naissance:</label>
                    <input type="date" name="dateNaissance" value={user.dateNaissance} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Lieu de naissance:</label>
                    <input type="text" name="lieuNaissance" value={user.lieuNaissance} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Adresse:</label>
                    <input type="text" name="adresse" value={user.adresse} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Numéro de téléphone:</label>
                    <input type="text" name="numeroTel" value={user.numeroTel} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Email:</label>
                    <input type="text" name="email" value={user.email} onChange={onInputChange} />
                  </div>
                </div>
  
                {/* Informations Familiales */}
                <div className="details">
                  <h1 className='title'>Informations Familiales:</h1>
                  <div className="detailItem">
                    <label>Nom de père :</label>
                    <input type="text" name="infoFamiliales.nomPere" value={user.infoFamiliales.nomPere} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Nom de la mère:</label>
                    <input type="text" name="infoFamiliales.nomMere" value={user.infoFamiliales.nomMere} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Situation Familiale:</label>
                    <input type="text" name="infoFamiliales.situationFamiliale" value={user.infoFamiliales.situationFamiliale} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date de mariage:</label>
                    <input type="date" name="infoFamiliales.dateMariage" value={user.infoFamiliales.dateMariage} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Nom du conjoint :</label>
                    <input type="text" name="infoFamiliales.nomConjoint" value={user.infoFamiliales.nomConjoint} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>CIN du conjoint :</label>
                    <input type="text" name="infoFamiliales.cinConjoint" value={user.infoFamiliales.cinConjoint} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date de naissance du conjoint :</label>
                    <input type="date" name="infoFamiliales.dateNaissanceConjoint" value={user.infoFamiliales.dateNaissanceConjoint} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Fonction du conjoint :</label>
                    <input type="text" name="infoFamiliales.fonctionConjoint" value={user.infoFamiliales.fonctionConjoint} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Nombre d'enfants :</label>
                    <input type="text" name="infoFamiliales.nombreEnfants" value={user.infoFamiliales.nombreEnfants} onChange={onInputChange} />
                  </div>
                </div>
  
                {/* Informations Administratives */}
                <div className="details">
                  <h1 className='title'>Informations Administratives:</h1>
                  <div className="detailItem">
                    <label>PPR :</label>
                    <input type="text" name="infoAdministratives.ppr" value={user.infoAdministratives.ppr} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>PB :</label>
                    <input type="text" name="infoAdministratives.pb" value={user.infoAdministratives.pb} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date de recrutement :</label>
                    <input type="date" name="infoAdministratives.dateRecrutement" value={user.infoAdministratives.dateRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Diplôme de recrutement :</label>
                    <input type="text" name="infoAdministratives.diplomeRecrutement" value={user.infoAdministratives.diplomeRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Administration de recrutement :</label>
                    <input type="text" name="infoAdministratives.administrationRecrutement" value={user.infoAdministratives.administrationRecrutement} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date de titularisation :</label>
                    <input type="date" name="infoAdministratives.dateTitularisation" value={user.infoAdministratives.dateTitularisation} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Grade :</label>
                    <input type="text" name="infoAdministratives.grade" value={user.infoAdministratives.grade} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Echelle :</label>
                    <input type="text" name="infoAdministratives.echelle" value={user.infoAdministratives.echelle} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Echelon :</label>
                    <input type="text" name="infoAdministratives.echelon" value={user.infoAdministratives.echelon} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Indice :</label>
                    <input type="text" name="infoAdministratives.indice" value={user.infoAdministratives.indice} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Statut administratif :</label>
                    <input type="text" name="infoAdministratives.statutAdministratif" value={user.infoAdministratives.statutAdministratif} onChange={onInputChange} />
                  </div>
                </div>
  
                {/* Informations de Prévoyance Sociale */}
                <div className="details">
                  <h1 className='title'>Informations de Prévoyance Sociale:</h1>
                  <div className="detailItem">
                    <label>Numéro d'affiliation CNOPS :</label>
                    <input type="text" name="infoPrevoyanceSociale.numAffiliationCNOPS" value={user.infoPrevoyanceSociale.numAffiliationCNOPS} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Numéro d'immatriculation CNOPS :</label>
                    <input type="text" name="infoPrevoyanceSociale.numImmatriculationCNOPS" value={user.infoPrevoyanceSociale.numImmatriculationCNOPS} onChange={onInputChange} />
                  </div>
                  <div className="detailItem">
                    <label>Date d'affiliation CNOPS :</label>
                    <input type="date" name="infoPrevoyanceSociale.dateAffiliationCNOPS" value={user.infoPrevoyanceSociale.dateAffiliationCNOPS} onChange={onInputChange} />
                  </div>
                </div>
  
                {/* Sanctions */}
                <div className="details">
                  <h1 className='title'>Sanctions:</h1>
                  {user.sanctions.map((sanction, index) => (
                    <div key={index} className="detailItem">
                      <label>Sanction :</label>
                      <input type="text" name="sanction" value={sanction.sanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                      <label>Nature :</label>
                      <input type="text" name="nature" value={sanction.nature} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                      <label>Motif :</label>
                      <input type="text" name="motif" value={sanction.motif} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                      <label>Date de sanction :</label>
                      <input type="date" name="dateSanction" value={sanction.dateSanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                      <button type="button" onClick={() => handleRemoveItem("sanctions", index)}>Supprimer</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddItem("sanctions")}>Ajouter une sanction</button>
                </div>
  
                <button type="submit" className="submitButton">Mettre à jour</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
};

export default Form;
