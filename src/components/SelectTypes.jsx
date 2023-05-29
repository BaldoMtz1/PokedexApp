import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SelectTypes = ({setSelectType}) => {

  const [pokeTypes, setpokeTypes] = useState()
  
  console.log(pokeTypes)

  useEffect(()=> {
    const URL = `https://pokeapi.co/api/v2/type/`
    axios.get(URL)
      .then(res => setpokeTypes(res.data.results))
      .catch(err => console.log(err))

  },[])


  const handleChange =(e) => {
    setSelectType(e.target.value)

  }


  return (
    <select className='select-type' onChange={handleChange}>
       <option value="allPokemons">All pokemons</option>
       {
        pokeTypes?.map(type => (
          <option key={type.url} value={type.url}>{type.name}</option>

        ))
       }
    </select>
  )
}

export default SelectTypes