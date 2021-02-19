import ImageAnalyseProvider from '../../infrastructure/providers/image-analyse';
import TranslationProvider from '../../infrastructure/providers/translation';
import AnalyseImageUsecase from '../../usecases/analyse-image/analyse-image-usecase';
import { RecognitionService } from '../../usecases/ports/recognition/recognition-service';
import { TranslationService } from '../../usecases/ports/translation/translation-service';
import { AnalyseHandler } from '../handlers/analyse';

// DI
const makeAnalyseHandler = (): AnalyseHandler => {
  const recognitionService: RecognitionService = new ImageAnalyseProvider();
  const translationService: TranslationService = new TranslationProvider();

  const analyseUseCase = new AnalyseImageUsecase(recognitionService, translationService);

  const handler = new AnalyseHandler(analyseUseCase);

  return handler;
}

export default makeAnalyseHandler;
