import Roster from "./roster/Roster";

export default interface Scoreable {
    getScore(roster: Roster): Promise<number>
}
