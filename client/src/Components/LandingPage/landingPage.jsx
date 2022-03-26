import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";
import "./landingPage.css";
import imgLanding from '../../image/PokeLanding.jpeg'
import PokeLogo from '../../image/PokemonLogo.png';
import PokeWelcome from '../../image/Bienvenido.png'
function landingPage() {
  return (
    <div className="bodyBG">
        <img className="imgLanding" src={imgLanding}  alt="No dataimg" />
      <img className='logoPoke' src={PokeLogo} alt='Pokelogo' height={200}></img> <br />
      <img src={PokeWelcome} alt="No data" height={80} />
      <div className="divLanding">
        <Link to="/home">
          <button className="button"><span>Ingresar </span></button>
        </Link>
        </div>
    </div>
  );
}
export default landingPage;