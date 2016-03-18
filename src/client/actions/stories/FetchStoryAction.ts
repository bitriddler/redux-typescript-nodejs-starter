import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";
import {StoryApi} from "src/client/api/StoryApi";
import {Map} from 'immutable';

export class FetchStoryAction extends ActionCreator {

  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  getInstance(instance) {
    return this.state.stories.get('instances').get(instance, Map());
  }

  run(instance, id) {

    if(this.getInstance(instance).get('isFetching') ||
      this.getInstance(instance).get('isUpdating')) {
      return;
    }

    this.onNext({ type: STORY_ACTIONS.FETCH_REQUEST, id, instance });

    this.storyApi.findById(id)
      .subscribe(
        (res) => this.onSuccess(instance, res),
        (error) => this.onError(instance, error));
  }

  private onSuccess(instance, res) {
    this.saveEntity(res.entities);
    this.onNext({
      type: STORY_ACTIONS.FETCH_SUCCESS,
      result: res.result,
      instance
    });
  }

  private onError(instance, error) {
    this.onNext({
      type: STORY_ACTIONS.FETCH_FAILURE,
      instance,
      error: error
    })
  }
}