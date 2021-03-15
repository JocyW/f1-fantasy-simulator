import HasResults from "./HasResults";
import Scoreable from "../../interfaces/Scoreable";
import Simulateable from "../../interfaces/Simulateable";
import Driver from "../roster/Driver";
import Team from "../roster/Team";

export default abstract class WeekendObject extends HasResults implements Scoreable, Simulateable{
    abstract getDriverScore(driver: Driver): number
    abstract getTeamScore(team: Team): number
    abstract simulate(): void
}
