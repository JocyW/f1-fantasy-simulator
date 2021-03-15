import Driver from "../models/roster/Driver";
import Team from "../models/roster/Team";

export default interface Scoreable{
    getDriverScore(driver: Driver): number
    getTeamScore(team: Team): number
}
