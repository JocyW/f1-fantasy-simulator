import HasResults from "./HasResults";
import Simulateable from "../../interfaces/Simulateable";
import Driver from "../roster/Driver";
import FinishGenerator from "../../interfaces/FinishGenerator";

export default abstract class WeekendObject extends HasResults implements Simulateable{

    abstract type: string;

    abstract getDriverScore(driver: Driver, isTeam: boolean): number
    abstract simulate(generator: FinishGenerator): void
}
