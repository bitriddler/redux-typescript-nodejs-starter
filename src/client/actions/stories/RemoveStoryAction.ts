import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";
import {StoryApi} from "src/client/api/StoryApi";

export class RemoveStoryAction extends ActionCreator {

  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  run(instance, id) {
    this.onNext({ type: STORY_ACTIONS.DELETE_REQUEST, instance });

    this.storyApi.remove(id)
      .subscribe(
        (res) => this.onSuccess(instance, id),
        (error) => this.onError(instance, error));
  }

  private onSuccess(instance, id) {
    this.removeFromEntity('stories', id);
    this.onNext({
      type: STORY_ACTIONS.DELETE_SUCCESS,
      instance
    });
  }

  private onError(instance, error) {
    this.onNext({
      type: STORY_ACTIONS.DELETE_FAILURE,
      error: error,
      instance
    })
  }
}