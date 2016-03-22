import {IStoriesState} from 'client/reducers/stories';
import {IEntitiesState} from 'client/reducers/entities';

export interface IState {
	entities: IEntitiesState,
	stories: IStoriesState
}