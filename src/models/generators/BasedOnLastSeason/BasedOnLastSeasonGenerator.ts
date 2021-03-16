import FinishGenerator from "../../../interfaces/FinishGenerator";
import HasResults from "../../higher/HasResults";
import Result from "../../races/Result";

export default class BasedOnLastSeasonGenerator implements FinishGenerator{
    generate(finishable: HasResults): Result[] {
        return [];
    }

}
