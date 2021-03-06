import WithLogger from "../logging/WithLogger";
import Logger from "../logging/Logger";
import Roster from "./Roster";
import Calendar from "../race/Calendar";
import Scoreable from "../race/interface/Scoreable";
import WithExporter from "../exporter/interface/WithExporter";
import Exportable from "../exporter/interface/Exportable";
import Exporter from "../exporter/Exporter";

export class LeagueEntry {
    name: string
    roster: Roster
    score: number

    constructor(props: { name: string, roster: Roster }) {
        this.name = props.name;
        this.roster = props.roster;
    }
}

export default class League implements WithLogger, Scoreable, WithExporter, Exportable {
    static type = 'League';
    logger: Logger;
    public name: string;
    public entries: LeagueEntry[] = [];
    public calendar: Calendar;
    exporter: Exporter;

    constructor() {
        this.logger = new Logger(League.type);
    }

    getExportData(): object[] {
        return this.entries
            .sort((entryA, entryB) => entryB.score - entryA.score)
            .map((entry) => ({
                name: entry.name,
                score: entry.score
            }))
    }

    getExportName(): string {
        return League.type
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

        if (this.exporter)
            this.exporter.export(this);

        return totalScore;
    }


}
