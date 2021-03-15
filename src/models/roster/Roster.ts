import Driver from "./Driver";
import Team from "./Team";
import Weekend from "../weekend/Weekend";

export default class Roster{
    get team(): Team {
        return this._team;
    }

    set team(value: Team) {
        this._team = value;
    }
    get drivers(): [Driver, Driver, Driver, Driver, Driver] {
        return this._drivers;
    }

    set drivers(value: [Driver, Driver, Driver, Driver, Driver]) {
        this._drivers = value;
    }
    private _drivers: [Driver,Driver,Driver,Driver,Driver];
    private _team: Team;


    getScore(weekend: Weekend){
        return weekend.getScore(this);
    }
}
