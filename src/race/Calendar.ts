import Weekend from "./Weekend";
import Simulateable from "./interface/Simulateable";
import FinishGenerator from "../generator/FinishGenerator";
import Scoreable from "./interface/Scoreable";
import Roster from "../roster/Roster";
import HasDrivers from "../roster/interface/HasDrivers";
import WithLogger from "../logging/WithLogger";
import Logger from "../logging/Logger";
import WithExporter from "../exporter/interface/WithExporter";
import Exporter from "../exporter/Exporter";

export default class Calendar extends HasDrivers implements Simulateable, Scoreable, WithLogger, WithExporter {
    public logger: Logger;
    exporter: Exporter;

    constructor(numberOfWeekends: number) {
        super();
        this.logger = new Logger('Calendar');
        //TODO: figure out why this does not work: new Array(numberOfWeekends).map(() => new Weekend());
        this.logger.debug(`Generating ${numberOfWeekends} weekends`);
        for (let i = 0; i < numberOfWeekends; i++) {
            this.weekends.push(new Weekend())
        }
    }

    private _weekends: Weekend[] = [];

    get weekends(): Weekend[] {
        return this._weekends;
    }

    set weekends(value: Weekend[]) {
        this._weekends = value;
    }

    async simulate(generator: FinishGenerator): Promise<void> {

        let count = 1;
        for (let weekend of this.weekends) {
            this.logger.debug(`Simulating weekend`, weekend);
            this.logger.info(`Simulating weekend (${count}/${this.weekends.length})`);

            if (!weekend.drivers.length)
                weekend.drivers = this.drivers;

            if (this.exporter)
                weekend.exporter = this.exporter;

            await weekend.simulate(generator);
            count++;
        }
    }

    async getScore(roster: Roster): Promise<number> {
        this.logger.debug(`Getting score for roster`, roster);
        let score = 0;
        for (let weekend of this.weekends) {
            score += await weekend.getScore(roster);
        }
        return score;
    }

}
