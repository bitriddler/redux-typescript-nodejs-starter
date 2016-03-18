import {Store} from 'redux';
import {Subject} from 'rx';
import {ENTITIES_ACTIONS} from "src/client/constants/ActionTypes";

export abstract class ActionCreator {

  protected observable: Subject<Object>;

  constructor(private getState) {
    this.observable = new Subject();
  }

  getObservable() {
    return this.observable;
  }

  protected onNext(action) {
    this.observable.onNext(action);
  }

  protected saveEntity(entities) {
    this.onNext({
      type: ENTITIES_ACTIONS.SAVE,
      entities
    });
  }

  protected removeFromEntity(entityName, id) {
    this.onNext({
      type: ENTITIES_ACTIONS.REMOVE,
      entityName,
      id
    });
  }

  get state() { return this.getState() }

  abstract run(...any): any;
}
