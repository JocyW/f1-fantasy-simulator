import Weekend from "./Weekend";
import Simulateable from "../../interfaces/Simulateable";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Scoreable from "../../interfaces/Scoreable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";

export default class Calendar extends HasDrivers implements Simulateable, Scoreable{
    get weekends(): Weekend[] {
        return this._weekends;
    }

    set weekends(value: Weekend[]) {
        this._weekends = value;
    }

    private _weekends: Weekend[] = [];

    constructor(numberOfWeekends: number) {
        super();
        //TODO: figure out why this does not work: new Array(numberOfWeekends).map(() => new Weekend());
        for(let i = 0; i < numberOfWeekends; i++){
            this.weekends.push(new Weekend())
        }
    }

    async simulate(generator: FinishGenerator): Promise<void> {
        for(let weekend of this.weekends){

            if(!weekend.drivers.length)
                weekend.drivers = this.drivers;

            await weekend.simulate(generator);
        }
    }

    async getScore(roster: Roster): Promise<number> {
        let score = 0;
        for(let weekend of this.weekends){
            score += await weekend.getScore(roster);
        }
        return score;
    }

}
