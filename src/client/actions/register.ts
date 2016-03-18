import {Observable} from 'rx';
import {kernel} from 'src/client/index';

export function registerActionCreators() {

  let observables = [];

  for(let key in kernel.actionCreators) {
    observables.push(kernel.actionCreators[key].getObservable());
  }

  Observable.merge(observables)
    .subscribe((action) => {
      kernel.store.dispatch(action);
    });
}