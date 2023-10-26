import './styles/base/App.css'
import React from "react";
import Header from "./components/header";
import Router from "./router.js";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
