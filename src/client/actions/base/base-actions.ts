import {Subject} from 'rx';
import {ENTITIES_ACTIONS} from 'client/constants/actions-constants';
import {IState} from 'client/reducers/state';

export abstract class BaseActions {

  protected observable: Subject<Object>;

  constructor(private getState) {
    this.observable = new Subject();
  }

  get state(): IState {
    return this.getState();
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
      payload: {entities}
    });
  }

  protected removeFromEntity(entityName, id) {
    this.onNext({
      type: ENTITIES_ACTIONS.REMOVE,
      payload: {entityName, id}
    });
  }
}
