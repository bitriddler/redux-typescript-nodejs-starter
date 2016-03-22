import {StoryApi} from 'client/api/story/story.api';
import {LocationActions} from 'client/actions/location/location.actions';
import {StoryActions} from 'client/actions/story/story.actions';
import {Store} from 'redux';
import {routerActions} from 'react-router-redux';

export function configureKernel(store: Store) {
  // Bind apis
  const storyApi = new StoryApi();

  // Bind actions
  const locationActions = new LocationActions(store.getState, routerActions);
  const storyActions = new StoryActions(store.getState, storyApi);

  return {
    store,

    // Bind actions used in our app
    actions: {
      locationActions,
      storyActions
    }
  };
}
