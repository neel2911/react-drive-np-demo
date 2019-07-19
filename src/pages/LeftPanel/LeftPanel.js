import React from 'react';
import './LeftPanel.css';

export default () => {
    return (
        <div className="left-panel-container">
            <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input type="file" name="myfile" />
            </div>
        </div>
    )
}