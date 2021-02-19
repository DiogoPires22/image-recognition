import { HandlerError } from './handler-error';

export class ServerError extends Error implements HandlerError {
  constructor(reason: string) {
    super(`Server error: ${reason}.`);
    this.name = 'ServerError';
  }
}
