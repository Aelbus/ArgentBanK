import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditProfile } from "../redux/reducers/profileSlice";
import TextInput from "./TextInput";
import Button from "./Button";
import "../styles/components/EditButton.css";

export default function EditButton() {
  //initialisation des variables d'etat
  const token = useSelector((state) => state.userAuth.token); //extrait du store via useSelector et représente le jeton d'authentification de l'utilisateur
  const profile = useSelector((state) => state.profile); //extrait du store Redux via useSelector et contient les détails du profil de l'utilisateur
  const [isEditing, setIsEditing] = useState(false); //est un état local qui gère si l'utilisateur est en train de modifier son nom d'utilisateur
  const [newUserName, setNewUserName] = useState(profile.userName); //contient le nouveau nom d'utilisateur en cours de modification
  const [error, setError] = useState(""); // utilisé pour stocker les éventuels messages d'erreur

  const dispatch = useDispatch();

  useEffect(() => {
    //Utilisé pour mettre à jour newUserName chaque fois que profile.userName change
    setNewUserName(profile.userName);
  }, [profile.userName]);

  const editUserName = async (e) => {
    e.preventDefault(); //  empêche le comportement par défaut d'un événement
    if (!newUserName) {
      // // Vérifie si le champ du nouveau nom d'utilisateur est vide
      setError("The field cannot be empty."); // Définit un message d'erreur
      return;
    }
    try {
      const response = await fetch(
        // Effectue une requête de type PUT
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: newUserName }), // Ajoute le jeton d'authentification dans l'en-tête
        }
      );
      if (!response) {
        // Erreur si réponse vide
        throw new Error("Échec de la mise à jour du nom d'utilisateur");
      }
      dispatch(setEditProfile(newUserName)); // Met à jour le profil dans le store Redux avec le nouveau nom d'utilisateur
      setIsEditing(false); // Passe le mode d'édition à faux, indiquant que l'édition est terminée
    } catch (err) {
      console.log(err); // En cas d'erreur, affiche l'erreur dans la console
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextInput
            label="Username "
            id="username"
            type="text"
            autoComplete="username"
            onChange={(e) => {
              setNewUserName(e.target.value); // Met à jour le nouveau nom d'utilisateur
              setError(""); // Réinitialise le message d'erreur
            }}
            value={newUserName} // Valeur du champ de saisie du nom d'utilisateur
          />
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Affiche un message d'erreur s'il y en a un */}
          <br />
          <Button className="edit-button" onClick={editUserName}>
            Save
          </Button>
        </div>
      ) : (
        <Button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit UserName
        </Button>
      )}
    </div>
  );
}
