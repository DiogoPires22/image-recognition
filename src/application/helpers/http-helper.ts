import { ServerError } from '../errors/server-error';

export interface HttpResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason),
});
