import HasResults from "../higher/HasResults";
import Scoreable from "../../interfaces/Scoreable";
import Driver from "../roster/Driver";
import Team from "../roster/Team";
import Simulateable from "../../interfaces/Simulateable";
import Qualifying from "./Qualifying";
import BasedOnCostGenerator from "../generators/BasedOnCostGenerator";

export default class Race extends HasResults implements Scoreable, Simulateable{
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

    getDriverScore(driver: Driver): number {
        return 0;
    }

    getTeamScore(team: Team): number {
        return 0;
    }

    simulate(): void {
        this.results = new BasedOnCostGenerator().generate(this);

        console.log('Qualifying simulation done...');
        for (let result of this.results) {
            console.log(`${result.place}. - ${result.driver.firstName} ${result.driver.lastName}`)
        }
    }

}
