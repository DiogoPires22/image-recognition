import { AnalyseImageUsecaseDTO, ResultDTO } from "../../../../src/usecases/analyse-image/analyse-image-response"
import * as faker from "faker";
import { factoryBase64Image } from "../../common";

const factoryAnalyseImageResultDTO = (number = 0): ResultDTO[] => {
    const analyseResults: ResultDTO[] = [];

    for (let i = 0; i < number; i++) {
        analyseResults.push(new ResultDTO(faker.random.number(100), faker.vehicle.type()));
    }

    return analyseResults;
}

export const factoryAnalyseImageUsecaseDTO = async (): Promise<AnalyseImageUsecaseDTO> => {
    const base64 = await factoryBase64Image();
    const results = factoryAnalyseImageResultDTO(3);
    return new AnalyseImageUsecaseDTO(base64, results);
}
