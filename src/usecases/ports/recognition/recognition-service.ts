import { AnalyseResult } from '../../../domain/models/analyse-image/analyse-image'
import { Either } from '../../../infrastructure/shared/either'
import { RecognitionServiceError } from './recognition-error'
import { Buffer } from "node:buffer"

export interface RecognitionService {
  analyseImage: (buffer: Buffer, minConfidence?: number) => Promise<Either<RecognitionServiceError, AnalyseResult[]>>;
}
