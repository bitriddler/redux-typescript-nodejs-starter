import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {DevTools} from 'src/client/components/dev/dev-tools.component';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux';
import {reducers} from 'src/client/reducers/index';
import {isDevEnv} from 'src/shared/helpers';

export function configureStore(initialState = {}) {

  /// a method to create story
  const finalCreateStore = compose(
    applyMiddleware(routerMiddleware(browserHistory)),
    DevTools.instrument()
  )(createStore)

  reducers['routing'] = routerReducer;

  const rootReducer = combineReducers(reducers);

  const store = finalCreateStore(rootReducer, initialState);

  const history = syncHistoryWithStore(browserHistory, store);

  if (isDevEnv() && (<any>module).hot) {
    // Enable Webpack hot module replacement for reducers
    (<any>module).hot.accept('../reducers', () => {
      console.log("new reducers");
      const nextRootReducer = rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, history };
}
