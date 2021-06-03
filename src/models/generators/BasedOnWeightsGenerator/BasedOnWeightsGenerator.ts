import WeightMap from "./WeightMap";
import FinishGenerator from "../../../interfaces/FinishGenerator";
import WeekendObject from "../../races/WeekendObject";
import Result from "../../races/Result";

export default abstract class BasedOnWeightsGenerator implements FinishGenerator {
    static NORMALIZE_TO = 1000;
    protected weightMaps: WeightMap[];

    constructor(weightMaps: WeightMap[]) {
        this.weightMaps = weightMaps
    }

    abstract generate(weekendObject: WeekendObject): Promise<Result[]>;
}
