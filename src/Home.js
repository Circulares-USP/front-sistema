import {postSimulate} from "./API.js";
import {useState} from "react";
import ResultsPoints from "./components/ResultsPoints.js";

function Home() {
  const [isShown, setIsShown] = useState(false);
  
  const showSimulateResults = event => {
    setIsShown(current => true);
  }
 
  return (
    <div className="container overflow-hidden text-center">
      <h1 className="mt-5">Simulador de Demanda</h1>
      <h4>Projeto dos Circulares</h4>
      <div className="mt-5 d-flex flew-row justify-content-center">
        <button onClick = {activateSimulation} className="btn btn-primary btn-md m-2">Simular Resultados</button>
        <button onClick = {showSimulateResults} className="btn btn-primary btn-md m-2">Mostrar resultados</button>
      </div>
      {isShown && (
	      <div className="d-flex justify-content-center mt-5">
	      	<ResultsPoints/>
	      </div>
      )}
    </div>
  );
}

function activateSimulation() {
  let result = postSimulate();
  console.log(result);
}

export default Home;
