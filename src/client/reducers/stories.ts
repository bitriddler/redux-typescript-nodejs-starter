import {combineReducers} from 'redux';
import {STORY_ACTIONS} from 'client/constants/actions-constants';
import {IApiErrorComponent} from 'client/api/base/base-api';

export interface IStoryState {
  isUpdating: boolean;
  isFetching: boolean;
  id?: string;
  error?: IApiErrorComponent;
}

export interface IStoriesListComponentState {
  isFetching: boolean;
  ids: string[];
  error?: IApiErrorComponent;
};

export interface IStoriesState {
  // Instance used in the details page
  detailsPage: IStoryState,
  // Instance used in the create page
  createPage: IStoryState,
  // Instance used in the update page
  updatePage: IStoryState,
  // List of stories
  list: IStoriesListComponentState
};

const storyInitialState: IStoryState = {
  isUpdating: false,
  isFetching: false
};

const listInitialState: IStoriesListComponentState = {
  isFetching: false,
  ids: []
};

function storyReducer(story: IStoryState, {type, payload}): IStoryState {
  switch(type) {
    case STORY_ACTIONS.FETCH_REQUEST:
      return {
        isUpdating: false,
        isFetching: true,
        id: payload.result
      };

    case STORY_ACTIONS.UPDATE_REQUEST:
    case STORY_ACTIONS.REPLACE_REQUEST:
    case STORY_ACTIONS.CREATE_REQUEST:
      return {
        isUpdating: true,
        isFetching: true,
        id: payload.result
      };

    case STORY_ACTIONS.FETCH_SUCCESS:
    case STORY_ACTIONS.UPDATE_SUCCESS:
    case STORY_ACTIONS.REPLACE_SUCCESS:
    case STORY_ACTIONS.CREATE_SUCCESS:
      return {
        isUpdating: false,
        isFetching: false,
        id: payload.result
      };

    case STORY_ACTIONS.FETCH_FAILURE:
    case STORY_ACTIONS.UPDATE_FAILURE:
    case STORY_ACTIONS.REPLACE_FAILURE:
    case STORY_ACTIONS.CREATE_FAILURE:
      return {
        isUpdating: false,
        isFetching: false,
        error: payload.error
      }

    case STORY_ACTIONS.RESET:
      return storyInitialState;
  }

  return story;
}

export function detailsPage(state: IStoryState = storyInitialState, action): IStoryState {
  if(action.payload && action.payload.instanceName === 'detailsPage') {
    return storyReducer(state, action);
  }
  return state;
}

export function createPage(state: IStoryState = storyInitialState, action): IStoryState {
  if(action.payload && action.payload.instanceName === 'createPage') {
    return storyReducer(state, action);
  }
  return state;
}

export function updatePage(state: IStoryState = storyInitialState, action): IStoryState {
  if(action.payload && action.payload.instanceName === 'updatePage') {
    return storyReducer(state, action);
  }
  return state;
}

export function list(state: IStoriesListComponentState = listInitialState, {type, payload}): IStoriesListComponentState {
  switch (type) {
    case STORY_ACTIONS.FETCH_LIST_REQUEST:
      return {
        isFetching: true,
        ids: state.ids
      };

    case STORY_ACTIONS.FETCH_LIST_SUCCESS:
      return {
        isFetching: false,
        ids: payload.result
      };

    case STORY_ACTIONS.FETCH_LIST_FAILURE:
      return {
        isFetching: false,
        ids: [],
        error: payload.error
      }
  }

  return state;
}

export const storiesReducer = combineReducers({
  detailsPage,
  createPage,
  updatePage,
  list
});