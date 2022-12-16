import {postSimulate} from "./API.js";
import {useState} from "react";
import ResultsPoints from "./components/ResultsPoints.js";

function Home() {
  const [isShown, setIsShown] = useState(false);
  
  const showSimulateResults = event => {
    setIsShown(current => true);
  }
 
  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <button onClick = {activateSimulation}>Simular Resultados</button>
      <button onClick = {showSimulateResults}>Mostrar resultados</button>
      {isShown && (
	      <ResultsPoints/>
      )}
    </div>
  );
}

function activateSimulation() {
  let result = postSimulate();
  console.log(result);
}

export default Home;
