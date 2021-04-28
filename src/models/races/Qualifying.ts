import Driver from "../roster/Driver";
import WeekendObject from "./WeekendObject";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../Logger";

export default class Qualifying extends WeekendObject implements WithLogger {

    public type = 'Qualifying'
    public logger: Logger;

    constructor() {
        super();
        this.logger = new Logger(this.type);
    }

    getDriverScore(driver: Driver, forTeam = false): Promise<number> {
        this.logger.debug('Getting driver score', driver, forTeam)
        return new Promise(resolve => {
            if (!this.results.length) {
                this.logger.error('Simulate must be called first')
            }

            let score = 1;
            const result = this.findResultByDriverId(driver.id);

            // Q2 Finish
            if (result.place <= 15) {
                score += 2;
            }
            // Q3 Finish
            if (result.place <= 10) {
                score += 3;
            }

            // Top 10 points
            if (result.place <= 10) {
                score += 11 - result.place;
            }

            // Better than teammate
            if (result.place < this.findTeammateResult(driver).place && !forTeam) {
                score += 2
            }

            //TODO: did not qualify
            //TODO: Disqualification

            this.logger.debug('got driver score: ' + score);
            resolve(score);
        })
    }
}
