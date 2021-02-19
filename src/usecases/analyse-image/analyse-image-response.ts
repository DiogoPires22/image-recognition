import { Either } from '../../infrastructure/shared/either';
import { InvalidParameterError } from '../shared/usecase-error';
import { RecognitionServiceError } from '../ports/recognition/recognition-error';
import AnalyseImage from '../../domain/models/analyse-image/analyse-image';

export class ResultDTO {
  confidence: number;

  label: string;

  constructor(confidence: number, label: string) {
    this.confidence = confidence;
    this.label = label;
  }
}

export class AnalyseImageUsecaseDTO {
  base64: string;

  results: ResultDTO[];

  constructor(base: string, results: ResultDTO[]) {
    this.base64 = base;
    this.results = results;
  }
}


export const analyseImageUsecaseDTOAdapter = (base64: string, analyseImage: AnalyseImage): AnalyseImageUsecaseDTO => {
  const results = analyseImage.analyseResult.map((result) => new ResultDTO(result.confidence, result.label));
  return new AnalyseImageUsecaseDTO(base64, results);
};

export type AnalyseImageUsecaseResponse = Either<InvalidParameterError | RecognitionServiceError, AnalyseImageUsecaseDTO>;
