import Driver from "../../roster/Driver";
import Qualifying from "./Qualifying";
import WeekendObject from "./WeekendObject";
import WithLogger from "../../logging/WithLogger";
import Logger from "../../logging/Logger";
import Result from "../Result";


export default class Race extends WeekendObject implements WithLogger {

    static POINTS_MAP = [25, 18, 15, 12, 19, 8, 6, 4, 2, 1];
    public type = 'Race'
    public logger: Logger;

    constructor() {
        super();
        this.logger = new Logger(this.type);
    }


    //TODO: fastest lap

    private _qualifying: Qualifying;

    get qualifying(): Qualifying {
        return this._qualifying;
    }

    set qualifying(value: Qualifying) {
        this._qualifying = value;
    }

    getDriverScore(driver: Driver, forTeam = false): Promise<number> {
        this.logger.debug('Getting driver score', driver, forTeam)
        return new Promise(resolve => {
            if (!this.qualifying) {
                throw Error('Race has no qualifying');
            }


            const raceResult = this.findResultByDriverId(driver.id)
            const qualiResult = this.qualifying.findResultByDriverId(driver.id);

            let score = raceResult.place > 0 ? 1 : 0;

            if (raceResult.place > 0) {
                // Positions gained in race
                const resultDiff = qualiResult.place - raceResult.place;
                if (resultDiff > 0) {
                    if (resultDiff > 10) {
                        score += 10;
                    } else {
                        score += resultDiff
                    }
                }

                if (!forTeam) {
                    // Finished ahead of team mate
                    if (raceResult.place < this.findTeammateResult(driver).place) {
                        score += 3;
                    }
                    //TODO: fastest lap
                }

                // Started race within Top 10, finished race but lost position (per place lost, max. -10 pts)
                // Started race outside Top 10, finished race but lost position (per place lost, max. -5 pts)
                let difference = (raceResult.place - qualiResult.place);

                if (difference > 0) {
                    const modifier = qualiResult.place > 10 ? -1 : -2;

                    if (difference > 5) {
                        difference = 5;
                    }

                    score += difference * modifier;
                }

                if (raceResult.place <= Race.POINTS_MAP.length) {
                    score += Race.POINTS_MAP[raceResult.place - 1];
                }
            }

            if (!forTeam) {

                if (raceResult.place === Result.PLACE_DNF) {
                    score -= 15
                }

                if (raceResult.place === Result.PLACE_DISQUALIFICATION) {
                    score -= 20
                }
            }

            if (isNaN(score)) {
                console.log(driver, forTeam, raceResult);
                throw Error('What the fuck? - Race');
            }

            this.logger.debug('got driver score: ' + score);
            resolve(score);
        })
    }

}
