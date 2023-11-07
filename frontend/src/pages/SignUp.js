import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogOut } from "../redux/reducers/userAuthSlice";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "../styles/pages/SignUp.css";

export default function SignUp() {
  // Initialisation des variables d'état
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch(); // est utilisé pour obtenir la fonction "dispatch"
  const navigate = useNavigate(); // est utilisé pour obtenir la fonction de navigation "navigate"

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/signup", {
        // Utilisation de fetch pour envoyer une requête POST
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Contient les données de l'utilisateur (e-mail, mot de passe, prénom, nom, nom d'utilisateur) encodées en JSON
          email,
          password,
          firstName,
          lastName,
          userName,
        }),
      });

      if (!response.ok) {
        // Vérification de la réponse. Si la réponse n'est pas OK, l'inscription a échoué, et une erreur est indiquer
        throw new Error("Inscription échouée");
      }
      dispatch(setLogOut()); // Déclenche l'action "setLogOut" pour déconnecter tout utilisateur déjà connecté
      setConfirmSuccess(true); // Met à jour l'état pour indiquer le succès de la confirmation d'inscription
      setSubmitSuccess(true); // Met à jour l'état pour indiquer le succès de l'inscription
      setError(null); // Réinitialise l'état d'erreur pour indiquer qu'il n'y a pas d'erreur
    } catch (err) {
      console.error(err); // message d'erreur console
      setError("Erreur lors de l'inscription"); // message d'erreur pour l'utilisateur
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign Up</h1>
        <form onSubmit={SignUp}>
          <TextInput
            className="input-wrapper"
            label="E-mail"
            id="email"
            type="text"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            className="input-wrapper"
            label="Password"
            id="password"
            type="text"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            className="input-wrapper"
            label="FirstName"
            id="firstName"
            type="text"
            autoComplete="given-name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            className="input-wrapper"
            label="LastName"
            id="lastName"
            type="text"
            autoComplete="family-name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            className="input-wrapper"
            label="UserName"
            id="userName"
            type="text"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          {submitSuccess ? (
            <Button
              className="sign-in-button"
              type="button"
              onClick={() => navigate("/sign-in")}
            >
              Aller sur la page de connexion
            </Button>
          ) : (
            <Button className="sign-in-button" type="submit">
              Sign Up
            </Button>
          )}
          {error && <p className="error-message">{error}</p>}
          {confirmSuccess && (
            <div className="confirm-success">
              <p>Vous êtes inscrit avec succès. Veuillez vous connecter.</p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
