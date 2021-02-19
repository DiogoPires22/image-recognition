export interface UseCaseError {
  message: string;
}

export class InvalidParameterError implements UseCaseError {
  message: string

  constructor() {
    this.message = 'Invalid parameter error';
  }
}
