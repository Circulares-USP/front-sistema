import {getSimulate} from "./API.js";
import {useState, useEffect} from "react";

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

export default ShowResult;