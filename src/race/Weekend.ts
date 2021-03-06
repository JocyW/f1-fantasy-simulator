import Qualifying from "./weekend_object/Qualifying";
import Race from "./weekend_object/Race";
import Simulateable from "./interface/Simulateable";
import Roster from "../roster/Roster";
import HasDrivers from "../roster/interface/HasDrivers";
import WeekendObject from "./weekend_object/WeekendObject";
import FinishGenerator from "../generator/FinishGenerator";
import WithLogger from "../logging/WithLogger";
import Logger from "../logging/Logger";
import WithExporter from "../exporter/interface/WithExporter";
import Exporter from "../exporter/Exporter";

export default class Weekend extends HasDrivers implements Simulateable, WithLogger, WithExporter {

    public logger: Logger;
    exporter: Exporter;

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
                let driverScore = await weekendObject.getScore(driver, false);

                if (roster.isTurboDriver(driver)) {
                    driverScore *= 2;
                }

                score += driverScore;
            }

            for (let driver of roster.getTeamDrivers(weekendObject.drivers)) {
                score += await weekendObject.getScore(driver, true);
            }
        }
        return score;
    }
}
