import AnalyseImage, { AnalyseResult } from '../../domain/models/analyse-image/analyse-image';
import { left, right } from '../../infrastructure/shared/either';
import { RecognitionServiceError } from '../ports/recognition/recognition-error';
import { RecognitionService } from '../ports/recognition/recognition-service';
import { InvalidParameterError } from '../shared/usecase-error';
import { TranslationService } from '../ports/translation/translation-service';
import { analyseImageUsecaseDTOAdapter, AnalyseImageUsecaseResponse } from './analyse-image-response';
import { TranslationServiceError } from '../ports/translation/translation-error';

export default class AnalyseImageUsecase {
  private readonly recognitionService: RecognitionService;

  private readonly translationService: TranslationService;

  constructor(recognitionService: RecognitionService, translationService: TranslationService) {
    this.recognitionService = recognitionService;
    this.translationService = translationService;
  }

  async analyse(base64: string, minConfidence?: number): Promise<AnalyseImageUsecaseResponse> {
    const image = AnalyseImage.create(base64);

    if (image.isLeft()) {
      return left(new InvalidParameterError());
    }

    const analyseImage = image.value;
    const recognitionResults = await this.recognitionService
      .analyseImage(analyseImage.buffer, minConfidence);

    if (recognitionResults.isLeft()) {
      return left(new RecognitionServiceError());
    }

    const translatedResult: AnalyseResult[] = [];

    recognitionResults.value.forEach(async (item: AnalyseResult) => {
      const translatedLabel = await this.translationService.translate(item.label);
      if (translatedLabel.isLeft()) {
        return left(new TranslationServiceError());
      }
      translatedResult.push({ ...item, label: translatedLabel.value } as AnalyseResult);
    });

    analyseImage.setRecognitionResult(translatedResult);

    const usecaseResult = analyseImageUsecaseDTOAdapter(base64, analyseImage);

    return right(usecaseResult);
  }
}
