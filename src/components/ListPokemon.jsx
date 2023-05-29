import React from 'react'
import PokemonCard from './PokemonCard'
import "./styles/ListPokemon.css"

const ListPokemon = ({pokemons, addToFavorites}) => {
  // console.log(pokemons.name);
  return (
    <ul className='listPokemons'>
      {
        pokemons?.map(pokemon => <PokemonCard addToFavorites={addToFavorites} key={pokemon.url} pokemon={pokemon}/> )
      }

    </ul>
  )
}

export default ListPokemon