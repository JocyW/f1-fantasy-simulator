import Result from "../models/races/Result";
import WeekendObject from "../models/races/WeekendObject";

export default interface FinishGenerator {
    generate(weekendObject: WeekendObject): Promise<Result[]>
}
