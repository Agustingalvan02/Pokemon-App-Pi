import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons} from "./Actions";
import Home from "./Components/Home/home";
import landingPage from "./Components/LandingPage/landingPage";
import CreatePokemon from "./Components/CreatePokemon/createPokemon";
import CardDetail from "./Components/CardDetail/cardDetail";
// import NavBar from './Components/NavBar/navBar';
// import PokeLogo from './image/PokemonLogo.png';
function App() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div className="App">
      {/* <img className='logoPoke' src={PokeLogo} alt='Pokelogo' height={100}></img> */}
      {/* <NavBar/> */}
      <Switch>
        <Route exact path="/" component={landingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/Pokemon" component={CreatePokemon} />
        <Route path="/Pokemons/:id" component={CardDetail} />
      </Switch>
    </div>
  );
}

export default App;
