import { Schema, arrayOf, normalize } from 'normalizr';
import request = require('browser-request');
import {Subject, ISubject} from 'rx';
import {IResponseSuccess, IResponseError} from 'shared/response';

export interface IApiError extends IResponseError {
}

export interface IApiSuccess {
  result: string | string[];
  entities: any;
}

export abstract class BaseApi {

  protected version = 'v1';

  protected abstract getSchema(): Schema;

  protected call<T>(method, uri, data: any = {}) {

    // Log the current request
    this.log(method, uri, data);

    const options = {
      method: method,
      url: this.getUrl(uri),
      json: true,
      body: JSON.stringify(data)
    };

    const observable = new Subject<IApiSuccess>();

    request<any>(options, (err, response, body) => {
      if(err) {
        observable.onError(err);
      } else if(body.error) {
        observable.onError(body);
      } else if(body.result) {
        observable.onNext(
          this.normalizeResponse(body.result));
      } else {
        observable.onNext(body);
      }
    });

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

    return normalize(result, schema);
  }
}