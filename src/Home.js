import React, {createRef} from "react";
import FileUpload from "./FileUpload.js";
import ResultsPoints from "./components/ResultsPoints.js";
import RouteSelect from "./RouteSelect.js";

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      routes: {
        "rotas": {
          8012: {
            "ida": [],
            "volta": [],
          },
          8022: {
            "ida": [],
            "volta": [],
          },
          8032: {
            "ida": []
          }
        }
      },
      steps: ["sendFiles", "routeSelect8012Butantã", "routeSelect8012P3",
      "routeSelect8022Butantã", "routeSelect8022P3",
      "routeSelect8032",
      "ready", "done"],
      stepIndex: 0,
      currentStep: "sendFiles",
      demandJson: {},
      departureJson: {},
    }
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }
  
  fileUploadRef = createRef();
  
  showSimulateResults = () => {
    console.log({...this.state.demandJson, ...this.state.departureJson, ...this.state.routes})
    this.setNextStep();
  }

  handleSubmit = (line, sentido, stops) => {
    var newRoutes = {...this.state.routes};
    newRoutes["rotas"][line][sentido] = stops;
    this.setState({routes: newRoutes});
    this.setNextStep();
  }

  setNextStep = () => {
    this.setState({stepIndex: this.state.stepIndex + 1,
      currentStep: this.state.steps[this.state.stepIndex + 1]});
  }

  setPreviousStep = () => {
    this.setState({stepIndex: this.state.stepIndex - 1,
      currentStep: this.state.steps[this.state.stepIndex -1]});
  }

  getJsons = (demandJson, departureJson) => {
    this.setState({demandJson: demandJson, departureJson: departureJson});
    this.setNextStep();
  }

  render() {
    return (
      <div className="container overflow-hidden text-center">
        <h1 className="mt-5">Simulador de Demanda</h1>
	<h4>Projeto dos Circulares</h4>
	<div className="mt-5 d-flex flew-row justify-content-center">
		{this.state.currentStep === "sendFiles" &&
		  <FileUpload getJsons={this.getJsons} ref={this.fileUploadRef}/>}
		{this.state.currentStep === "routeSelect8012Butantã" &&
		  <RouteSelect line={8012} rota={"Sentido Butantã -> P3"} sentido="ida" handleSubmit={this.handleSubmit}/>}
		{this.state.currentStep === "routeSelect8012P3" &&
		  <RouteSelect line={8012} rota={"Sentido P3 -> Butantã"} sentido="volta" handleSubmit={this.handleSubmit}/>}
		{this.state.currentStep === "routeSelect8022Butantã" &&
		  <RouteSelect line={8022} rota={"Sentido Butantã -> P3"} sentido="ida" handleSubmit={this.handleSubmit}/>}
		{this.state.currentStep === "routeSelect8022P3" &&
		  <RouteSelect line={8022} rota={"Sentido P3 -> Butantã"} sentido="volta" handleSubmit={this.handleSubmit}/>}
		{this.state.currentStep === "routeSelect8032" &&
		  <RouteSelect line={8032} rota={"Circular"} sentido="ida" handleSubmit={this.handleSubmit}/>}
		{this.state.currentStep === "ready" &&
		  <button className="btn btn-primary btn-md m-2" onClick = {this.showSimulateResults}>Simular resultados</button>}
		{this.state.currentStep === "done" && (
		  <div className="d-flex justify-content-center mt-5">
		    <ResultsPoints demand={this.state.demandJson} departure={this.state.departureJson} routes={this.state.routes}/>
		  </div>
		)}
		{this.state.currentStep !== "sendFiles" && <button onClick={this.setPreviousStep}>Voltar</button>}
	</div>
      </div>
    );
  }
}

export default Home;
