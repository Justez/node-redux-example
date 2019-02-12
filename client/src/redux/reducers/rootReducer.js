import {combineReducers} from 'redux';
import searchEngine from './searchEngineReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  searchEngine
});

export default rootReducer;