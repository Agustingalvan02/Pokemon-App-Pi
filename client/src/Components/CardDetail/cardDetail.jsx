import React, { useEffect } from "react";
import { PokemonDetail } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./cardDetail.css"
import PokeDexW from "../../image/PokeDexWallpaper.jpg"
export default function CardDetail(props) {
  const dispatch = useDispatch();
  let pokeDetail = useSelector((state) => state.detail);
  useEffect(() => {
    dispatch(PokemonDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  

  return (
    <div className="backgroundCard">
      <div >
        <img className="pokeDex" src={PokeDexW} alt="no data" />
        {pokeDetail.length > 0 ? (
          <main>
            <div className="containerDetail">
              <h2 className="idP">id:{pokeDetail[0].id}</h2>
              <img className="imgPoke"  src={pokeDetail[0].img} alt="no pokeimage" />
              <div className="data1">
              <h2>{pokeDetail[0].name}</h2> <br />
              <h2>TIPO:{pokeDetail[0].types + " "}</h2>
              </div>
              <div className="data2">
              <h2>ATK {pokeDetail[0].attack}</h2>
              <h2>DEF {pokeDetail[0].defense}</h2>
              <h2>SPD {pokeDetail[0].speed}</h2>
              </div>
              <div className="data2">
              <h2>HT {pokeDetail[0].height}</h2>
              <h2>WT {pokeDetail[0].weight}</h2>
              </div>
            </div>
      <Link to={"/home"}>
        <button className="buttonVolver">
          Volver!
        </button>
      </Link>
          </main>
        ) : (
          <div>404</div>
        )}
      </div>
    </div>
  );
}
