import Driver from "../roster/Driver";
import WeekendObject from "../higher/WeekendObject";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "./Result";

export default class Qualifying extends WeekendObject {

    public type = 'Qualifying'

    constructor() {
        super();
    }

    getDriverScore(driver: Driver, forTeam = false): Promise<number> {
        return new Promise(resolve => {
            if (!this.results.length) {
                throw Error('Simulate must be called first')
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

            if(isNaN(score)){
                console.log(driver,forTeam, result);
                throw Error('What the fuck? - Quali');
            }

            resolve(score);
        })
    }
}
