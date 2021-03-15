import HasResults from "../higher/HasResults";
import Scoreable from "../../interfaces/Scoreable";
import Driver from "../roster/Driver";
import Team from "../roster/Team";
import Simulateable from "../../interfaces/Simulateable";
import Qualifying from "./Qualifying";
import BasedOnCostGenerator from "../generators/BasedOnCostGenerator";


export default class Race extends HasResults implements Scoreable, Simulateable {

    static POINTS_MAP = [25, 18, 15, 12, 19, 8, 6, 4, 2, 1];

    get qualifying(): Qualifying {
        return this._qualifying;
    }

    set qualifying(value: Qualifying) {
        this._qualifying = value;
    }

    private _qualifying: Qualifying;

    constructor() {
        super();
    }

    getDriverScore(driver: Driver, forTeam = false): number {
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

        if(raceResult.place <= Race.POINTS_MAP.length){
            score += Race.POINTS_MAP[raceResult.place - 1];
        }

        return score;
    }

    getTeamScore(team: Team): number {
        let score = 0;

        const drivers = this.drivers.filter((driver) => driver.team.id === team.id);

        for(let driver of drivers){
            score += this.getDriverScore(driver, true);
        }

        return score;
    }

    simulate(): void {
        this.results = new BasedOnCostGenerator().generate(this);

        console.log('Qualifying simulation done...');
        for (let result of this.results
            ) {
            console.log(`${result.place}. - ${result.driver.firstName} ${result.driver.lastName}`)
        }
    }

}
