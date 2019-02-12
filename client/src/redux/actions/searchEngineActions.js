import * as types from './actionTypes';

const baseUrl = "/api"

export function receiveDetails(type, payload) {
  return { type, payload };
}

export function saveQuery(query){
  return dispatch => {
    dispatch({ type: types.INPUT_QUERY, payload: query });
  }
}

export function saveResult(state){
  const { val3, val5 } = state;
  return dispatch => {
    dispatch({ type: types.RECEIVE_RESULT, payload: parseInt(val3) * parseInt(val5) })
  }
}

export function checkConnection() {  
  return dispatch => {
    return fetch(baseUrl + '/ping', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    })
    .then((response) => dispatch(receiveDetails(types.CHECK_CONNECTION, response.status === 200)))
    .catch(err => dispatch(receiveDetails(types.CHECK_CONNECTION, false)))
  };
}

export function searchPerson(input) {
  return dispatch => {
    return fetch(baseUrl + '/person/' + input, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveDetails(types.RECEIVE_PERSON_RESPONSE, json)))
    .catch(err => dispatch(receiveDetails(types.RECEIVE_ERROR, err)))
  };
}

export function searchFacility(val1) {
  return dispatch => {
    return fetch(baseUrl + '/facility/' + val1, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveDetails(types.RECEIVE_FACILITY, json)))
    .catch(err => dispatch(receiveDetails(types.RECEIVE_ERROR, err)))
  };
}

export function searchExposure(val2) {
  return dispatch => {
    return fetch(baseUrl + '/exposure/' + val2, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveDetails(types.RECEIVE_EXPOSURE, json)))
    .catch(err => dispatch(receiveDetails(types.RECEIVE_ERROR, err)))
  };
}

export function search(input) {
  return (dispatch, getState) => {
    return dispatch(searchPerson(input)).then(() => {
      const fetched = getState().searchEngine;
      const { val1 } = fetched;
      dispatch(searchFacility(val1)).then(() => {
      const fetched = getState().searchEngine;
        const { val2 } = fetched;
        dispatch(searchExposure(val2))
        .then(() => {
          return dispatch(saveResult(getState().searchEngine));
        })
      })
    })
  }
}