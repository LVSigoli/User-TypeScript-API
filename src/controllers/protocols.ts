export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<Body> {
  params?: unknown;
  headers?: unknown;
  body: Body;
}
