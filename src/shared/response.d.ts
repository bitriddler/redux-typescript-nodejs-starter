export interface IResponseError {
  statusCode: Number;
  error: {
    type: string;
    description: string;
    message: string;
  }
}

export interface IResponseSuccess<R> {
  statusCode: Number;
  result: R;
}
