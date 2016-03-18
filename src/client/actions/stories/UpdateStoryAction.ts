import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";
import {StoryApi} from "src/client/api/StoryApi";

export class UpdateStoryAction extends ActionCreator {

  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  getInstance(instance) {
    return this.state.stories.get('instances').get(instance);
  }

  run(instance, id, attributes) {
    if(this.getInstance(instance).get('isUpdating')) {
      return;
    }

    this.onNext({ type: STORY_ACTIONS.UPDATE_REQUEST, instance });

    this.storyApi.update(id, attributes)
      .subscribe(
        (res) => this.onSuccess(instance, res),
        (error) => this.onError(instance, error));
  }

  private onSuccess(instance, res) {
    this.saveEntity(res.entities);
    this.onNext({
      type: STORY_ACTIONS.UPDATE_SUCCESS,
      result: res.result,
      instance
    });
  }

  private onError(instance, error) {
    this.onNext({
      type: STORY_ACTIONS.UPDATE_FAILURE,
      error: error,
      instance
    })
  }
}