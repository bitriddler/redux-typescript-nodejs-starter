import {storiesReducer} from 'client/reducers/stories';
import {entitiesReducer} from 'client/reducers/entities';

export const reducers = {
  entities: entitiesReducer,
  stories: storiesReducer
}