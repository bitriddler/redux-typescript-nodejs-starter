import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";
import {StoryApi} from "src/client/api/StoryApi";
import {routeActions} from 'redux-simple-router';

export class CreateStoryAction extends ActionCreator {

  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  run(instance, attributes) {
    this.onNext({ type: STORY_ACTIONS.CREATE_REQUEST, instance });

    this.storyApi.create(attributes)
      .subscribe(
        (res) => this.onSuccess(instance, res),
        (error) => this.onError(instance, error));
  }

  private onSuccess(instance, res) {
    this.saveEntity(res.entities);
    this.onNext({
      type: STORY_ACTIONS.CREATE_SUCCESS,
      result: res.result,
      instance
    });
  }

  private onError(instance, error) {
    this.onNext({
      type: STORY_ACTIONS.CREATE_FAILURE,
      error: error,
      instance
    })
  }
}