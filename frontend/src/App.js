import "./styles/App.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Router from "./router.js";
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
