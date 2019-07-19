import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UploadFileAction } from '../../actions/UploadFileAction';
import { CreateAction } from '../../actions/CreateAction';
import './LeftPanel.css';

class LeftPanel extends Component {
    state = {
        folderName: ''
    }
    
    onFileUploadClick = (e) => {
        const file = e.target.files[0];

        const boundary = 'reactdrive';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        let reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
            var contentType = file.type || 'application/octet-stream';
            var metadata = {
                name: file.name,
                mimeType: contentType
            };
            var base64Data = btoa(reader.result.toString());

            var multipartRequestBody =
                delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;

            this.props.dispatch(UploadFileAction({ boundary, multipartRequestBody }));
        }
    }

    onTextValueChange = (evt) => {
        this.setState({ folderName: evt.target.value });
    }

    onCreateNewFolderClick = () => {
        this.props.dispatch(CreateAction(this.state.folderName));
    }

    render() {
        return (
            <div className="left-panel-container" >
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload a file</button>
                    <input type="file" name="myfile" onChange={this.onFileUploadClick} />
                </div>
                <input type="text" name="title" value={this.state.folderName}
                    onChange={this.onTextValueChange} />
                <button type="button" className="google-button" onClick={this.onCreateNewFolderClick}>
                    <span className="google-button__text">New Folder</span>
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer,
        authReducer: state.authReducer
    }
}

export default connect(mapStateToProps)(LeftPanel);