import {postSimulate} from "./API.js";

function Home() {
  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <button onClick = {activateSimulation}>Simular Resultados</button>
    </div>
  );
}

function activateSimulation() {
  let result = postSimulate();
  console.log(result);
}

export default Home;
