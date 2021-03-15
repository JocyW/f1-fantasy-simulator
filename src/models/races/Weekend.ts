import Qualifying from "./Qualifying";
import Race from "./Race";
import Simulateable from "../../interfaces/Simulateable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";
import WeekendObject from "../higher/WeekendObject";
import FinishGenerator from "../../interfaces/FinishGenerator";

export default class Weekend extends HasDrivers implements Simulateable {
    get weekendObjects(): WeekendObject[] {
        return this._weekendObjects;
    }

    set weekendObjects(value: WeekendObject[]) {
        this._weekendObjects = value;
    }

    private _weekendObjects: WeekendObject[] = []

    constructor() {
        super();

        this._weekendObjects = [new Qualifying(), new Race()]
    }

    simulate(generator: FinishGenerator): void {
        for (let weekendObject of this.weekendObjects) {
            weekendObject.drivers = this.drivers;
            weekendObject.simulate(generator);
        }
    }

    getScore(roster: Roster) {
        return roster.getScore(this);
    }
}
