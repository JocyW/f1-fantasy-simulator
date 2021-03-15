import Driver from "./Driver";
import Team from "./Team";

export default class Roster{

    private _drivers: [Driver, Driver, Driver, Driver, Driver];
    private _team: Team;
    private _turboDriver: Driver

    getTeamDrivers(drivers: Driver[]) {
        return drivers.filter((driver) => driver.team.id === this.team.id);
    }

    isTurboDriver(driver: Driver): boolean{
        return this._turboDriver.id === driver.id;
    }

    get turboDriver(): Driver {
        return this._turboDriver;
    }

    set turboDriver(value: Driver) {

        if(value.cost >= 20){
            throw Error('Turbo driver must cost less than 20 million')
        }

        this._turboDriver = value;
    }
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
}
