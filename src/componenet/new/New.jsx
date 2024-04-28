import React, { useState } from 'react';
import "./new.scss";
import Sidebar from "../../composantes/sidebar/Sidebar";
import Navbar from "../../composantes/navbar/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const New = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      conjoints: [
        {
          cinConjoint: "",
          dateMariage: "",
          dateDivorce: "",
          nomConjoint: "",
          dateNaissanceConjoint: "",
          fonctionConjoint: ""
        }
      ],
      enfants: [
        {
          prenom: "",
          nomMere: "",
          dateNaissance: ""
        }
      ]
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
      statutAdministratif: ""
    },
    infoPrevoyanceSociale: {
      numAffiliationCNOPS: "",
      numImmatriculationCNOPS: "",
      dateAffiliationCNOPS: ""
    },
    organismesSociales: {
      numAffiliationFondationHassan2: ""
    },
    infoRetraite: {
      organismeRetraite: "",
      numeroAffiliationRetraite: "",
      dateAffiliationRetraite: ""
    },
    infoAssurance: {
      organismeAssurance: "",
      numeAffiliationAssurance: ""
    },
    diplomes: [
      {
        intitule: "",
        specialite: "",
        dateObtention: "",
        etablissement: ""
      }
    ],
    mouvements: [
      {
        administration: "",
        dateDebut: "",
        dateFin: ""
      }
    ],
    affectations: [
      {
        dateAffectation: "",
        poste: ""
      }
    ],
    sanctions: [
      {
        sanction: "",
        nature: "",
        motif: "",
        dateSanction: ""
      }
    ]
    ,
    documentsPiecesJointes:
     [
        {
            nom: "",
            cheminStockage:"",
            type:"",
            sousDossier: 
         {
            nomSousDoussier: ""
         }
        }
     ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      let newFormData = { ...formData };
      let currentField = newFormData;
      keys.forEach((key, index) => {
        if (index < keys.length - 1) {
          currentField = currentField[key];
        } else {
          currentField[key] = value;
        }
      });
      setFormData(newFormData);
    }
  };

  const handleArrayChangeFam = (index, name, e) => {
    const { value } = e.target;
    const newArray = [...formData.infoFamiliales[name]];
    newArray[index][e.target.name] = value;
    setFormData({
      ...formData,
      [name]: newArray,
      infoFamiliales: {
        ...formData.infoFamiliales,
        [name]: newArray
      }
    });
  };

  const handleAddItemFam = (name) => {
    setFormData({
      ...formData,
      infoFamiliales: {
        ...formData.infoFamiliales,
        [name]: [...formData.infoFamiliales[name], {}]
      }
    });
  };

  const handleRemoveItemFam = (name, index) => {
    const newArray = [...formData.infoFamiliales[name]];
    newArray.splice(index, 1);
    setFormData({
      ...formData,
      infoFamiliales: {
        ...formData.infoFamiliales,
        [name]: newArray
      }
    });
  };
  const handleArrayChange = (index, name, e) => {
    const { value } = e.target;
    const newArray = [...formData[name]];
    newArray[index][e.target.name] = value;
    setFormData({ ...formData, [name]: newArray });
  };



  const handleAddItem = (name) => {
    setFormData({ ...formData, [name]: [...formData[name], {}] });
  };

  const handleRemoveItem = (name, index) => {
    const newArray = [...formData[name]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [name]: newArray });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/info/add', formData);
      console.log(res.data);
      alert('Données envoyées avec succès !');
      navigate("/users");
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      alert('Une erreur s\'est produite lors de l\'envoi des données. Veuillez réessayer.');
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className='bottom'>
          <form className="row g-3" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Ajouter un nouveau utilisateur</h1>
            <h1 className='title'>Information Personnelle:</h1>
            <div className="col-md-4">
              <label className="form-label">Prénom:</label>
              <input className="form-control" type="text" name="prenom" value={formData.prenom} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nom:</label>
              <input className="form-control" type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">CIN:</label>
              <input className="form-control" type="text" name="cin" value={formData.cin} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sexe:</label>
              <select className="form-select" name="sexe" value={formData.sexe} onChange={handleInputChange}>
                <option value="">Sélectionnez le sexe</option>
                <option value="feminin">Féminin</option>
                <option value="masculin">Masculin</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date de naissance:</label>
              <input className="form-control" type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Lieu de naissance:</label>
              <input className="form-control" type="text" name="lieuNaissance" value={formData.lieuNaissance} onChange={handleInputChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Adresse:</label>
              <input className="form-control" type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Numéro de téléphone:</label>
              <input className="form-control" type="text" name="numeroTel" value={formData.numeroTel} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email:</label>
              <input className="form-control" type="text" name="email" value={formData.email} onChange={handleInputChange} />
            </div>

            {/* Informations Familiales */}

            <h1 className='title'>Informations Familiales:</h1>
            <div className="col-md-4">
              <label className="form-label">Nom de père :</label>
              <input className="form-control" type="text" name="infoFamiliales.nomPere" value={formData.infoFamiliales.nomPere} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Nom de la mère:</label>
              <input className="form-control" type="text" name="infoFamiliales.nomMere" value={formData.infoFamiliales.nomMere} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Situation Familiale:</label>
              <select className="form-select" name="infoFamiliales.situationFamiliale" value={formData.infoFamiliales.situationFamiliale} onChange={handleInputChange}>
                <option value="">Sélectionnez la Situation Familiale</option>
                <option value="celibataire ">Célibataire </option>
                <option value="marie">Marié(e)</option>
                <option value="divorce">Divorcé(e)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Date de mariage:</label>
              <input className="form-control" type="date" name="infoFamiliales.dateMariage" value={formData.infoFamiliales.dateMariage} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nom du conjoint :</label>
              <input className="form-control" type="text" name="infoFamiliales.nomConjoint" value={formData.infoFamiliales.nomConjoint} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">CIN du conjoint :</label>
              <input className="form-control" type="text" name="infoFamiliales.cinConjoint" value={formData.infoFamiliales.cinConjoint} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Date de naissance du conjoint :</label>
              <input className="form-control" type="date" name="infoFamiliales.dateNaissanceConjoint" value={formData.infoFamiliales.dateNaissanceConjoint} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Fonction du conjoint :</label>
              <input className="form-control" type="text" name="infoFamiliales.fonctionConjoint" value={formData.infoFamiliales.fonctionConjoint} onChange={handleInputChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nombre d'enfants :</label>
              <input className="form-control" type="text" name="infoFamiliales.nombreEnfants" value={formData.infoFamiliales.nombreEnfants} onChange={handleInputChange} />
            </div>

            <h1 className='title'>Les Conjoints:</h1>
            {formData.infoFamiliales.conjoints.map((conjoint, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-2">
                  <label className="form-label text-primary small">CIN du Conjoint {index + 1} :</label>
                  <input className="form-control" type="text" name="cinConjoint" value={conjoint.cinConjoint} onChange={(e) => handleArrayChangeFam(index, "conjoints", e)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-primary small">Date de Mariage :</label>
                  <input className="form-control" type="date" name="dateMariage" value={conjoint.dateMariage} onChange={(e) => handleArrayChangeFam(index, "conjoints", e)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-primary small">Date de Divorce :</label>
                  <input className="form-control" type="date" name="dateDivorce" value={conjoint.dateDivorce} onChange={(e) => handleArrayChangeFam(index, "conjoints", e)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-primary small">Nom du Conjoint :</label>
                  <input className="form-control" type="text" name="nomConjoint" value={conjoint.nomConjoint} onChange={(e) => handleArrayChangeFam(index, "conjoints", e)} />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItemFam("conjoints", index)}>Supprimer</button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-outline-success" onClick={() => handleAddItemFam("conjoints")}>Ajouter un conjoint</button>
              </div>
            </div>


            {/* Informations Familiales: Les Enfants */}
            <h1 className='title'>Les Enfants:</h1>
            {formData.infoFamiliales.enfants.map((enfant, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-2">
                  <label className="form-label text-primary small">Prénom de l'enfant :</label>
                  <input className="form-control" type="text" name="prenom" value={enfant.prenom} onChange={(e) => handleArrayChangeFam(index, "enfants", e)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-primary small">Nom de la mère :</label>
                  <input className="form-control" type="text" name="nomMere" value={enfant.nomMere} onChange={(e) => handleArrayChangeFam(index, "enfants", e)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label text-primary small">Date de naissance :</label>
                  <input className="form-control" type="date" name="dateNaissance" value={enfant.dateNaissance} onChange={(e) => handleArrayChangeFam(index, "enfants", e)} />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItemFam("enfants", index)}>Supprimer</button>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-outline-success" onClick={() => handleAddItemFam("enfants")}>Ajouter un enfant</button>
              </div>
            </div>






            {/* Informations Administratives */}
            <h1 className='title'>Informations Administratives:</h1>
            <div class="col-md-4">
              <label class="form-label" >PPR :</label>
              <input class="form-control" type="text" name="infoAdministratives.ppr" value={formData.infoAdministratives.ppr} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >PB :</label>
              <input class="form-control" type="text" name="infoAdministratives.pb" value={formData.infoAdministratives.pb} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Date de recrutement :</label>
              <input class="form-control" type="date" name="infoAdministratives.dateRecrutement" value={formData.infoAdministratives.dateRecrutement} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Diplôme de recrutement :</label>
              <input class="form-control" type="text" name="infoAdministratives.diplomeRecrutement" value={formData.infoAdministratives.diplomeRecrutement} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Administration de recrutement :</label>
              <input class="form-control" type="text" name="infoAdministratives.administrationRecrutement" value={formData.infoAdministratives.administrationRecrutement} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Date de titularisation :</label>
              <input class="form-control" type="date" name="infoAdministratives.dateTitularisation" value={formData.infoAdministratives.dateTitularisation} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Grade :</label>
              <input class="form-control" type="text" name="infoAdministratives.grade" value={formData.infoAdministratives.grade} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Echelle :</label>
              <input class="form-control" type="text" name="infoAdministratives.echelle" value={formData.infoAdministratives.echelle} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Echelon :</label>
              <input class="form-control" type="text" name="infoAdministratives.echelon" value={formData.infoAdministratives.echelon} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Indice :</label>
              <input class="form-control" type="text" name="infoAdministratives.indice" value={formData.infoAdministratives.indice} onChange={handleInputChange} />
            </div>
            <div class="col-md-4">
              <label class="form-label" >Statut administratif :</label>
              <input class="form-control" type="text" name="infoAdministratives.statutAdministratif" value={formData.infoAdministratives.statutAdministratif} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Situation administrative :</label>
              <select className="form-select" name="infoAdministratives.situationAdministrative" value={formData.infoAdministratives.situationAdministrative} onChange={handleInputChange}>
                <option value="">Sélectionnez la Situation administrative </option>
                <option value="en_fonction ">en fonction </option>
                <option value="detache_entrant">detaché entrant</option>
                <option value="detache_sortant">detaché sortant</option>
              </select>
            </div>


            {/* Informations de Prévoyance Sociale */}
            <h1 className='title'>Informations de Prévoyance Sociale:</h1>
            <div className="col-md-3">
              <label className="form-label">Organisme de prévoyance sociale :</label>
              <select className="form-select" name="infoPrevoyanceSociale.organismePrevoyanceSociale" value={formData.infoPrevoyanceSociale.organismePrevoyanceSociale} onChange={handleInputChange}>
                <option value="">Sélectionnez  </option>
                <option value="MutuelleGeneral "> Mutuelle Général </option>
                <option value="OMFAM">OMFAM</option>
                <option value="MGAP">MGAP</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label" >Numéro d'affiliation CNOPS :</label>
              <input class="form-control" type="text" name="infoPrevoyanceSociale.numAffiliationCNOPS" value={formData.infoPrevoyanceSociale.numAffiliationCNOPS} onChange={handleInputChange} />
            </div>
            <div class="col-md-3">
              <label class="form-label" >Numéro d'immatriculation CNOPS :</label>
              <input class="form-control" type="text" name="infoPrevoyanceSociale.numImmatriculationCNOPS" value={formData.infoPrevoyanceSociale.numImmatriculationCNOPS} onChange={handleInputChange} />
            </div>
            <div class="col-md-3">
              <label class="form-label" >Date d'affiliation CNOPS :</label>
              <input class="form-control" type="date" name="infoPrevoyanceSociale.dateAffiliationCNOPS" value={formData.infoPrevoyanceSociale.dateAffiliationCNOPS} onChange={handleInputChange} />
            </div>

            <h1 className='title'>Informations Sociales:</h1>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label ">Numéro d'affiliation Fondation Hassan II :</label>
                <input className="form-control" type="text" name="organismesSociales.numAffiliationFondationHassan2" value={formData.organismesSociales.numAffiliationFondationHassan2} onChange={handleInputChange} />
              </div>
            </div>

            <h1 className='title'>Informations Retraite:</h1>
            <div className="row mb-3">
              <div className="col-md-4">
              <label className="form-label ">Organisme de retraite :</label>
              <select className="form-select" name="infoRetraite.organismeRetraite" value={formData.infoRetraite.organismeRetraite} onChange={handleInputChange}>
                <option value="">Sélectionnez </option>
                <option value="CMR">CMR</option>
                <option value="RCAR">RCAR</option>
              </select>
              </div>
              <div className="col-md-4">
                <label className="form-label ">Numéro d'affiliation à la retraite :</label>
                <input className="form-control" type="text" name="infoRetraite.numeroAffiliationRetraite" value={formData.infoRetraite.numeroAffiliationRetraite} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label ">Date d'affiliation à la retraite :</label>
                <input className="form-control" type="date" name="infoRetraite.dateAffiliationRetraite" value={formData.infoRetraite.dateAffiliationRetraite} onChange={handleInputChange} />
              </div>
            </div>

            <h1 className='title'>Informations Assurance:</h1>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label ">Organisme d'assurance :</label>
                <input className="form-control" type="text" name="infoAssurance.organismeAssurance" value={formData.infoAssurance.organismeAssurance} onChange={handleInputChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label ">Numéro d'affiliation à l'assurance :</label>
                <input className="form-control" type="text" name="infoAssurance.numeAffiliationAssurance" value={formData.infoAssurance.numeAffiliationAssurance} onChange={handleInputChange} />
              </div>
            </div>

            {/* Sanctions */}
            <div className="details">
              <h1 className='title'>Sanctions:</h1>
              {formData.sanctions.map((sanction, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-2">
                  <label class="form-label" >Sanction :</label>
                  <input class="form-control" type="text" name="sanction" value={sanction.sanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                  <label class="form-label" >Nature :</label>
                  <input class="form-control" type="text" name="nature" value={sanction.nature} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                  <label class="form-label" >Motif :</label>
                  <input class="form-control" type="text" name="motif" value={sanction.motif} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2">
                  <label class="form-label" >Date de sanction :</label>
                  <input class="form-control" type="date" name="dateSanction" value={sanction.dateSanction} onChange={(e) => handleArrayChange(index, "sanctions", e)} />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItem("sanctions", index)}>Supprimer</button>
                </div>
                </div>
              ))}
            <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-outline-success"  onClick={() => handleAddItem("sanctions")}>Ajouter une sanction</button>
            </div>
            </div>
            </div>

            {/* Diplômes */}
            <div className="details">
              <h1 className='title'>Diplômes:</h1>
              {formData.diplomes.map((diplome, index) => (
                <div key={index} className="row mb-3">
                   <div className="col-md-2">
                  <label className="form-label" >Intitulé :</label>
                  <input class="form-control" type="text" name="intitule" value={diplome.intitule} onChange={(e) => handleArrayChange(index, "diplomes", e)} />
                  </div>
                  <div className="col-md-2">
                  <label className="form-label" >Specialité :</label>
                  <input class="form-control" type="text" name="specialite" value={diplome.specialite} onChange={(e) => handleArrayChange(index, "diplomes", e)} />
                  </div>
                  <div className="col-md-2">
                  <label className="form-label" >Date d'obtention :</label>
                  <input class="form-control" type="date" name="dateObtention" value={diplome.dateObtention} onChange={(e) => handleArrayChange(index, "diplomes", e)} />
                  </div>
                  <div className="col-md-3">
                  <label>Etablissement :</label>
                  <input class="form-control" type="text" name="etablissement" value={diplome.etablissement} onChange={(e) => handleArrayChange(index, "diplomes", e)} />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItem("diplomes", index)}>Supprimer</button>
                </div>
                </div>
              ))}
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-outline-success"  onClick={() => handleAddItem("diplomes")}>Ajouter un diplôme</button>
            </div>
            </div>
            </div>

            {/* Mouvements */}
            <div className="details">
              <h1 className='title'>Mouvements:</h1>
              {formData.mouvements.map((mouvement, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Administration :</label>
                    <input class="form-control" type="text" name="administration" value={mouvement.administration} onChange={(e) => handleArrayChange(index, "mouvements", e)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Date de début :</label>
                    <input class="form-control" type="date" name="dateDebut" value={mouvement.dateDebut} onChange={(e) => handleArrayChange(index, "mouvements", e)} />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Date de fin :</label>
                    <input class="form-control" type="date" name="dateFin" value={mouvement.dateFin} onChange={(e) => handleArrayChange(index, "mouvements", e)} />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItem("mouvements", index)}>Supprimer</button>
                  </div>

                </div>
              ))}
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-outline-success" onClick={() => handleAddItem("mouvements")}>Ajouter un mouvement</button>
                </div>
              </div>
            </div>

            {/* Affectations */}
            <div className="details">
              <h1 className='title'>Affectations:</h1>
              {formData.affectations.map((affectation, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-3">
                    <label class="form-label">Entité :</label>
                    <select className="form-select" name="entite" value={affectation.entite} onChange={(e) => handleArrayChange(index, "affectations", e)}>
                      <option value="">Sélectionnez  </option>
                      <option value="divisions">divisions</option>
                      <option value="cabinet">cabinet</option>
                      <option value="cercles">cercles</option>
                      <option value="secretariat_generale">secrétariat générale</option>
                      <option value="service">service</option>
                      <option value="bureau">bureau</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label class="form-label">Date d'affectation :</label>
                    <input class="form-control" type="date" name="dateAffectation" value={affectation.dateAffectation} onChange={(e) => handleArrayChange(index, "affectations", e)} />
                  </div>
                  <div className="col-md-3">
                    <label class="form-label">Poste :</label>
                    <input class="form-control" type="text" name="poste" value={affectation.poste} onChange={(e) => handleArrayChange(index, "affectations", e)} />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItem("affectations", index)}>Supprimer</button>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-md-12">
                  <button type="button" className="btn btn-outline-success" onClick={() => handleAddItem("affectations")}>Ajouter une affectation</button>
                </div>
              </div>
            </div>

            <div className="details">
              <h1 className='title'>Documents et pièces jointes:</h1>
              {formData.documentsPiecesJointes.map((document, index) => (
                <div key={index} className="row mb-3">
                  <div className="col-md-4">
                    <label>Nom :</label>
                    <input class="form-control" type="text" name="nom" value={document.nom} onChange={(e) => handleArrayChange(index, "documentsPiecesJointes", e)} />
                  </div>
                  <div className="col-md-4">
                    <label>Chemin de stockage :</label>
                    <input class="form-control" type="text" name="cheminStockage" value={document.cheminStockage} onChange={(e) => handleArrayChange(index, "documentsPiecesJointes", e)} />
                  </div>
                  <div className="col-md-3">
                    <label>Type :</label>
                    <input class="form-control" type="text" name="type" value={document.type} onChange={(e) => handleArrayChange(index, "documentsPiecesJointes", e)} />
                  </div>
                  <div className="col-md-3" >
                    <label>Sous dossier :</label>
                    <select className="form-select" name="sousDossier.nomSousDossier" value={document.sousDossier?.nomSousDossier} onChange={(e) => handleArrayChange(index, "documentsPiecesJointes", e)}>
                      <option value="">Sélectionnez  </option>
                      <option value="Dossier_familial">Dossier familial</option>
                      <option value="Dossier_administratif">Dossier administratif</option>
                      <option value="Doussier_prev_sociale">Doussier prev sociale</option>
                      <option value="Dossier_notations">Dossier notations</option>
                      <option value="Dossier_affectations">Dossier affectations</option>
                      <option value="Dossier_autorisations_absences">Dossier autorisations absences</option>
                      <option value="Dossier_Divers">Dossier Divers</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveItem("documentsPiecesJointes", index)}>Supprimer</button>
                  </div>
                </div>
              ))}  
              <div className="row">
              <div className="col-md-12">
                <button type="button" className="btn btn-outline-success" onClick={() => handleAddItem("documentsPiecesJointes")}>Ajouter un doussier</button>
              </div>
            </div>
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-danger  btn-lg">Ajouter fonctionnaire </button>
            </div>
            
</form>
        </div>
      </div>
    </div>
  )
}

export default New;
