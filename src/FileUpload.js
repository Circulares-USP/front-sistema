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
			departureJson: {},
			isParsing: true,
			}
	}

	componentDidUpdate() {
		if (this.state.isParsing && this.state.demandJson !== {} && this.state.departureJson !== {})
			this.setState({isParsing: false});
	}

	changeDemandFile = (event) => {
		this.setState({selectedDemandFile: event.target.files[0], isDemandFileSelected: true});
		demandXlsxToJson(event.target.files[0], this.formatDemandJson);
	};

	changeDepartureFile = (event) => {
		this.setState({selectedDepartureFile: event.target.files[0], isDepartureFileSelected: true});
		departureXlsxToJson(event.target.files[0], this.formatDepartureJson);
	};

	formatDemandJson = (demandaIdaButanta, demandaIdaP3, demandaVoltaButanta, demandaVoltaP3) => {
		var parsedDemand = {
			"demanda": {
				"seg": {
					"ida_manha": {
						"de_p3": {},
						"de_butanta": {}
					},
					"ida_tarde": {
						"de_p3": {},
						"de_butanta": {}
					},
					"volta_tarde": {
						"de_p3": {},
						"de_butanta": {}
					}
				},
				"ter": {
					"ida_manha": {
						"de_p3": {},
						"de_butanta": {}
					},
					"ida_tarde": {
						"de_p3": {},
						"de_butanta": {}
					},
					"volta_tarde": {
						"de_p3": {},
						"de_butanta": {}
					}
				},
				"qua": {
					"ida_manha": {
						"de_p3": {},
						"de_butanta": {}
					},
					"ida_tarde": {
						"de_p3": {},
						"de_butanta": {}
					},
					"volta_tarde": {
						"de_p3": {},
						"de_butanta": {}
					}
				},
				"qui": {
					"ida_manha": {
						"de_p3": {},
						"de_butanta": {}
					},
					"ida_tarde": {
						"de_p3": {},
						"de_butanta": {}
					},
					"volta_tarde": {
						"de_p3": {},
						"de_butanta": {}
					}
				},
				"sex": {
					"ida_manha": {
						"de_p3": {},
						"de_butanta": {}
					},
					"ida_tarde": {
						"de_p3": {},
						"de_butanta": {}
					},
					"volta_tarde": {
						"de_p3": {},
						"de_butanta": {}
					}
				},
			}
		}
		for (let i = 0; i < 10; i++) {
			let hourButanta = demandaIdaButanta[i].Hora === "08:00" ? "ida_manha" : "ida_tarde";
			let dayButanta = convertDayNames(demandaIdaButanta[i].Dia);

			for (const [stop, value] of Object.entries(demandaIdaButanta[i])) {
				if (stop === "Hora" || stop === "Dia") continue;
				parsedDemand["demanda"][dayButanta][hourButanta]["de_butanta"][stop] = value;
			}

			let hourP3 = demandaIdaP3[i].Hora === "08:00" ? "ida_manha" : "ida_tarde";
			let dayP3 = convertDayNames(demandaIdaP3[i].Dia);

			for (const [stop, value] of Object.entries(demandaIdaP3[i])) {
				if (stop === "Hora" || stop === "Dia") continue;
				parsedDemand["demanda"][dayP3][hourP3]["de_p3"][stop] = value;
			}
		}

		for (let i = 0; i < 5; i++) {
			let dayButanta = convertDayNames(demandaVoltaButanta[i].Dia);

			for (const [stop, value] of Object.entries(demandaVoltaButanta[i])) {
				if (stop === "Hora" || stop === "Dia") continue;
				parsedDemand["demanda"][dayButanta]["volta_tarde"]["de_butanta"][stop] = value;
			}

			let dayP3 = convertDayNames(demandaVoltaP3[i].Dia);

			for (const [stop, value] of Object.entries(demandaVoltaP3[i])) {
				if (stop === "Hora" || stop === "Dia") continue;
				parsedDemand["demanda"][dayP3]["volta_tarde"]["de_p3"][stop] = value;
			}
		}
		this.setState({demandJson: parsedDemand});
	}

	formatDepartureJson = (rawDeparture) => {
		var parsedDeparture = {
			"saidas_por_hora": {}
		}
		for (let i = 0; i < 24; i++) {
			let hour = i.toString();
			parsedDeparture["saidas_por_hora"][hour] = {};
			for (let j = 8012; j < 8042; j += 10) {
				parsedDeparture["saidas_por_hora"][hour][j.toString()] = rawDeparture[i][j]
			}
		}
		this.setState({departureJson: parsedDeparture});
	}

	render() {
		return(
			<div>
				<table>
					<tbody>
						<tr>
							<td><label htmlFor="file">Demanda de Alunos:</label></td>
							<td><input id="demand" type="file" name="file" onChange={this.changeDemandFile} /></td>
						</tr>
						<tr>
							<td><label htmlFor="file">Saídas de Ônibus:</label></td>
							<td><input id="departure" type="file" name="file" onChange={this.changeDepartureFile} /></td>
						</tr>
					</tbody>
				</table>
				<button disabled={this.state.isParsing} onClick={() => {this.props.getJsons(this.state.demandJson, this.state.departureJson)}}>
					Confirmar arquivos
				</button>
			</div>
		)
	}
}

function demandXlsxToJson(file, callback) {
	const reader = new FileReader();
	reader.onload = (evt) => { 
		const bstr = evt.target.result;
		const wb = XLSX.read(bstr, {type:'binary'});

		const wsnameIdaButanta = wb.SheetNames[0];
		const sheetIdaButanta = wb.Sheets[wsnameIdaButanta];
		const dataIdaButanta = XLSX.utils.sheet_to_json(sheetIdaButanta);

		const wsnameIdaP3 = wb.SheetNames[0];
		const sheetIdaP3 = wb.Sheets[wsnameIdaP3];
		const dataIdaP3 = XLSX.utils.sheet_to_json(sheetIdaP3);
		
		const wsnameVoltaButanta = wb.SheetNames[0];
		const sheetVoltaButanta = wb.Sheets[wsnameVoltaButanta];
		const dataVoltaButanta = XLSX.utils.sheet_to_json(sheetVoltaButanta);
		
		const wsnameVoltaP3 = wb.SheetNames[0];
		const sheetVoltaP3 = wb.Sheets[wsnameVoltaP3];
		const dataVoltaP3 = XLSX.utils.sheet_to_json(sheetVoltaP3);

		console.log(dataIdaButanta, dataIdaP3, dataVoltaButanta, dataVoltaP3);
		callback(dataIdaButanta, dataIdaP3, dataVoltaButanta, dataVoltaP3);
	};
	reader.readAsBinaryString(file);
}

function departureXlsxToJson(file, callback) {
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
