import Qualifying from "./Qualifying";
import Race from "./Race";
import Simulateable from "../../interfaces/Simulateable";
import Roster from "../roster/Roster";
import HasDrivers from "../higher/HasDrivers";
import WeekendObject from "./WeekendObject";

export default class Weekend extends HasDrivers implements Simulateable{
    get weekendObjects(): WeekendObject[] {
        return this._weekendObjects;
    }

    set weekendObjects(value: WeekendObject[]) {
        this._weekendObjects = value;
    }

    private _weekendObjects: WeekendObject[] = []

    constructor() {
        super();

        this._weekendObjects = [new Qualifying(),new Race()]
    }

    simulate(): void {
        for(let weekendObject of this.weekendObjects){
            weekendObject.drivers = this.drivers;
            weekendObject.simulate();
        }
    }

    getScore(roaster: Roster){
        let score = 0;
        for(let weekendObject of this.weekendObjects){
            for(let driver of roaster.drivers) {
                weekendObject.getDriverScore(driver);
            }

            weekendObject.getTeamScore(roaster.team);
        }

        return score;
    }
}
