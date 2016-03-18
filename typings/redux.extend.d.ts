declare module ReduxSimpleRouter {
  function syncReduxAndRouter(history: any, state: any): any;
  function routeReducer(state: any, action: any): any;
  function syncHistory(history: any): any;
  export interface IRouteActions {
    push: (path: string) => Object;
    replace: (path: string) => Object;
  }
  const routeActions: IRouteActions;
}
declare module "redux-simple-router" {
  export = ReduxSimpleRouter;
}
///////////////////////////////////
// Redux Immutable Js
///////////////////////////////////
declare module ReduxImmutableJs {
  function combineReducers(...reducers: any[]): any;
}
declare module "redux-immutablejs" {
    export = ReduxImmutableJs;
}
///////////////////////////////////
// Redux Dev tools
///////////////////////////////////
declare module ReduxDevTools {
  function createDevTools(component: any): any;
}
declare module "redux-devtools" {
  export = ReduxDevTools;
}
///////////////////////////////////
// Redux Log monitor
///////////////////////////////////
declare module "redux-devtools-log-monitor" {
  export default class LogMonitor extends __React.Component<any, any> {}
}
///////////////////////////////////
// Redux Dock monitor
///////////////////////////////////
declare module "redux-devtools-dock-monitor" {
  export default class DockMonitor extends __React.Component<any, any> {}
}
