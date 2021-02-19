import AnalyseImage, { AnalyseResult } from './analyse-image';
import * as Factory from '../../../../test/factories';

describe('AnalyseImage create', () => {
  test('should return a AnalyseImage whe creation was ok', async () => {
    const result = AnalyseImage.create(await Factory.default.common.factoryBase64Image());
    expect(result.isRight()).toBeTruthy();
  });

  test('should return a error when input a invalid base64 string', async () => {
    const result = AnalyseImage.create('');
    expect(result.isLeft()).toBeTruthy();
  });
});
