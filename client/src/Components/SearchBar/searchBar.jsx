import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { searchByName,getPokemons} from "../../Actions/index";
import './searchBar.css'
export default function SearchBar() {
    const dispatch=useDispatch()
    const[name,setName]=useState('')
    function handleInputChange(e){
      e.preventDefault()
      setName(e.target.value)
      console.log(e)
    }
    function handleSubmit(e){
        e.preventDefault()
        if (name!==null) {
            dispatch(searchByName(name))
        }
        else{
            alert("No hay resultados")
            dispatch(getPokemons)

        }
        
    }
    return(
        <div>
        <input onChange={(e)=>handleInputChange(e)} value={name}  type="text"  placeholder="Buscar.."/>
        <button className="ButtonSearch"  onClick={(e)=>handleSubmit(e)}  type="submit">Buscar</button>
        </div>
    )
}