import FinishGenerator from "../../../interfaces/FinishGenerator";
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../Logger";
import WeekendObject from "../../races/WeekendObject";
import Result from "../../races/Result";
import WeightMap from "./WeightMap";
import Race from "../../races/Race";
import BasedOnWeightsGenerator from "./BasedOnWeightsGenerator";

export default class BasedOnWeightsGeneratorV2 extends BasedOnWeightsGenerator implements FinishGenerator, WithLogger {

    public logger: Logger;

    constructor(weights: WeightMap[]) {
        super(weights)
        this.logger = new Logger('BasedOnWeightsGenerator')
        this.logger.debug('ctr', weights);
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        let copiedWeights = [...this.weightMaps.map((weightMap) => ({...weightMap}))];

        // Incorporate qualifying results into race results
        if (weekendObject instanceof Race) {
            copiedWeights = copiedWeights.map((weightMap) => {
                weightMap.weight += (copiedWeights.length - weekendObject.qualifying.results.find((result) => {
                    return result.driver.id === weightMap.driver.id
                }).place) * BasedOnWeightsGenerator.NORMALIZE_TO * 0.2
                return weightMap
            })
        }

        for (let weightMap of copiedWeights) {
            weightMap.weight = weightMap.weight + Math.random() * BasedOnWeightsGenerator.NORMALIZE_TO * 0.5;
        }

        copiedWeights.sort((wmA, wmB) => {
            return wmB.weight - wmA.weight
        });

        let i = 1;
        return copiedWeights.map((weightMap) => {
            return new Result({driver: weightMap.driver, place: i++})
        })
    }


}
