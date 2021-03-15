import Driver from "../roster/Driver";
import Qualifying from "./Qualifying";
import BasedOnCostGenerator from "../generators/BasedOnCostGenerator";
import WeekendObject from "../higher/WeekendObject";
import FinishGenerator from "../../interfaces/FinishGenerator";


export default class Race extends WeekendObject {

    public type = 'Race'

    static POINTS_MAP = [25, 18, 15, 12, 19, 8, 6, 4, 2, 1];

    private _qualifying: Qualifying;

    //TODO: fastest lap

    constructor() {
        super();
    }

    getDriverScore(driver: Driver, forTeam = false): number {

        if(!this.qualifying){
            throw Error('Race has no qualifying');
        }

        // Finished race
        //TODO: change when DNF implemented
        let score = 1;

        const raceResult = this.findResultByDriverId(driver.id)
        const qualiResult = this.qualifying.findResultByDriverId(driver.id);

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
        //TODO: DNF + Disqualification

        if (raceResult.place <= Race.POINTS_MAP.length) {
            score += Race.POINTS_MAP[raceResult.place - 1];
        }

        return score;
    }

    simulate(generator: FinishGenerator): void {
        this.results = generator.generate(this);
    }

    get qualifying(): Qualifying {
        return this._qualifying;
    }

    set qualifying(value: Qualifying) {
        this._qualifying = value;
    }

}
