import {useState} from "react";
import ShowResult from "./ShowResult.js";

function Home() {
  const [isShown, setIsShown] = useState(false);
  
  const showSimulateResults = event => {
    setIsShown(current => true);
  }
 
  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <button onClick = {showSimulateResults}>Simular resultados</button>
      {isShown && (
	      <ShowResult/>
      )}
    </div>
  );
}

export default Home;
