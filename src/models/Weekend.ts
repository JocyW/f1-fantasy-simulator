import Scoreable from "../interfaces/Scoreable";
import Qualifying from "./Qualifying";
import Race from "./Race";
import Simulateable from "../interfaces/Simulateable";
import Driver from "./Driver";
import Roaster from "./Roaster";
import HasDrivers from "./higher/HasDrivers";

export default class Weekend extends HasDrivers implements Simulateable{
    get race(): Race {
        return this._race;
    }

    set race(value: Race) {
        this._race = value;
    }
    get qualifying(): Qualifying {
        return this._qualifying;
    }

    set qualifying(value: Qualifying) {
        this._qualifying = value;
    }
    private _qualifying: Qualifying;
    private _race: Race;

    constructor() {
        super();
        this._qualifying = new Qualifying();
        this._race = new Race();

        this.race.qualifying = this.qualifying;
    }

    simulate(): void {
        this.qualifying.drivers = this.drivers;
        this.race.drivers = this.drivers;

        this.qualifying.simulate();
        this.race.simulate();
    }

    getScore(roaster: Roaster){
        let score = 0;
        for(let driver of roaster.drivers){
            score += this.qualifying.getDriverScore(driver);
            score += this.race.getDriverScore(driver);
        }
        score += this.qualifying.getTeamScore(roaster.team);
        score += this.race.getTeamScore(roaster.team);

        return score;
    }
}
