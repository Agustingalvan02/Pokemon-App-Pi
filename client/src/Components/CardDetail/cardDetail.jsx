import React,{useEffect} from "react";
import {PokemonDetail} from "../../Actions/index"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router'
export default function CardDetail(props){
    const dispatch= useDispatch();
    
    useEffect(()=>{
        dispatch(PokemonDetail(props.match.params.id))
    },[dispatch,props.match.params.id])
    
    const detailPokemon=((state)=>state.detail)
    
    const { img, life, types, name, height, attack, defense, speed, weight } = detailPokemon;


   


    return(
        <div>Soy el card Detail!
            <img src={img} alt="No pokeimg" />
            <h1>{name}</h1>
            <ul>
               <li>{types}</li>
            </ul>
                <h2>Vida:{life}</h2>
                <h2>Ataque:{attack}</h2>
                <h2>Defensa:{defense}</h2>
                <h2>Velocidad:{speed}</h2>
                <h2>Altura:{height}</h2>
                <h2>Peso:{weight}</h2>
        </div>
    )
}