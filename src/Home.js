import {useState} from "react";
import React, {createRef} from "react";
import FileUpload from "./FileUpload.js";
import ResultsPoints from "./components/ResultsPoints.js";

function Home() {
  const [isShown, setIsShown] = useState(false);

  const fileUploadRef = createRef();
  
  const showSimulateResults = event => {
    setIsShown(current => true);
  }
 
  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <FileUpload ref={fileUploadRef}/>
      <button onClick = {showSimulateResults}>Simular resultados</button>
      {isShown && (
	      <ResultsPoints/>
      )}
    </div>
  );
}

export default Home;
