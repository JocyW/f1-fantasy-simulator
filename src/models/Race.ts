import HasResults from "./higher/HasResults";
import Result from "./Result";
import Scoreable from "../interfaces/Scoreable";
import Driver from "./Driver";
import Team from "./Team";
import Simulateable from "../interfaces/Simulateable";
import Qualifying from "./Qualifying";

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
    }

}
