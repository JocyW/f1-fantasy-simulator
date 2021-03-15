import Driver from "../models/Driver";
import Team from "../models/Team";

export default interface Scoreable{
    getDriverScore(driver: Driver): number
    getTeamScore(team: Team): number
}
