import React from 'react';

export default ({ onInputChange, onCreateNewFolderClick }) => {
    return (
        <div className="modal-container">
            <input type="text" onChange={onInputChange} />
            <button onClick={onCreateNewFolderClick} >Create</button>
        </div>
    )
}