
import { factoryBase64Image } from "./common"
import { factoryAnalyseImage, factoryAnalyseResults } from "./domain/models/analyse-image"


export default {
    domain: {
        model: {
            factoryAnalyseImage,
            factoryAnalyseResults
        }
    },
    common: {
        factoryBase64Image,
    }
}