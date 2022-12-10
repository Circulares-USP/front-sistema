import React, {createRef} from "react";
import {postSimulate} from "./API.js";
import FileUpload from "./FileUpload.js";

function Home() {

  const fileUploadRef = createRef();

  function activateSimulation() {
    console.log(fileUploadRef);
    let result = postSimulate();
    console.log(result);
  }

  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <FileUpload ref={fileUploadRef}/>
      <button onClick = {activateSimulation}>Simular Resultados</button>
    </div>
  );
}

export default Home;
