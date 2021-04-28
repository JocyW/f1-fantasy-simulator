import Qualifying from "./Qualifying";
import Race from "./Race";
import Simulateable from "../../interfaces/Simulateable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";
import WeekendObject from "./WeekendObject";
import FinishGenerator from "../../interfaces/FinishGenerator";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../Logger";
import WithExporter from "../../interfaces/WithExporter";
import Exporter from "../exporter/Exporter";

export default class Weekend extends HasDrivers implements Simulateable, WithLogger, WithExporter {

    public logger: Logger;

    constructor() {
        super();
        const quali = new Qualifying();
        const race = new Race();

        race.qualifying = quali;

        this._weekendObjects = [quali, race];
        this.logger = new Logger('Weekend')
    }

    private _weekendObjects: WeekendObject[] = []

    get weekendObjects(): WeekendObject[] {
        return this._weekendObjects;
    }

    set weekendObjects(value: WeekendObject[]) {
        this._weekendObjects = value;
    }

    async simulate(generator: FinishGenerator): Promise<void> {
        this.logger.debug('Simulating Weekend')

        for (let weekendObject of this.weekendObjects) {
            if (!weekendObject.drivers.length)
                weekendObject.drivers = this.drivers;

            if (this.exporter)
                weekendObject.exporter = this.exporter;

            if (!weekendObject.drivers.length)
                throw Error('Drivers needed to start simulation for weekendobject ' + JSON.stringify(weekendObject));

            //Called in parallel
            await weekendObject.simulate(generator);

            this.logger.debug('Results for ' + weekendObject.type);
            for (let result of weekendObject.results) {
                this.logger.debug(`${result.place}. ${result.driver.firstName} ${result.driver.lastName}`)
            }
        }

    }

    async getScore(roster: Roster) {
        this.logger.debug('Getting score for roster', roster);
        let score = 0;
        for (let weekendObject of this.weekendObjects) {
            for (let driver of roster.drivers) {
                let driverScore = await weekendObject.getDriverScore(driver, false);

                if (roster.isTurboDriver(driver)) {
                    driverScore *= 2;
                }

                score += driverScore;
            }

            for (let driver of roster.getTeamDrivers(weekendObject.drivers)) {
                score += await weekendObject.getDriverScore(driver, true);
            }
        }
        return score;
    }

    exporter: Exporter;
}
