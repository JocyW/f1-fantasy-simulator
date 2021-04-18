import FinishGenerator from "../../../interfaces/FinishGenerator";
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../../logger";
import WeekendObject from "../../higher/WeekendObject";
import Result from "../../races/Result";
import WeightMap from "./WeightMap";

export default class BasedOnWeightsGenerator implements FinishGenerator, WithLogger {
    public logger: Logger;
    private weightMaps: WeightMap[];
    private prepared = false;
    private totalWeights = 0;

    constructor(weights: WeightMap[]) {
        this.weightMaps = weights;
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        await this.prepare();

        let copiedWeights = [...this.weightMaps];
        let copiedTotal = this.totalWeights;
        let placeCounter = 1;
        const res = [];


        do {
            const rand = Math.random() * copiedTotal;

            let weightMap = copiedWeights.find((weightMap) => rand <= weightMap.cumulativeWeight);

            res.push(new Result({
                place: placeCounter,
                driver: weightMap.driver
            }));

            copiedWeights = copiedWeights.splice(copiedWeights.indexOf(weightMap), 1);
            copiedTotal -= weightMap.weight;
            placeCounter++;
        } while (copiedWeights.length > 0)

        return res;
    }

    private async prepare() {
        if (this.prepared) return;

        for (let weightMap of this.weightMaps) {
            weightMap.cumulativeWeight = this.totalWeights += weightMap.weight;
        }

        this.prepared = true;
    }


}
