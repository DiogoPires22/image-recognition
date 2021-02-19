import AnalyseImage, { AnalyseResult } from '../../domain/models/analyse-image/analyse-image';
import { Either, left, right } from '../../infrastructure/shared/either';
import { RecognitionServiceError } from '../ports/recognition/recognition-error';
import { RecognitionService } from '../ports/recognition/recognition-service';
import { TranslationServiceError } from '../ports/translation/translation-error';
import { TranslateOptions, TranslationService } from '../ports/translation/translation-service';
import { InvalidParameterError } from '../shared/usecase-error';
import AnalyseImageUsecase from './analyse-image-usecase';
import * as analyseImageResponseModule from './analyse-image-response';
import { factoryAnalyseResults } from '../../../test/factories/domain/models/analyse-image';
import { factoryAnalyseImageUsecaseDTO } from '../../../test/factories/usecases/analyse-image';
import * as Factory from '../../../test/factories';
import { Buffer } from "node:buffer";

jest.mock('../../domain/models/analyse-image/analyse-image');
jest.mock('./analyse-image-response');

// TODO: extract to factory module////////////////////////////////

class RecognitionServiceStub implements RecognitionService {
  async analyseImage(buffer: Buffer, minConfidence?: number): Promise<Either<RecognitionServiceError, AnalyseResult[]>> {
    return right(factoryAnalyseResults(3));
  }
}

class TranslationServiceStub implements TranslationService {
  async translate(text: string, opt?: TranslateOptions): Promise<Either<TranslationServiceError, string>> {
    return right('faketext');
  }
}

const makeSubject = (): { subject: AnalyseImageUsecase; recoService: RecognitionService; translationService: TranslationService } => {
  const recoService = new RecognitionServiceStub();
  const translationService = new TranslationServiceStub();
  const subject = new AnalyseImageUsecase(recoService, translationService);
  return { subject, recoService, translationService };
};

/// //////////////////////////////////////////////////////////////

describe('Recognize a image on analyse image use case', () => {
  test('should return a error if occurs a error in RecognitionService integration', async () => {
    const mockCreateResult = jest.fn().mockReturnValue(right(Factory.default.domain.model.factoryAnalyseImage()));
    AnalyseImage.create = mockCreateResult;

    const { subject, recoService } = makeSubject();
    jest.spyOn(recoService, 'analyseImage').mockReturnValueOnce(Promise.resolve(left(new RecognitionServiceError())));
    const result = await subject.analyse(await Factory.default.common.factoryBase64Image());
    expect(result.value).toBeInstanceOf(RecognitionServiceError);
  });

  test('should return a error if occurs a error in AnalyseImage creation', async () => {
    const invalidBase64ImageString = 'loremipsum';
    const mockCreateResult = jest.fn().mockReturnValue(left(new InvalidParameterError()));
    AnalyseImage.create = mockCreateResult;

    const { subject } = makeSubject();
    const result = await subject.analyse(invalidBase64ImageString);
    expect(result.value).toBeInstanceOf(InvalidParameterError);
  });

  test('should return a result AnalyseImageUsecaseDTO if all are ok', async () => {
    const expected = await factoryAnalyseImageUsecaseDTO();
    const analyseImage = Factory.default.domain.model.factoryAnalyseImage();
    const analyseResults = Factory.default.domain.model.factoryAnalyseResults(3);
    const mockCreateResult = jest.fn().mockReturnValue(right(analyseImage));
    AnalyseImage.create = mockCreateResult;

    const { subject, recoService } = makeSubject();
    jest.spyOn(recoService, 'analyseImage').mockReturnValueOnce(Promise.resolve(right(analyseResults)));
    jest.spyOn(analyseImageResponseModule, 'analyseImageUsecaseDTOAdapter')
      .mockReturnValue(expected);
    const result = await subject.analyse(await Factory.default.common.factoryBase64Image());

    expect(result.value).toEqual(expected);
  });
});
