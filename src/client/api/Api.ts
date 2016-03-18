import { Schema, arrayOf, normalize } from 'normalizr'
import {fromJS, Map} from 'immutable';
import request = require('browser-request');
import {Subject, ISubject} from 'rx';
import {IResponseSuccess, IResponseError} from 'src/shared/response';

export interface IApiError extends IResponseError {
}

export interface IApiSuccess {
  result: Map<string, any>;
  entities: Map<string, any>;
}

export abstract class Api {

  protected version = 'v1';

  protected abstract getSchema(): Schema;

  protected call<T>(method, uri, data: any = {}) {

    // Convert from immutable to object
    data = Map.isMap(data) ? data.toObject() : data;

    // Log the current request
    this.log(method, uri, data);

    const options = {
      method: method,
      url: this.getUrl(uri),
      json: true,
      body: JSON.stringify(data)
    };

    const observable = new Subject<IApiSuccess>();

    request<any>(options, (err, response) => {
      if(err) {
        observable.onError(err);
      } else if(response.body.result) {
        observable.onNext(
          this.normalizeResponse(response.body.result));
      } else {
        observable.onNext(response.body);
      }
    })

    return observable;
  }

  protected post<T>(uri, data = {}) {
    return this.call<T>("POST", uri, data);
  }

  protected put<T>(uri, data = {}) {
    return this.call<T>("PUT", uri, data);
  }

  protected patch<T>(uri, data = {}) {
    return this.call<T>("PATCH", uri, data);
  }

  protected get<T>(uri) {
    return this.call<T>("GET", uri);
  }

  protected delete<T>(uri, data = {}) {
    return this.call<T>("DELETE", uri, data);
  }

  private log(method: string, uri: string, data: any) {
    console.log(`$$$Making a ${method.toUpperCase()} request to ${uri}`);
    console.log("$$$Data", data);
  }

  private getUrl(uri: string) {
    return `/api/${this.version}/${uri.replace(/^\/+/g, '')}`;
  }

  private normalizeResponse(result): IApiSuccess {
    let schema = result.constructor === Array ? 
      arrayOf(this.getSchema()) : this.getSchema();

    let normalizedResponse = normalize(result, schema);

    return {
      result: fromJS(normalizedResponse.result),
      entities: fromJS(normalizedResponse.entities)
    };
  }
}