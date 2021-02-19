import { UseCaseError } from '../../shared/usecase-error';

export class TranslationServiceError extends Error implements UseCaseError {
  constructor() {
    super('translation service error.');
    this.name = 'TranslationServiceError';
  }
}
