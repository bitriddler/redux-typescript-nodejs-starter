import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";
import {StoryApi} from "src/client/api/StoryApi";

export class FetchStoriesAction extends ActionCreator {

  constructor(getState, public storyApi: StoryApi) {
    super(getState);
  }

  run() {
    if(this.state.stories.get('list').get('isFetching')) {
      return;
    }

    this.onNext({ type: STORY_ACTIONS.FETCH_LIST_REQUEST });

    this.storyApi.all()
      .subscribe(
        (res) => this.onSuccess(res),
        (error) => this.onError(error));
  }

  private onSuccess(res) {
    this.saveEntity(res.entities);
    this.onNext({
      type: STORY_ACTIONS.FETCH_LIST_SUCCESS,
      result: res.result
    });
  }

  private onError(error) {
    this.onNext({
      type: STORY_ACTIONS.FETCH_LIST_FAILURE,
      error: error
    })
  }
}