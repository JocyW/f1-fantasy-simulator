import Qualifying from "./Qualifying";
import Race from "./Race";
import Simulateable from "../../interfaces/Simulateable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";
import WeekendObject from "../higher/WeekendObject";
import FinishGenerator from "../../interfaces/FinishGenerator";
import {DEBUG_ENABLED} from "../../main";

export default class Weekend extends HasDrivers implements Simulateable {

    private _weekendObjects: WeekendObject[] = []

    constructor() {
        super();
        const quali = new Qualifying();
        const race = new Race();

        race.qualifying = quali;

        this._weekendObjects = [quali, race]
    }

    async simulate(generator: FinishGenerator): Promise<void> {
        if (DEBUG_ENABLED) {
            console.log('Simulating Weekend')
        }
        for (let weekendObject of this.weekendObjects) {
            if (!weekendObject.drivers.length)
                weekendObject.drivers = this.drivers;

            if (!weekendObject.drivers.length)
                throw Error('Drivers needed to start simulation for weekendobject ' + JSON.stringify(weekendObject));

            //Called in parallel
            await weekendObject.simulate(generator);

            if (DEBUG_ENABLED) {
                console.log('Results for ' + weekendObject.type);
                for (let result of weekendObject.results) {
                    console.log(`${result.place}. ${result.driver.firstName} ${result.driver.lastName}`)
                }
            }
        }
    }

    async getScore(roster: Roster) {
        let score = 0;
        for (let weekendObject of this.weekendObjects) {
            for (let driver of weekendObject.drivers) {
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

    get weekendObjects(): WeekendObject[] {
        return this._weekendObjects;
    }

    set weekendObjects(value: WeekendObject[]) {
        this._weekendObjects = value;
    }
}
