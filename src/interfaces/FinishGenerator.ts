import Finishable from "../models/higher/Finishable";
import Result from "../models/Result";

export default interface FinishGenerator{
    generate(finishable: Finishable): Result[]
}
