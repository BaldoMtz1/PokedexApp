import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/pokemon.css"

const Pokemon = () => {

  const [hasError, sethasError] = useState(false)

  const { id } = useParams();
  
  const [dataPokemon, setDataPokemon] = useState();

  const getPercentBarProgress = (valueStat) => {

    const maxValue = 150
    return `${(valueStat * 100) / maxValue}%`


  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // console.log(dataPokemon);

    axios.get(URL)
      .then((res) => setDataPokemon(res.data))
      .catch((err) => {
        sethasError(true)
        console.log(err)
      });
  }, [id]);

  if(hasError){

   return <h1>Pokemon whit name {id} not found</h1>

  }


  const navigate = useNavigate()
  

  const handleClickReturn = () => {
    console.log("click")
    navigate("/pokedex")
  }

  return (
    <main className="Pokemon">

      <img onClick={handleClickReturn} className="arrow_return" src={"./img/back.png"} alt="" />
      
      <article className="pokemonId">

        <section className={`pokemonId-header bg-lg-${dataPokemon?.types[0].type.name}`}></section>
          <img
            className="pokemonId-img"
            src={dataPokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
          {/* <h3 className="pokemonId-id">{`#${id}`}</h3> */}
          <h2 className="pokemonId-name">{dataPokemon?.name}</h2>

          <section className="pokemonId-features">
            <div className="pokemonId-feature">
              <p className="pokemonId-feature_name">Weigth</p>
              <p className="pokemonId-feature_value">{dataPokemon?.weight}</p>
            </div>

            <div className="pokemonId-feature">
              <p className="pokemonId-feature_name">Heigh</p>
              <p className="pokemonId-feature_value">{dataPokemon?.height}</p>
            </div>
          </section>

          <section className="pokemonId-info">
            <div className="pokemonId-info_container">
              <h4 className="pokemonId-info_title">Type</h4>
              <div className="pokemonId-info_data">
                {dataPokemon?.types.map((type) => (
                  <p className={`pokemonId-info_value bg_${type.type.name}`} key={type.type.name}>{type.type.name}</p>
                ))}
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>

            <div className="pokemonId-info_container">
              <h4 className="pokemonId-info_title">Abilities</h4>
              <div className="pokemonId-info_data">
                {dataPokemon?.abilities.map((ability) => (
                  <p className="pokemonId-info_value" key={ability.ability.name}>{ability.ability.name}</p>
                ))}
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </section>

          <section className="pokemonId-stats">
            <h3 className="pokemonId-stats_title">Stats</h3>

            <div className="pokemonId-stat_container">

              {
                dataPokemon?.stats.map((stat) => (
                  <div key={stat.stat.url} className="pokemonId-stat">
                    <div className="pokemonId-stat_header">
                      <p className="pokemonId-stat_name">{stat.stat.name}</p>
                      <p className="pokemonId-stat_value">{stat.base_stat}/150</p>
                    </div>

                    <div className="pokemonId-stat_bar">
                      <div style={{width:getPercentBarProgress(stat.base_stat)}} className="pokemonId-stat_bar_progress"></div>
                    </div>
                  </div>
                ))
              
              }
            </div>
          </section>
        
      </article>
    </main>
  );
};

export default Pokemon;
