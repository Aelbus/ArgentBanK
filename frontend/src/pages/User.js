import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGetProfile } from "../redux/reducers/profileSlice";
import Account from "../components/Account";
import EditButton from "../components/EditButton";

export default function User() {
  const token = useSelector((state) => state.userAuth.token); // Récupère le token d'authentification de l'utilisateur à partir du state "userAuth"
  const profile = useSelector((state) => state.profile); // Récupère les informations de profil stockées dans le state "profile"
  const dispatch = useDispatch();

  const fetchDataUser = useCallback(() => {
    // mémorise la fonction "fetchDataUser" et évite des rendus supplémentaires si les dépendances [dispatch, token] n'ont pas changé
    const fetchData = async () => {
      // effectue récupération des données depuis l'API
      try {
        const response = await fetch(
          // Utilisation de fetch pour envoyer une requête POST
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        dispatch(setGetProfile({ data })); // dispatch pour mettre à jour le store Redux avec les données récupérées du profil de l'utilisateur
      } catch (err) {
        console.log(err); // si erreur message console
      }
    };
    fetchData(); // / Appel de la fonction fetchData pour récupérer les données
  }, [dispatch, token]);

  useEffect(() => {
    fetchDataUser(); // Appel de "fetchDataUser" pour récupérer les données au chargement du composant et à chaque changement
  }, [fetchDataUser]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile.firstName + " " + profile.lastName + "!"}
        </h1>
        <EditButton />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
}
