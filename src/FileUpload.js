import React, {useState} from 'react';

class FileUpload extends React.Component{

	constructor(props) {
		super(props);
		this.state =
			{selectedDemandFile: null,
			isDemandFileSelected: false,
			selectedDepartureFile: null,
			isDepartureFileSelected: false}
	}

	changeDemandFile = (event) => {
		this.setState({selectedDemandFile: event.target.files[0], isDemandFileSelected: true});
	};

	changeDepartureFile = (event) => {
		this.setState({selectedDepartureFile: event.target.files[0], isDepartureFileSelected: true});
	};

	handleSubmission = () => {
	};

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

export default FileUpload;