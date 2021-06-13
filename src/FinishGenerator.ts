import Result from "./races/Result";
import WeekendObject from "./races/WeekendObject";

export default interface FinishGenerator {
    generate(weekendObject: WeekendObject): Promise<Result[]>
}
