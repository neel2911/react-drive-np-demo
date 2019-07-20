import React, { Component } from 'react';
import { connect } from 'react-redux';

import HttpAction from '../../redux/actions/HttpAction';

import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import Folder from '../../components/Folder/Folder';
import File from '../../components/File/File';

import './Main.css';
class Main extends Component {
    httpService = null;
    authService = null;
    state = {
        selectedItem: {
            isSelected: false,
            file: null
        }
    };

    constructor(props) {
        super(props);
        this.httpService = props.httpService;
        this.authService = props.authService;
    }

    onItemDblClick = (file) => {
        if (file.mimeType === "application/vnd.google-apps.folder") {
            this.props.dispatch(HttpAction.breadCrumbAdd(file));
            this.props.dispatch(HttpAction.get(this.httpService.get(file.id)));
        } else {
            this.httpService.view(file.webViewLink);
        }
    }

    onOtherClick = () => {
        this.setState({
            selectedItem: {
                isSelected: false,
                file: null
            }
        });
    }

    onItemClick = (e, file) => {
        e.stopPropagation();
        if (file.mimeType !== "application/vnd.google-apps.folder") {
            this.setState({
                selectedItem: {
                    isSelected: true,
                    file: file
                }
            });
        }
    }

    onDeleteClick = () => {
        this.httpService.delete(this.state.selectedItem.file.id).execute((result) => {
            this.props.dispatch(HttpAction.delete());
            this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[this.props.httpReducer.breadBrumbs.length - 1].id)));
        });
    }

    onDownloadClick = () => {
        if (this.state.selectedItem.isSelected) {
            this.httpService.download(this.state.selectedItem.file.webContentLink);
        }
    }

    onBreadCrumbClick = (breadBrumb) => {
        const newBreadBrumbs = [...this.props.httpReducer.breadBrumbs];
        const selectedBreadBrumb = this.props.httpReducer.breadBrumbs.findIndex((breadBrumbData) => breadBrumbData.id === breadBrumb.id);
        if (this.props.httpReducer.breadBrumbs.length - 1 > selectedBreadBrumb) {
            this.props.dispatch(HttpAction.get(this.httpService.get(this.props.httpReducer.breadBrumbs[selectedBreadBrumb].id)));
            newBreadBrumbs.length = selectedBreadBrumb + 1;
            this.props.dispatch(HttpAction.breadCrumbRemove(newBreadBrumbs));
        }
    }
    render() {
        const breadCrumbs = this.props.httpReducer.breadBrumbs.map((breadBrumb) => {
            return <BreadCrumb key={breadBrumb.id} name={breadBrumb.name} onBreadCrumbClick={() => this.onBreadCrumbClick(breadBrumb)} />
        });
        const folders = this.props.files.filter((file) => {
            return file.mimeType === "application/vnd.google-apps.folder" && file;
        }).map((file) => {
            return <Folder key={file.id} name={file.name} onFolderDblClick={() => { this.onItemDblClick(file) }} onFolderClick={(e) => { this.onItemClick(e, file) }} />
        })
        const files = this.props.files.filter((file) => {
            return file.mimeType !== "application/vnd.google-apps.folder" && file;
        }).map((file) => {
            return <File key={file.id} name={file.name} thumbnailLink={file.thumbnailLink} iconLink={file.iconLink} onFileDblClick={() => { this.onItemDblClick(file) }} onFileClick={(e) => { this.onItemClick(e, file) }} />
        })
        return (
            <div className="main-container" onClick={this.onOtherClick}>
                <div className="breadcrum-container">
                    {breadCrumbs}
                </div>
                {this.state.selectedItem.isSelected ? (
                    <div>
                        <button type="button" className="google-button" onClick={this.onDeleteClick}>
                            <span className="google-button__text">Delete</span>
                        </button>
                        <button type="button" className="google-button" onClick={this.onDownloadClick}>
                            <span className="google-button__text">Download</span>
                        </button>
                    </div>
                ) : null}
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
        httpReducer: state.httpReducer,
        authReducer: state.authReducer
    }
}

export default connect(mapStateToProps)(Main);