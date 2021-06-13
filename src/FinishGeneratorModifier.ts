import FinishGenerator from "./FinishGenerator";
import WeekendObject from "./races/WeekendObject";
import Result from "./races/Result";

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
