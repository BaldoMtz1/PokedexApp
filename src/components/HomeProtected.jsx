import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const HomeProtected = () => {

  const {nameTrainer} = useSelector(state => state)
  if(nameTrainer){
    return <Navigate to="/pokedex"/>
  }else{
    return <Outlet/>
  }
}

export default HomeProtected