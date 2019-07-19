import React from 'react';

export default ({ name, thumbnailLink, iconLink, onFileClick, onFileDblClick }) => {
    return (
        <div className="card-item" onClick={onFileClick} onDoubleClick={onFileDblClick}>
            <img src={thumbnailLink} alt={name} />
            <div className="container">
                <img src={iconLink} alt={name} style={{ width: '15px', height: '15px' }} />
                <p>{name}</p>
            </div>
        </div>
    )
}