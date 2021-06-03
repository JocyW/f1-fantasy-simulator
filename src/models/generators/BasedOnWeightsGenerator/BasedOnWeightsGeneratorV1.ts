import FinishGenerator from "../../../interfaces/FinishGenerator";
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../Logger";
import WeekendObject from "../../races/WeekendObject";
import Result from "../../races/Result";
import WeightMap from "./WeightMap";
import Race from "../../races/Race";
import BasedOnWeightsGenerator from "./BasedOnWeightsGenerator";

export default class BasedOnWeightsGeneratorV1 extends BasedOnWeightsGenerator implements FinishGenerator, WithLogger {

    static NORMALIZE_TO = 1000;

    public logger: Logger;

    constructor(weights: WeightMap[]) {
        super(weights)
        this.logger = new Logger('BasedOnWeightsGeneratorV1')
        this.logger.debug('ctr', weights);
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        let copiedWeights = [...this.weightMaps.map((weightMap) => ({...weightMap}))];

        // Incorporate qualifying results into race results
        if (weekendObject instanceof Race) {
            copiedWeights = copiedWeights.map((weightMap) => {
                weightMap.weight += (copiedWeights.length - weekendObject.qualifying.results.find((result) => {
                    return result.driver.id === weightMap.driver.id
                }).place) * BasedOnWeightsGeneratorV1.NORMALIZE_TO * 0.1
                return weightMap
            })
        }

        let totalWeights;
        let placeCounter = 1;
        const res = [];

        do {
            totalWeights = 0;
            for (let weightMap of copiedWeights) {
                weightMap.cumulativeWeight = totalWeights += weightMap.weight;
            }

            const rand = Math.random() * totalWeights;

            let weightMap = copiedWeights.find((weightMap) => rand <= weightMap.cumulativeWeight);
            this.logger.debug('weightMap', weightMap, copiedWeights);
            res.push(new Result({
                place: placeCounter,
                driver: weightMap.driver
            }));

            copiedWeights.splice(copiedWeights.indexOf(weightMap), 1);
            placeCounter++;
        } while (copiedWeights.length > 0)

        return res;
    }


}
