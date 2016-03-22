import {IStory} from 'shared/models';
import {ENTITIES_ACTIONS} from 'client/constants/actions.constants';
import {merge} from 'shared/helpers';

export interface IEntitiesState {
	stories: { [id: string]: IStory }
}

const initialState: IEntitiesState = {
	stories: {}
};

function entities(state: IEntitiesState = initialState, {type, payload}): IEntitiesState {
	// Save documents to entities
  if(type === ENTITIES_ACTIONS.SAVE) {
  	let newState = merge({}, state);

  	for(let entityName in state) {
  		if(payload.entities[entityName]) {
  			newState[entityName] = merge(state[entityName], payload.entities[entityName]);
  		}
  	}

  	return newState;
  }
  // Remove document from specified entity
  else if(type === ENTITIES_ACTIONS.REMOVE) {
  	let newState = merge({}, state);

  	if(newState[payload.entityName] && newState[payload.entityName][payload.id]) {
  		delete newState[payload.entityName][payload.id];
  	}

  	return newState;
  }

  return state;
}

export const entitiesReducer = entities;