import WithLogger from "../../interfaces/WithLogger";
import Logger from "../../logger";
import Roster from "./Roster";
import Calendar from "../races/Calendar";
import Scoreable from "../../interfaces/Scoreable";

export class LeagueEntry {
    name: string
    roster: Roster
    score: number

    constructor(props: { name: string, roster: Roster }) {
        this.name = props.name;
        this.roster = props.roster;
    }
}

export default class League implements WithLogger, Scoreable {
    logger: Logger;

    public name: string;
    public entries: LeagueEntry[] = [];
    public calendar: Calendar;

    constructor() {
        this.logger = new Logger('League');
    }

    addEntry(name: string, roster: Roster) {
        this.entries.push(new LeagueEntry({name, roster}))
    }

    async getScore(roster: Roster): Promise<number> {

        if (!this.calendar) {
            this.logger.error('No calendar found to get scores from');
            return;
        }

        let totalScore = 0;
        for (let entry of this.entries) {
            entry.score = await this.calendar.getScore(entry.roster);
            totalScore += entry.score;
        }

        for (let entry of this.entries.sort((a, b) => b.score - a.score)) {
            this.logger.info(entry.name, entry.score);
        }

        return totalScore;
    }


}
