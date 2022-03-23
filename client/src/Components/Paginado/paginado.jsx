import React from "react";
import "./paginado.css"
export default function Paginado({pokemonsPerPage,allPokemons,paginado}){
 const pageNumber=[]
 for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
     pageNumber.push(i);
     
 }
 return(
        <nav>
         <ul className="paginado">
             {
                 pageNumber&&pageNumber.map(number=>{
                  return(
                     <li className="liPaginado" key={number} >
                     <button className="pagButton" onClick={()=>paginado(number)}>{number}</button>
                     </li>
                 )})
             }
         </ul>
         </nav>
    
 )
}
