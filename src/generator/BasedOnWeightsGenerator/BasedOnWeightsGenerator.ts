import WeightMap from "./WeightMap";
import FinishGenerator from "../FinishGenerator";
import WeekendObject from "../../race/weekend_object/WeekendObject";
import Result from "../../race/Result";

export default abstract class BasedOnWeightsGenerator implements FinishGenerator {
    static NORMALIZE_TO = 1000;
    protected weightMaps: WeightMap[];

    constructor(weightMaps: WeightMap[]) {
        this.weightMaps = weightMaps
    }

    abstract generate(weekendObject: WeekendObject): Promise<Result[]>;
}
