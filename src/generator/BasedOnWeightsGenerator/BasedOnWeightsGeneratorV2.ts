import FinishGenerator from "../FinishGenerator";
import WithLogger from "../../logging/WithLogger";
import Logger from "../../logging/Logger";
import WeekendObject from "../../race/weekend_object/WeekendObject";
import Result from "../../race/Result";
import WeightMap from "./WeightMap";
import Race from "../../race/weekend_object/Race";
import BasedOnWeightsGenerator from "./BasedOnWeightsGenerator";

export default class BasedOnWeightsGeneratorV2 extends BasedOnWeightsGenerator implements FinishGenerator, WithLogger {

    public logger: Logger;

    constructor(weights: WeightMap[]) {
        super(weights)
        this.logger = new Logger('BasedOnWeightsGeneratorV2')
        this.logger.debug('ctr', weights);
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        let copiedWeights = [...this.weightMaps.map((weightMap) => ({...weightMap}))];

        // Incorporate qualifying results into race results
        if (weekendObject instanceof Race) {
            copiedWeights = copiedWeights.map((weightMap) => {
                weightMap.weight += (copiedWeights.length - weekendObject.qualifying.results.find((result) => {
                    return result.driver.id === weightMap.driver.id
                }).place) * BasedOnWeightsGenerator.NORMALIZE_TO * 0.5
                return weightMap
            })
        }

        for (let weightMap of copiedWeights) {
            weightMap.weight = weightMap.weight * 2 + Math.random() * BasedOnWeightsGenerator.NORMALIZE_TO * 0.5;
        }

        copiedWeights.sort((wmA, wmB) => wmB.weight - wmA.weight);

        let i = 1;
        return copiedWeights.map((weightMap) => new Result({driver: weightMap.driver, place: i++}))
    }
}
