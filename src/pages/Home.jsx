import React from "react";
import HomeForm from "../components/HomeForm";
import "./styles/Home.css"
import Footer from "../layout/Footer";


const Home = () => {
  return (
    <main className="home">
      
      <img className="home-img" src="/img/img_pokedex.png" alt="" />
      <h2 className="home-title">Hi, trainer!</h2>
      <p className="home-text">Give me your name to start</p>
      <HomeForm />

      <Footer/>

    </main>
  );
};

export default Home;
