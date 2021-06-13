import FinishGenerator from "./FinishGenerator";
import WeekendObject from "../race/weekend_object/WeekendObject";
import Result from "../race/Result";

export default abstract class FinishGeneratorModifier implements FinishGenerator {
    protected generator: FinishGenerator;

    protected constructor(finishGenerator: FinishGenerator) {
        this.generator = finishGenerator;
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        return await this.modify(weekendObject, await this.generator.generate(weekendObject))
    }

    abstract modify(weekendObject: WeekendObject, results: Result[]): Promise<Result[]>

}
