import FinishGenerator from "../../../interfaces/FinishGenerator";
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../Logger";
import WeekendObject from "../../races/WeekendObject";
import Result from "../../races/Result";
import WeightMap from "./WeightMap";

export default class BasedOnWeightsGenerator implements FinishGenerator, WithLogger {
    public logger: Logger;
    private weightMaps: WeightMap[];
    private prepared = false;

    constructor(weights: WeightMap[]) {
        this.weightMaps = weights;
        this.logger = new Logger('BasedOnWeightsGenerator')
        this.logger.debug('ctr', weights);
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        let copiedWeights = [...this.weightMaps];
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
