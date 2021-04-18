import HasResults from "../models/higher/HasResults";
import Result from "../models/races/Result";
import WeekendObject from "../models/higher/WeekendObject";

export default interface FinishGenerator {
    generate(weekendObject: WeekendObject): Promise<Result[]>
}
