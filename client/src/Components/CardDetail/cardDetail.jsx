import React,{useEffect} from "react";
import {PokemonDetail} from "../../Actions/index"
import { useDispatch, useSelector } from "react-redux";

export default function CardDetail(id){
    const dispatch= useDispatch();
    
    const pokemonDetail=((state)=>state.detail)


    const { sprite, life, types, name, height, attack, defense, speed, weight } = pokemonDetail;


    useEffect(()=>{
        dispatch(PokemonDetail(id))
    },[dispatch,id])

    
   console.log(pokemonDetail)


    return(
        <div>Soy el card Detail!</div>
    )
}