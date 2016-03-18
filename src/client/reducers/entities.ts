import {fromJS, Map} from 'immutable';
import {ENTITIES_ACTIONS} from "src/client/constants/ActionTypes";

const initialState = fromJS({
  users: {},
  stories: {}
});

function entities(state: Map<string, any> = initialState, action) {
  if(action.type === ENTITIES_ACTIONS.SAVE) {
    return state.mergeDeep(action.entities);
  }
  else if(action.type === ENTITIES_ACTIONS.REMOVE) {
  	return state.removeIn([action.entityName, action.id]);
  }

  return state;
}

export const entitiesReducer = entities;