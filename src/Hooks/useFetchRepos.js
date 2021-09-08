import { useReducer, useEffect, useRef } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
}

const BASE_URL = 'https://api.github.com/search/repositories';

// reducer to manage state of request to keep track of loading and error messages
const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, repos: [] };
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, repos: action.payload.repos };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, repos: [] };
        default:
            return state
    }
}

export default function useFetchRepos(params, page) {
    const [state, dispatch] = useReducer(reducer, { repos: [], loading: false });

    // constructs query based on parameters
    const q = `in:name ${params.name} language:${params.language}`;
    const orderBy = params.sort ? 'desc' : 'asc';

    const firstRender = useRef(true);
    
    useEffect(() => {
        if (firstRender.current) {
            // prevents API call on initial render
            firstRender.current = false;
            return;
        }

        if(params.name === '' || typeof params.name === 'undefined') return;

        // cancel token in case a new call is made before previous one is fulfilled
        const cancelToken = axios.CancelToken.source();

        dispatch({ type: ACTIONS.MAKE_REQUEST });

        axios.get(BASE_URL, {
            cancelToken: cancelToken.token,
            params: {...params, q: q, page: page, per_page: 10, order: orderBy}
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { repos: res.data } });
        }).catch(e => {
            if(axios.isCancel(e)) return;
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

        return () => {
            cancelToken.cancel();
        }
    }, [params, page, orderBy, q]);

    return state;
}