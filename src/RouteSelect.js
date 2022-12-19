import React from 'react';
import Form from 'react-bootstrap/Form';
import BusStops from "./BusStops.js";

class RouteSelect extends React.Component{
  constructor(props) {
    super(props);
    this.state = {stops: []};
  }

  handleStopChange = (check, stop) => {
    if (check) {
      this.setState({stops: [...this.state.stops, stop]})
    } else {
      this.setState(
        {stops: this.state.stops.filter(function(insideStop) { 
          return insideStop !== stop;
        }
      )});
    }
  }

  render() {
    return (
      <div>
        <h3> Selecione a rota da linha {this.props.line} ({this.props.rota})</h3>
        <div className="d-flex justify-content-center">
		<Form>
		  {BusStops.map((stop) => (
		    <div key={`inline-${stop}`} className="mb-3">
		      <Form.Check type={"checkbox"}
		      label={stop}
		      onChange = {(e) => {this.handleStopChange(e.target.checked, stop)}}/>
		    </div>
		  ))}
		  <button className="btn btn-primary btn-md m-2" onClick={() => {this.props.handleSubmit(this.props.line, this.props.sentido, this.state.stops)}}>
		    Confirmar
		  </button>
		</Form>
	</div>
      </div>
    );
  }
}

export default RouteSelect;
