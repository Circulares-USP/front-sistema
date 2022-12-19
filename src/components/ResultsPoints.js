import {postSimulate} from "../API.js";
import {useState, useEffect} from "react";

function translateActionPeriod(key) {
  switch(key) {
    case 'ida-manha':
      return 'Ida no período da manhã';
    case 'ida-tarde':
      return 'Ida no período da tarde';
    case 'volta-manha':
      return 'Volta no período da manhã';
    case 'volta-tarde':
      return 'Volta no período da tarde';
    default:
      return '';
  }
};

function ResultsPoints({test_mode=false, demand={}, departure={}, routes={}}) {
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    if (test_mode === false) {
      postSimulate().then(
          result => setApiResponse(result['media-por-ponto']));
    }
  },[test_mode]);

  return(
      <div>
          <h1>Resultados</h1>
          <div>
		<div>
		  <h3 className="mt-4">Média por ponto</h3>
	  	    {
		      Object.keys(apiResponse)
			  .map( (obj, i) => (
				<div key={i.toString()}>
				  <h4 className="mt-4">{translateActionPeriod(obj)}</h4>
				  <table>
				  <thead>
				    <tr>
				  	<th>Ponto de ônibus</th>
				  	<th>Porcentagem não entregue</th>
				    </tr>
				  </thead>
				  <tbody>
				  {Object.keys(apiResponse[obj])
					  .map( (item, j) => (
					<tr key={j.toString()}>
					  <td>{item}</td>
					  <td>{apiResponse[obj][item]}</td>
				        </tr>
					  ))
				  }
				  </tbody>
				  </table>
				</div>
			  )
		      )
		    }
                </div>
         </div>
      </div>
  );
};

export default ResultsPoints;
