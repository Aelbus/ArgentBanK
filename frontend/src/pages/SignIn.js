import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogIn } from "../redux/reducers/userAuthSlice";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import "../styles/pages/SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState(""); // Stocke l'adresse e-mail saisie
  const [password, setPassword] = useState(""); // Stocke le mot de passe saisi
  const [checkBox, setCheckBox] = useState(false); // Stocke l'état de la case à cocher "Remember me"

  const navigate = useNavigate(); // utilisé pour obtenir la fonction de navigation "navigate"
  const dispatch = useDispatch(); // utilisé pour obtenir la fonction "dispatch" afin de déclencher des actions Redux

  const fetchLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        // Utilisation de fetch pour envoyer une requête POST
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Contient les données de l'utilisateur (adresse e-mail et mot de passe) encodées en JSON
      });
      const data = await response.json(); // Attend la réponse de la requête
      const token = data.body.token; // Récupération du token à partir des données de la réponse
      dispatch(setLogIn({ token })); // action qui met à jour le store Redux avec le token récupéré lors de la connexion
      navigate("/user"); // redirige l'utilisateur vers la page "/user" après une connexion réussie
    } catch (err) {
      console.log(err); // en cas d'erreur, message dans la console
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={fetchLogIn}>
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
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            className="input-remember"
            label="Remember me"
            id="remember-me"
            type="checkbox"
            onChange={() => setCheckBox(!checkBox)}
          />
          <Button className="sign-in-button" type="submit">
            Sign In
          </Button>
        </form>
      </section>
    </main>
  );
}
