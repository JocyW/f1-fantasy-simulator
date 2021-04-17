import Roster from "../models/roster/Roster";

export default interface Scoreable{
    getScore(roster: Roster): Promise<number>
}
