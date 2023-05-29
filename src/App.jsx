import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomeProtected from "./components/HomeProtected";
import Footer from "./layout/Footer";
import PokemonsFav from "./components/PokemonsFav";


function App() {
  
  
  return (
    <div className="App">
      <Routes>

        {/* ruta para proteger al ingresar nombre */}
        <Route element={<HomeProtected/>}>
           <Route path="/" element={<Home />} />
        </Route>

         {/* ruta para proteger  */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<Pokemon />} />
          <Route path="pokemonsfav/:id" element={<PokemonsFav/>}/>
        </Route>
      </Routes>

      {/* <Footer/> */}

    </div>
  );
}

export default App;
