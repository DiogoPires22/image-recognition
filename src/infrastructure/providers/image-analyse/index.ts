import { Rekognition } from 'aws-sdk';
import { DetectLabelsRequest } from 'aws-sdk/clients/rekognition';
import { AnalyseResult } from '../../../domain/models/analyse-image/analyse-image';
import { RecognitionServiceError } from '../../../usecases/ports/recognition/recognition-error';
import { RecognitionService } from '../../../usecases/ports/recognition/recognition-service';
import { Either, left, right } from '../../shared/either';
import { Buffer } from "node:buffer";

export default class ImageAnalyseProvider implements RecognitionService {
  private readonly _rekoSvc: Rekognition;

  constructor(rekoSvc = new Rekognition()) {
    this._rekoSvc = rekoSvc;
  }

  async analyseImage(buffer: Buffer, minConfidence?: number): Promise<Either<RecognitionServiceError, AnalyseResult[]>> {
    const params: DetectLabelsRequest = {
      Image: {
        Bytes: Buffer,
      },
    };

    if (minConfidence) {
      params.MinConfidence = minConfidence;
    }

    try {
      const result = await this._rekoSvc.detectLabels(params).promise();

      if (result) {
        const results = (result.Labels || [])
          .map(({ Name, Confidence }) => new AnalyseResult(Confidence, Name));

        return right(results);
      }

      return right([]);
    } catch {
      return left(new RecognitionServiceError());
    }
  }
}
