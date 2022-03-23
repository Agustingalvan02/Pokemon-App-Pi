import React from "react";
import {Link} from "react-router-dom";
import './navBar.css'


export default function NavBar(){
    return(
        <nav className="navStyle">
            <ul className="ulNav">
            <li className="liNav"><Link className="linkStyle" to='/home'>Home</Link></li>
            <li className="liNav"><Link className="linkStyle" to='/Pokemon'>Crear Pokémon!</Link></li>
            </ul>
        </nav>
    )
}