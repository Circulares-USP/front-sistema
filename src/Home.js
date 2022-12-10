import {postSimulate, getSimulate} from "./API.js";
import {useState, useEffect} from "react";

function Home() {
  const [isShown, setIsShown] = useState(false);
  
  const showSimulateResults = event => {
    setIsShown(current => true);
    let result = getSimulate();
    result.then((data) => {
	// show data on the page;
    	console.log(data);
    });
  }
 
  return (
    <div>
      <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
      <button onClick = {activateSimulation}>Simular Resultados</button>
      <button onClick = {showSimulateResults}>Mostrar resultados</button>
      {isShown && (
	      <ShowResult/>
      )}
    </div>
  );
}

function activateSimulation() {
  let result = postSimulate();
  console.log(result);
}

function ShowResult() {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
      getSimulate().then(
          result => setApiResponse(result));
  },[]);

  return(
      <div>
          <h1>Resultados</h1>
          <div>
	  {
	    Object.keys(apiResponse)
		.map( (obj, i) => (
			<div>
			  <h3 key="{i}">{obj}</h3>
		  	  <p>{JSON.stringify(apiResponse[obj])}</p>
			</div>
		  )	
		)
	 }
         </div>
      </div>
  );
};

export default Home;
