import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/PokemonCard.css";
import { useNavigate } from "react-router-dom";
import "boxicons";
import Swal from "sweetalert2";

const PokemonCard = ({ pokemon, addToFavorites }) => {
  // console.log(pokemon);

  const [dataPokemon, setdataPokemon] = useState();
  const navigate = useNavigate();

    // console.log(dataPokemon)

  const handleClickPokemon = () => {
    navigate(`/pokedex/${dataPokemon?.id}`);
  };

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => setdataPokemon(res.data))
      .catch((err) => console.log(err.data));
  }, []);

  const types = dataPokemon?.types.map((type) => type.type.name).join(" / ");

  //? funcion que agrega un pokemon a favoritos

  const handleAddToFavorites = (e) => {
    e.preventDefault()
    e.stopPropagation()

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Congratulations, you caught a Pokémon!',
      showConfirmButton: false,
      timer: 2000
    })
    
    const pokeInfo = {
      name: dataPokemon?.name, 
      img: dataPokemon?.sprites.other["official-artwork"].front_default

    }

    addToFavorites(pokeInfo)
   
  }


  return (
    <article
      key={pokemon.url}
      onClick={handleClickPokemon}
      className={`pokeCard border-${dataPokemon?.types[0].type.name}`}
    >
      <div className="border_int">
        <section
          className={`pokeCard-header bg-lg-${dataPokemon?.types[0].type.name}`}
        >
          {/* <a onClick={handleFavPoke}  href=""> <box-icon type='solid' name='heart-circle'></box-icon></a> */}
          {/* <button className="btn_fav" onClick={handleAddToFavorites}>AddFav</button> */}
          <img onClick={handleAddToFavorites} className="btn_fav" src={"/img/pokeball.png"} alt="" />
        </section>
        <section className="pokeCard-content">
          <img
            className="pokeCard-img"
            src={dataPokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />

          <h3 className="pokeCard-name">{pokemon.name}</h3>
          <p className="pokeCard-types">{types}</p>
          <p className="pokeCard-types_title">Type</p>
          <hr />
          <section className="pokeCard-stats">
            {dataPokemon?.stats.map((stat) => (
              <div key={stat.stat.url} className="pokeCard-stat">
                <p className="pokeCard-stat_name">{stat.stat.name}</p>
                <p className="pokeCard-stat_value">{stat.base_stat}</p>
              </div>
            ))}
          </section>
        </section>
      </div>
    </article>
  );
};

export default PokemonCard;
