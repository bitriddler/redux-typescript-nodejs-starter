import {ActionCreator} from "src/client/actions/ActionCreator";
import {routeActions} from 'redux-simple-router';

export class PushRouteAction extends ActionCreator {

  run(url: string) {
    this.onNext(routeActions.push(url));
  }
}