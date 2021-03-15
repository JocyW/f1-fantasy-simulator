import HasResults from "./higher/HasResults";
import Scoreable from "../interfaces/Scoreable";
import Simulateable from "../interfaces/Simulateable";
import Driver from "./Driver";
import Team from "./Team";

export default abstract class WeekendObject extends HasResults implements Scoreable, Simulateable{
    abstract getDriverScore(driver: Driver): number
    abstract getTeamScore(team: Team): number
    abstract simulate(): void
}
