import Weekend from "./Weekend";
import Simulateable from "../../interfaces/Simulateable";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Scoreable from "../../interfaces/Scoreable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../../logger";

export default class Calendar extends HasDrivers implements Simulateable, Scoreable, WithLogger {
    get weekends(): Weekend[] {
        return this._weekends;
    }

    set weekends(value: Weekend[]) {
        this._weekends = value;
    }

    private _weekends: Weekend[] = [];
    public logger: Logger;

    constructor(numberOfWeekends: number) {
        super();
        this.logger = new Logger('Calendar');
        //TODO: figure out why this does not work: new Array(numberOfWeekends).map(() => new Weekend());
        this.logger.debug(`Generating ${numberOfWeekends} weekends`);
        for (let i = 0; i < numberOfWeekends; i++) {
            this.weekends.push(new Weekend())
        }
    }

    async simulate(generator: FinishGenerator): Promise<void> {
        this.logger.debug(`Simulating`);
        for (let weekend of this.weekends) {
            this.logger.debug(`Simulating weekend`, weekend);

            if (!weekend.drivers.length)
                weekend.drivers = this.drivers;

            await weekend.simulate(generator);
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
