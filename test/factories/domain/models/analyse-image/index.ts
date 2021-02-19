import * as faker from 'faker'
import AnalyseImage, { AnalyseResult } from '../../../../../src/domain/models/analyse-image/analyse-image'
import { factoryBase64Image } from '../../../common'

export const factoryAnalyseResults = (number = 1): AnalyseResult[] => {
  const analyseResults: AnalyseResult[] = []

  for (let i = 0; i < number; i++) {
    analyseResults.push(new AnalyseResult(faker.random.number(100), faker.vehicle.type()))
  }

  return analyseResults
}
export const factoryAnalyseImage = async (number = 1): Promise<AnalyseImage> => {
  const result = AnalyseImage.create(await factoryBase64Image(), factoryAnalyseResults(number))

  if (result.isLeft()) {
    throw Error()
  }

  return result.value
}

