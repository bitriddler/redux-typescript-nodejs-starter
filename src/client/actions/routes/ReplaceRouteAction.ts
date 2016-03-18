import {ActionCreator} from "src/client/actions/ActionCreator";
import {routeActions} from 'redux-simple-router';

export class ReplaceRouteAction extends ActionCreator {

  run({url}) {
    this.onNext(routeActions.replace(url));
  }
}