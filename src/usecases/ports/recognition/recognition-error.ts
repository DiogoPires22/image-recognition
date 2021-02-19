import { UseCaseError } from '../../shared/usecase-error';

export class RecognitionServiceError implements UseCaseError {
  message: string

  constructor() {
    this.message = 'recognition service error.';
  }
}
