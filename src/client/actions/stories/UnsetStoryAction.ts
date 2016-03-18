import {ActionCreator} from "src/client/actions/ActionCreator";
import {STORY_ACTIONS} from "src/client/constants/ActionTypes";

export class UnsetStoryAction extends ActionCreator {

  run(instance) {
    this.onNext({ type: STORY_ACTIONS.UNSET, instance });
  }
}