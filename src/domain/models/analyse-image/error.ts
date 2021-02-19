import { DomainError } from '../shared/domain-error';

export class InvalidBase64Error implements DomainError {
  message = 'Invalid base64 error';
}

export class InvalidPercentageError implements DomainError {
  message = 'Invalid percentage';
}
