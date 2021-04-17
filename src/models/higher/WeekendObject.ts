import HasResults from "./HasResults";
import Simulateable from "../../interfaces/Simulateable";
import Driver from "../roster/Driver";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "../races/Result";

export default abstract class WeekendObject extends HasResults implements Simulateable {

    abstract type: string;

    abstract getDriverScore(driver: Driver, isTeam: boolean): Promise<number>

    async simulate(generator: FinishGenerator): Promise<Result[]> {
        return this.results = await generator.generate(this)
    }
}
