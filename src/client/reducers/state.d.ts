import {IStoriesState} from 'src/client/reducers/stories';
import {IEntitiesState} from 'src/client/reducers/entities';

export interface IState {
	entities: IEntitiesState,
	stories: IStoriesState
}