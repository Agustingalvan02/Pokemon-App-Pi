import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";
import "./landingPage.css";
function landingPage() {
  return (
    <div className="bodyBG">
        <h1>Welcome! </h1>
        <Link to="/home">
          <button>Ingresar</button>
        </Link>
    </div>
  );
}
export default landingPage;