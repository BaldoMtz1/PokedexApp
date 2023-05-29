import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainerGlobal } from "../store/slices/nameTrainer.slice";
import "./styles/HomeForm.css"

const HomeForm = () => {

  const dispach = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const nameTraner = e.target.nameTrainer.value.trim()  
    
    dispach(setNameTrainerGlobal(nameTraner))
  }

    
    


  return (
    <form className="home-form" onSubmit={handleSubmit}>
      <input required className="home-input" type="text" id="nameTrainer" placeholder="Your name" />
      <button className="home-btn">Start</button>
    </form>
  );
};

export default HomeForm;
