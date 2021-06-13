import Result from "../race/Result";
import WeekendObject from "../race/weekend_object/WeekendObject";

export default interface FinishGenerator {
    generate(weekendObject: WeekendObject): Promise<Result[]>
}
