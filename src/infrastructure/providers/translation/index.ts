import { Translate } from 'aws-sdk';
import { TranslationServiceError } from '../../../usecases/ports/translation/translation-error';
import { TranslateOptions, TranslationService } from '../../../usecases/ports/translation/translation-service';
import { Either, left, right } from '../../shared/either';

export default class TranslationProvider implements TranslationService {
  private readonly translationService: Translate;

  constructor(translate: Translate = new Translate()) {
    this.translationService = translate;
  }

  async translate(text: string, opt: TranslateOptions = { from: 'en', to: 'pt' }): Promise<Either<TranslationServiceError, string>> {
    try {
      const params = {
        SourceLanguageCode: opt.from,
        TargetLanguageCode: opt.to,
        Text: text,
      };

      const result = await this.translationService.translateText(params).promise();

      return right(result.TranslatedText);
    } catch {
      return left(new TranslationServiceError());
    }
  }
}