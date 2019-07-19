import React from 'react';
import './Main.css';

export default () => {
    return (
        <div className="main-container">
            <div className="folder-section">
                <div className="section-title">
                    Folders
                </div>
                <div className="card-folder">
                    <svg x="0px" y="0px" focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="#8f8f8f"><g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>
                    <span>New Folder</span>
                </div>
            </div>
            <div className="item-section">
                <div className="section-title">
                    Items
                </div>
                <div className="card-item">
                    <img src="https://png.pngtree.com/png-clipart/20190603/original/pngtree-glare-png-image_115149.jpg" alt="5 Terre" />
                    <div className="container">
                        <p>Cinque Terre</p>
                    </div>
                </div>
            </div>
        </div>
    )
}