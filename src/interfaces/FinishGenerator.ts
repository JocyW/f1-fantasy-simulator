import HasResults from "../models/higher/HasResults";
import Result from "../models/races/Result";

export default interface FinishGenerator{
    generate(finishable: HasResults): Result[]
}
