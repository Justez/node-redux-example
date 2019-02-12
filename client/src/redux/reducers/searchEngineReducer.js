import initialState from './initialState';
import { 
  FETCH_DETAILS, 
  RECEIVE_EXPOSURE, 
  RECEIVE_FACILITY, 
  RECEIVE_ERROR, 
  RECEIVE_PERSON_RESPONSE, 
  CHECK_CONNECTION, 
  INPUT_QUERY,
  RECEIVE_RESULT,
} from '../actions/actionTypes';

export default function DETAILS(state = initialState.searchEngine, action) {
  switch (action.type) {
    case INPUT_QUERY: 
      return { ...state, query: action.payload };
    case FETCH_DETAILS:
      return state;
    case RECEIVE_PERSON_RESPONSE:
      return {
        ...state,
        val1: action.payload.val1,
        val2: action.payload.val2,
      };
    case RECEIVE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RECEIVE_FACILITY:  
      return {
        ...state,
        val3: action.payload.val3,
        val4: action.payload.val4,
      };
    case RECEIVE_EXPOSURE:  
      return {
        ...state,
        val5: action.payload.val5,
      };
    case RECEIVE_RESULT:  
      return {
        ...state,
        result: action.payload,
      };
    case CHECK_CONNECTION: 
      return {
        ...state,
        connected: action.payload,
      };
    default:
      return state;
  }
}