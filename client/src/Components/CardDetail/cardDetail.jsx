import React, { useEffect } from "react";
import { PokemonDetail } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function CardDetail(props) {

  const dispatch = useDispatch();
  let pokeDetail = useSelector((state) => state.detail);
  // let pokeArray=[]
  // pokeArray.push(pokeDetail)
  useEffect(() => {
    dispatch(PokemonDetail(props.match.params.id));
  }, [dispatch,props.match.params.id]);

  return (
    <div>
      Soy el card Detail!
      <div>
        {(pokeDetail) ?(
          <main>
            <div>
              <img src={pokeDetail.img} alt="no pokeimage" />
              <h1>Nombre:{pokeDetail.name}</h1>
              <h2>Ataque:{pokeDetail.attack}</h2>
              <h2>Tipos:{pokeDetail.types}</h2>
              <h2>Velocidad:{pokeDetail.speed}</h2>
              <h2>Altura:{pokeDetail.height}</h2>
              <h2>Peso:{pokeDetail.weight}</h2>
            </div>
          </main>
        ) : (
          <div>No hay datos disponibles</div>
        )}
      </div>
    </div>
  );
}
