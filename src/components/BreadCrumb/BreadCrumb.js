import React from 'react';

export default ({ name, onBreadCrumbClick }) => {
    return (
        <div className="breadcrumb-item" onClick={onBreadCrumbClick}>
            {name}
        </div>
    )
}