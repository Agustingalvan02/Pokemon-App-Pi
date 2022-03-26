import React, { useEffect } from "react";
import { PokemonDetail } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function CardDetail(props) {
  console.log("Hola soy un prop!:", props);
  const dispatch = useDispatch();
  let pokeDetail = useSelector((state) => state.detail);
  // let pokeArray=[];
  // pokeArray.push(pokeDetail)

  useEffect(() => {
    dispatch(PokemonDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(PokemonDetail());
  // }

  return (
    <div>
      <Link to={"/home"}>
        <button>
          Volver!
        </button>
      </Link>
      <div>
        {pokeDetail.length > 0 ? (
          <main>
            <div>
              <img src={pokeDetail[0].img} alt="no pokeimage" />
              <h1>Nombre:{pokeDetail[0].name}</h1>
              <h2>Ataque:{pokeDetail[0].attack}</h2>
              <h2>Defensa:{pokeDetail[0].defense}</h2>
              <h2>Tipos:{pokeDetail[0].types + " "}</h2>
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
