import { combineReducers } from 'redux';

import lanches from './lanches';
import detalhes from './detalhes';

export default combineReducers({
  lanches,
  detalhes,
});
