import Driver from "../../roster/Driver";
import WeekendObject from "./WeekendObject";
import WithLogger from "../../logging/WithLogger";
import Logger from "../../logging/Logger";
import Result from "../Result";

export default class Qualifying extends WeekendObject implements WithLogger {

    public type = 'Qualifying'
    public logger: Logger;

    constructor() {
        super();
        this.logger = new Logger(this.type);
    }

    async getDriverScore(driver: Driver, forTeam = false): Promise<number> {
        this.logger.debug('Getting driver score', driver, forTeam)
        if (!this.results.length) {
            this.logger.error('Simulate must be called first')
        }

        const result = this.findResultByDriverId(driver.id);

        let score = result.place > 0 ? 1 : 0;

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

        if (!forTeam) {
            // Better than teammate
            if (result.place < this.findTeammateResult(driver).place) {
                score += 2
            }

            if (result.place === Result.PLACE_DNF) {
                score -= 5
            }

            if (result.place === Result.PLACE_DISQUALIFICATION) {
                score -= 10
            }
        }

        this.logger.debug('got driver score: ' + score);
        return score;
    }
}
