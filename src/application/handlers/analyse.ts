import { AnalyseImageUsecaseResponse } from '../../usecases/analyse-image/analyse-image-response';
import AnalyseImageUsecase from '../../usecases/analyse-image/analyse-image-usecase';

import  makeAnalyseHandler from '../container';
import { ok } from '../helpers/http-helper';

export class AnalyseHandler {
  private readonly _analyseImageUseCase: AnalyseImageUsecase;

  constructor(analyseImage: AnalyseImageUsecase) {
    this._analyseImageUseCase = analyseImage;
  }

  async main(event) {
    if (event.body !== null && event.body !== undefined) {
      const body = JSON.parse(event.body);
      const { base64 } = body;
      const minConfidence = body.minConfidence || null;

      const result: AnalyseImageUsecaseResponse = await this._analyseImageUseCase.analyse(base64, minConfidence);

      return ok(result.value);
    }
  }
}

const handler = makeAnalyseHandler();

export default {
  main: handler.main.bind(handler)
}
