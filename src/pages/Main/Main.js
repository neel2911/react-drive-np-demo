import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Main.css';
import Folder from '../../components/Folder';
import File from '../../components/File';
import { GetAction } from '../../actions/GetAction';
import { SelectedAction } from '../../actions/SelectedAction';
import { DeleteAction } from '../../actions/DeleteAction';


class Main extends Component {


    onItemDblClick = (file) => {
        console.log(file);
        this.props.dispatch(SelectedAction(file.parents[0]))
        this.props.dispatch(GetAction(file.id));
    }

    onItemClick = (file) => {
        this.props.dispatch(SelectedAction(file))
    }

    onDeleteClick = (file) => {
        this.props.dispatch(DeleteAction(this.props.fileReducer.slectedFolderId.id))
    }
    onBackClick = () => {
        this.props.dispatch(GetAction(this.props.fileReducer.slectedFolderId.id));
    }
    onDownloadClick = () => {
        window.location = this.props.fileReducer.slectedFolderId.webContentLink;
    }
    render() {
        const folders = this.props.files.filter((file) => {
            return file.mimeType === "application/vnd.google-apps.folder" && file;
        }).map((file) => {
            return <Folder key={file.id} name={file.name} onFolderDblClick={() => { this.onItemDblClick(file) }} onFolderClick={() => { this.onItemClick(file) }} />
        })
        const files = this.props.files.filter((file) => {
            return file.mimeType !== "application/vnd.google-apps.folder" && file;
        }).map((file) => {
            return <File key={file.id} name={file.name} thumbnailLink={file.thumbnailLink} iconLink={file.iconLink} onFileClick={() => { this.onItemClick(file) }} />
        })
        return (
            <div className="main-container" >
                <button type="button" className="google-button" onClick={this.onBackClick}>
                    <span className="google-button__text">Back</span>
                </button>
                <button type="button" className="google-button" onClick={this.onDeleteClick}>
                    <span className="google-button__text">Delete</span>
                </button>
                <button type="button" className="google-button" onClick={this.onDownloadClick}>
                    <span className="google-button__text">Download</span>
                </button>
                {folders.length > 0 ? (<div className="folder-section">
                    <div className="section-title">
                        Folders
                </div>
                    {folders}
                </div>) : null}
                {files.length > 0 ? (<div className="item-section">
                    <div className="section-title">
                        Files
                </div>
                    {files}
                </div>) : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fileReducer: state.fileReducer,
        authReducer: state.authReducer
    }
}

export default connect(mapStateToProps)(Main);