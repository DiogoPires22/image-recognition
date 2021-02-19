import { Either } from '../../../infrastructure/shared/either';
import { TranslationServiceError } from './translation-error';

export interface TranslateOptions{
  from: string;
  to: string;
}

export interface TranslationService {
  translate: (text: string, opt?: TranslateOptions) =>
  Promise<Either<TranslationServiceError, string>>;
}
