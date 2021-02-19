import { Either, left, right } from '../../../infrastructure/shared/either';
import { DomainError } from '../shared/domain-error';
import { InvalidBase64Error } from './error';
import { Buffer } from "node:buffer";

export class AnalyseResult {
  readonly confidence: number

  readonly label: string

  constructor(confidence: number, label: string) {
    this.confidence = confidence;
    this.label = label;
  }
}

export default class AnalyseImage {
  readonly buffer: Buffer

  analyseResult: AnalyseResult[]

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  public setRecognitionResult(analyseResult: AnalyseResult[]): void {
    this.analyseResult = analyseResult;
  }

  public getResultString(): string {
    if (!this.analyseResult) {
      return '';
    }
    return this.analyseResult
      .map((result) => `${result.label} ${result.confidence}`)
      .join(' and ');
  }

  static create(base64: string, analyseResult?: AnalyseResult[]): Either<DomainError, AnalyseImage> {
    try {
      const buffer = Buffer.from(base64, 'base64');

      const image = new AnalyseImage(buffer);

      if (analyseResult) {
        image.setRecognitionResult(analyseResult);
      }
      return right(image);
    } catch {
      return left(new InvalidBase64Error());
    }
  }
}
