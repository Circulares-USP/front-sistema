import {useState} from "react";
import ShowResult from "./ShowResult.js";
import React, {createRef} from "react";
import FileUpload from "./FileUpload.js";

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
	      <ShowResult/>
      )}
    </div>
  );
}

export default Home;
