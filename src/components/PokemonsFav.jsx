import React from "react";
import "./styles/PokemonsFav.css"
import { useNavigate } from "react-router-dom";

const PokemonsFav = ({pokeFavorites, handleRemoveFromFavorites}) => {
  
  // const navigate = useNavigate()
  

  // const handleClickReturn = () => {
  //   console.log("click")
  //   navigate("/pokedex")
  // }
  
  return (

    <div className="poke_favorites">

      {/* <img onClick={handleClickReturn} className="arrow_return" src={"./img/back.png"} alt="" /> */}
      
      {pokeFavorites?.map((favority) => (
        <div key={favority.name} className="carFav">
          <img className="background-image" src="./img/pokeball.png" alt="" />
          <img className="overlay-image" src={favority.img} alt="" />
          <p className="poke_text">{favority.name}</p>
          <img onClick={() => handleRemoveFromFavorites(favority)} className="poke_delete" src={"/img/close.png"} alt="" />
        </div>
      ))}
    </div>
  );
};

export default PokemonsFav;
