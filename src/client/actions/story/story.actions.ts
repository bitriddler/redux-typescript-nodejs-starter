import {BaseActions} from 'src/client/actions/base/base.actions';
import {STORY_ACTIONS} from 'src/client/constants/actions.constants';
import {StoryApi} from 'src/client/api/story/story.api';

export class StoryActions extends BaseActions {
  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  /**
   * Find story by id
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id					    Story id
   */
	public findById(instanceName, id) {
    if(this.state.stories[instanceName].isFetching ||
      this.state.stories[instanceName].isUpdating) {
      return;
    }
    //
    this.onNext({
      type: STORY_ACTIONS.FETCH_REQUEST,
      payload: {id, instanceName}
    });
    //
    let onSuccess = ({ result, entities }) => {
    	this.saveEntity(entities);
    	this.onNext({
	      type: STORY_ACTIONS.FETCH_SUCCESS,
	      payload: {result, instanceName}
	    });
    }
    //
    let onError = (error) => {
	    this.onNext({
	      type: STORY_ACTIONS.FETCH_FAILURE,
	      payload: {error, instanceName}
	    })
    }
    //
    this.storyApi.findById(id).subscribe(onSuccess, onError);
	}


  /**
   * Get all stories
   */
	public all() {
    if(this.state.stories.list.isFetching) {
      return;
    }
    //
    this.onNext({ type: STORY_ACTIONS.FETCH_LIST_REQUEST });
    //
    let onSuccess = ({entities, result}) => {
    	this.saveEntity(entities);
    	this.onNext({
	      type: STORY_ACTIONS.FETCH_LIST_SUCCESS,
        payload: {result}
	    });
    }

    let onError = (error) => {
	    this.onNext({
	      type: STORY_ACTIONS.FETCH_LIST_FAILURE,
        payload: {error}
	    })
    }

    this.storyApi.all().subscribe(onSuccess, onError);
	}

  /**
   * Create new story
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {Object} attributes     Story attributes
   */
  public create(instanceName, attributes) {
    if(this.state.stories[instanceName].isFetching) {
      return;
    }
    
    this.onNext({
      type: STORY_ACTIONS.CREATE_REQUEST,
      payload: {instanceName}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: STORY_ACTIONS.CREATE_SUCCESS,
        payload: {result, instanceName}
      });
    }

    let onError = (error) => {
      this.onNext({
        type: STORY_ACTIONS.CREATE_FAILURE,
        payload: {error, instanceName}
      })
    }

    this.storyApi.create(attributes).subscribe(onSuccess, onError);
  }

  /**
   * Update story
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id         Story id
   * @param {Object} attributes Story attributes
   */
  public update(instanceName, id, attributes) {
    if(this.state.stories[instanceName].isUpdating) {
      return;
    }
    
    this.onNext({
      type: STORY_ACTIONS.UPDATE_REQUEST,
      payload: {id}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: STORY_ACTIONS.UPDATE_SUCCESS,
        payload: {result}
      });
    }

    let onError = (error) => {
      this.onNext({
        type: STORY_ACTIONS.UPDATE_FAILURE,
        payload: {error}
      })
    }

    this.storyApi.update(id, attributes).subscribe(onSuccess, onError);
  }

  /**
   * Create new story
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id         Story id
   * @param {Object} attributes     Story attributes
   */
  public replace(instanceName, id, attributes) {
    if(this.state.stories[instanceName].isUpdating) {
      return;
    }
    
    this.onNext({
      type: STORY_ACTIONS.REPLACE_REQUEST,
      payload: {id}
    });

    let onSuccess = ({entities, result}) => {
      this.saveEntity(entities);
      this.onNext({
        type: STORY_ACTIONS.REPLACE_SUCCESS,
        payload: {result, instanceName}
      });
    }

    let onError = (error) => {
      this.onNext({
        type: STORY_ACTIONS.REPLACE_FAILURE,
        payload: {error, instanceName}
      })
    }

    this.storyApi.replace(id, attributes).subscribe(onSuccess, onError);
  }

  /**
   * Create new story
   * @param {string} instanceName   Instance name e.g. detailsPage
   * @param {string} id             Story id
   */
  public remove(id) {
    this.onNext({
      type: STORY_ACTIONS.DELETE_REQUEST,
      payload: {id}
    });

    let onSuccess = () => {
      this.removeFromEntity('stories', id);
      this.onNext({
        type: STORY_ACTIONS.DELETE_SUCCESS,
        payload: {id}
      });
    }

    let onError = (error) => {
      this.onNext({
        type: STORY_ACTIONS.CREATE_FAILURE,
        payload: {error}
      })
    }

    this.storyApi.remove(id).subscribe(onSuccess, onError);
  }

  /**
   * Reset instance
   * @param {string} instanceName Story instance name
   */
  public reset(instanceName) {
    this.onNext({
      type: STORY_ACTIONS.RESET,
      payload: {instanceName}
    });
  }
}
