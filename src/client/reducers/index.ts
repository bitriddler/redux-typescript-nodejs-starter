import {storiesReducer} from 'src/client/reducers/stories';
import {entitiesReducer} from 'src/client/reducers/entities';

export const reducers = {
  entities: entitiesReducer,
  stories: storiesReducer
}