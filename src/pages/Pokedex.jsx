import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListPokemon from "../components/ListPokemon";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Swal from "sweetalert2";
import SelectTypes from "../components/SelectTypes";
import PokemonsFav from "../components/PokemonsFav";
import "./styles/Pokedex.css";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const { nameTrainer } = useSelector((state) => state);
  const [selectType, setSelectType] = useState("allPokemons");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokeFavorites, setPokeFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  console.log(pokeFavorites); // info de poke

  useEffect(() => {
    if (selectType === "allPokemons") {
      const URL = "https://pokeapi.co/api/v2/pokemon/?limit=30";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(selectType)
        .then((res) => {
          const results = res.data.pokemon.map((result) => result.pokemon);
          setPokemons(results);
        })
        .catch((err) => console.log(err));
    }
  }, [selectType]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.pokemon.value.trim().toLowerCase();

    const matchingPokemon = pokemons.find((pokemon) => pokemon.name === name);

    console.log(matchingPokemon);

    if (matchingPokemon) {
      navigate(`/pokedex/${name}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pokemon not Found!",
      });
    }
  };

  const handleToggleFavorites = () => {

    if (pokeFavorites.length == 0) {

      Swal.fire({
        title: "Sorry!",
        text: "You don't have any favorite pokemons yet. Catch them now!",
        imageUrl: "./img/sad.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      setShowFavorites(!showFavorites);
    }
  };

  const addToFavorites = (pokemon) => {
    const isPokemonInFavorites = pokeFavorites.some(
      (favPokemon) => favPokemon.name === pokemon.name
    );

    if (!isPokemonInFavorites) {
      setPokeFavorites([...pokeFavorites, pokemon]);
    }
  };

  // Funcion para eliminar pokemons del estado "pokeFavorites"
 
  const handleRemoveFromFavorites = (pokemon) => {
    
    Swal.fire({
      title: 'Are you sure to release your pokemon?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        const updatedFavorites = pokeFavorites.filter(
          (favPokemon) => favPokemon.name !== pokemon.name
        );
       
        setPokeFavorites(updatedFavorites);
      }
    })
   
  };

  return (
    <main className="pokedex">
      <>
        <header className="pokedex_header">
          <div className="pokedex_container">
            <div>
              <p className="pokedex_text">
                Welcome <span>{nameTrainer}</span>, here you can find your
                favorite pokemon
              </p>
            </div>
            <div className="pokedex_container-btn">
              <button
                className="pokedex_btn"
                id="pokeFav"
                onClick={handleToggleFavorites}
              >
                {showFavorites ? "All Pokemons" : "see favorite pokemon"}
              </button>
            </div>
          </div>
        </header>

        {showFavorites ? (
          <PokemonsFav handleRemoveFromFavorites={handleRemoveFromFavorites} pokeFavorites={pokeFavorites} />
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-pokemon">
                <div className="form-pokemon_container">
                  <input
                    className="form-pokemon_inp"
                    id="pokemon"
                    type="text"
                    placeholder="Search a Pokémon..."
                  />
                  <button className="form-pokemon_btn">Search</button>
                </div>

                <div className="form-pokemon_selectype">
                  <SelectTypes setSelectType={setSelectType} />
                </div>
              </div>
            </form>

            <ListPokemon pokemons={pokemons} addToFavorites={addToFavorites} />
          </>
        )}
      </>
    </main>
  );
};

export default Pokedex;
