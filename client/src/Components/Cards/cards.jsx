import React from "react";
import "./cards.css";

export default function Cards({name, img, types }) {
  return(
  <div>
    <img src={img} alt="Img missing" width={150} height={150}/>
    <h1>{name}</h1>
    <h3>Tipo: {types}</h3>
  </div>
  )
}
