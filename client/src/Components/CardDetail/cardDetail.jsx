import React, { useEffect } from "react";
import { PokemonDetail } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function CardDetail() {
  const { id } = useParams;
  const dispatch = useDispatch();
  let pokeDetail = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(PokemonDetail(id));
  }, [dispatch, id]);
  
  console.log("pokedetail es:", typeof pokeDetail);
  let detailPokemon=[]
  if (typeof pokeDetail==="object") {
    detailPokemon=[pokeDetail]
  }
  else{
      console.log("Es un array!")
  }
  console.log("Detail Pokemons es: " ,typeof detailPokemon)
  return (
    <div>
      Soy el card Detail!
      <div>
        {pokeDetail.length > 0 ? (
          <main>
            <div>
              <img src={pokeDetail.img} alt="no pokeimage" />
              <h1>Nombre:{pokeDetail[0].name}</h1>
              <h2>Ataque:{pokeDetail[0].Attack}</h2>
              <h2>Tipos:{pokeDetail[0].types}</h2>
              <h2>Velocidad:{pokeDetail[0].speed}</h2>
              <h2>Altura:{pokeDetail[0].height}</h2>
              <h2>Peso:{pokeDetail[0].weight}</h2>
            </div>
          </main>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  );
}
