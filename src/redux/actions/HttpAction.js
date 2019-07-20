// Action
const init = () => {
    return (dispatch) => {
        dispatch({ type: 'INIT_SUCCESS' });

    }
}

const create = () => {
    return (dispatch) => {
        dispatch({ type: 'CREATE_SUCCESS' });

    }
}

const breadCrumbAdd = (file) => {
    return (dispatch) => {
        dispatch({ type: 'BREADCRUMB_ADD', payload: file });
    }
}

const breadCrumbRemove = (index) => {
    return (dispatch) => {
        dispatch({ type: 'BREADCRUMB_REMOVE', payload: index });
    }
}

const get = (request) => {
    return (dispatch) => {
        dispatch({ type: 'GET' });
        request.then((response) => {
            dispatch({ type: 'GET_SUCCESS', payload: response.result.files });
        });
    }
}

const upload = () => {
    return (dispatch) => {
        dispatch({ type: 'UPLOAD_SUCCESS' });
    }
}

const _delete = () => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_SUCCESS' });
    }
}

export default {
    init,
    create,
    get,
    breadCrumbAdd,
    breadCrumbRemove,
    upload,
    delete: _delete
};