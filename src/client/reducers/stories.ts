import {combineReducers} from 'redux-immutablejs';
import {Map} from 'immutable';
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";

const initialState = Map({
  isFetching: false,
  isUpdating: false
});

// Instances controlled in our app
const initialInstances = Map({
  edit: initialState,
  created: initialState,
  show: initialState,
  deleted: initialState
});

export function instances(state = initialInstances, action) {
  let updateInstance = (newState) => {
    return state.updateIn([action.instance], (instance) => instance.merge(newState));
  }

  switch(action.type) {
    case STORY_ACTIONS.FETCH_REQUEST:
      return updateInstance({isUpdating: false, isFetching: true});

    case STORY_ACTIONS.UPDATE_REQUEST:
    case STORY_ACTIONS.REPLACE_REQUEST:
    case STORY_ACTIONS.CREATE_REQUEST:
      return updateInstance({ isUpdating: true, isFetching: true });

    case STORY_ACTIONS.FETCH_SUCCESS:
    case STORY_ACTIONS.UPDATE_SUCCESS:
    case STORY_ACTIONS.REPLACE_SUCCESS:
    case STORY_ACTIONS.CREATE_SUCCESS:
      return updateInstance({ isFetching: false, isUpdating: false, result: action.result });

    case STORY_ACTIONS.FETCH_FAILURE:
    case STORY_ACTIONS.UPDATE_FAILURE:
    case STORY_ACTIONS.REPLACE_FAILURE:
    case STORY_ACTIONS.CREATE_FAILURE:
      return updateInstance({ isFetching: false, isUpdating: false, error: action.error });
  }

  return state;
}

export function list(state = initialState, action) {
  switch (action.type) {
    case STORY_ACTIONS.FETCH_LIST_REQUEST:
      return state.merge({ isFetching: true });

    case STORY_ACTIONS.FETCH_LIST_SUCCESS:
      return state.merge({ isFetching: false, result: action.result });

    case STORY_ACTIONS.FETCH_LIST_FAILURE:
      return state.merge({ isFetching: false, id: null });
  }

  return state;
}

export const storiesReducer = combineReducers({
  instances,
  list
});