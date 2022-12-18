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
        8012: [],
        8022: [],
        8032: []
      },
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
    this.setState({currentStep: "done"});
  }

  handleSubmit = (line, stops) => {
    var newRoutes = {...this.state.routes};
    newRoutes[line] = stops;
    this.setState({routes: newRoutes});
    this.updateSelectionRoute();
  }

  updateSelectionRoute = () => {
    if (this.state.currentStep === "routeSelect8012") 
      this.setState({currentStep: "routeSelect8022"});
    if (this.state.currentStep === "routeSelect8022") 
      this.setState({currentStep: "routeSelect8032"});
    if (this.state.currentStep === "routeSelect8032") 
      this.setState({currentStep: "ready"});
  }

  getJsons = (demandJson, departureJson) => {
    this.setState({demandJson: demandJson, departureJson: departureJson});
    this.setState({currentStep: "routeSelect8012"});
  }

  render() {
    return (
      <div>
        <h1>CIRCULARES - SIMULADOR DE DEMANDA</h1>
        {this.state.currentStep === "sendFiles" &&
          <FileUpload getJsons={this.getJsons} ref={this.fileUploadRef}/>}
        {this.state.currentStep === "routeSelect8012" &&
          <RouteSelect line={8012} handleSubmit={this.handleSubmit}/>}
        {this.state.currentStep === "routeSelect8022" &&
          <RouteSelect line={8022} handleSubmit={this.handleSubmit}/>}
        {this.state.currentStep === "routeSelect8032" &&
          <RouteSelect line={8032} handleSubmit={this.handleSubmit}/>}
        {this.state.currentStep === "ready" &&
          <button onClick = {this.showSimulateResults}>Simular resultados</button>}
        {this.state.currentStep === "done" && (
          <ResultsPoints/>
        )}
      </div>
    );
  }
}

export default Home;
