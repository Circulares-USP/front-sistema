import React from 'react';
import * as XLSX from 'xlsx';

class FileUpload extends React.Component{

	constructor(props) {
		super(props);
		this.state =
			{selectedDemandFile: null,
			isDemandFileSelected: false,
			selectedDepartureFile: null,
			isDepartureFileSelected: false,
			demandJson: {},
			departureJson: {}}
	}

	changeDemandFile = (event) => {
		this.setState({selectedDemandFile: event.target.files[0], isDemandFileSelected: true});
		xlsxToJson(event.target.files[0], this.formatDemandJson);
	};

	changeDepartureFile = (event) => {
		this.setState({selectedDepartureFile: event.target.files[0], isDepartureFileSelected: true});
		xlsxToJson(event.target.files[0], this.formatDepartureJson);
	};

	formatDemandJson = (rawDemand) => {
		var parsedDemand = {
			480: {
				"seg": {},
				"ter": {},
				"qua": {},
				"qui": {},
				"sex": {}
			},
			1140: {
				"seg": {},
				"ter": {},
				"qua": {},
				"qui": {},
				"sex": {}
			}
		}
		for (let i = 0; i < 10; i++) {
			let hour = rawDemand[i].Hora == "08:00" ? 480 : 1140;
			let day = convertDayNames(rawDemand[i].Dia);

			for (const [stop, value] of Object.entries(rawDemand[i])) {
				if (stop == "Hora" || stop == "Dia") continue;
				parsedDemand[hour][day][stop] = value;
			}
		}
		this.setState({demandJson: parsedDemand});
	}

	formatDepartureJson = (rawDeparture) => {
		var parsedDeparture = {
			8012: [],
			8022: [],
			8032: []
		}
		for (let i = 0; i < 24; i++) {
			for (let j = 8012; j < 8042; j += 10) {
				parsedDeparture[j].push(rawDeparture[i][j])
			}
		}
		console.log(parsedDeparture);
		this.setState({departureJson: parsedDeparture});
	}

	render() {
		return(
			<div>
				<input id="demand" type="file" name="file" onChange={this.changeDemandFile} />
				<br/>
				<input id="departure" type="file" name="file" onChange={this.changeDepartureFile} />
			</div>
		)
	}
}

function xlsxToJson(file, callback) {
	const reader = new FileReader();
	reader.onload = (evt) => { 
		const bstr = evt.target.result;
		const wb = XLSX.read(bstr, {type:'binary'});
		const wsname = wb.SheetNames[0];
		const sheet = wb.Sheets[wsname];
		const data = XLSX.utils.sheet_to_json(sheet);
		callback(data);
	};
	reader.readAsBinaryString(file);
}

function convertDayNames(day) {
	return day.toLowerCase().substring(0, 3);
}

export default FileUpload;