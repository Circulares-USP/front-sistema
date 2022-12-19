import React from 'react';
import Form from 'react-bootstrap/Form';
import BusStops from "./BusStops.js";
import Button from 'react-bootstrap/Button';

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
        <Form>
          {BusStops.map((stop) => (
            <div key={`inline-${stop}`} className="mb-3">
              <Form.Check type={"checkbox"}
              label={stop}
              onChange = {(e) => {this.handleStopChange(e.target.checked, stop)}}/>
            </div>
          ))}
          <Button onClick={() => {this.props.handleSubmit(this.props.line, this.props.sentido, this.state.stops)}}>
            Confirmar
          </Button>
        </Form>
      </div>
    );
  }
}

export default RouteSelect;