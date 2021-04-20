import Driver from "./Driver";
import Team from "./Team";
import {drivers, teams} from "../../generate";

export type RosterBackupObject = {
    team: number,
    turboDriver: number,
    drivers: number[]
}

export default class Roster {

    constructor(props?: { drivers: [Driver, Driver, Driver, Driver, Driver], team: Team, turboDriver: Driver }) {

        if (props?.drivers?.length)
            this.drivers = props?.drivers;
        if (props?.team)
            this.team = props?.team;
        if (props?.turboDriver)
            this.turboDriver = props.turboDriver;
    }

    private _drivers: [Driver, Driver, Driver, Driver, Driver];

    get drivers(): [Driver, Driver, Driver, Driver, Driver] {
        return this._drivers;
    }

    set drivers(value: [Driver, Driver, Driver, Driver, Driver]) {
        this._drivers = value;
        this.checkTotalCost();
    }

    private _team: Team;

    get team(): Team {
        return this._team;
    }

    set team(value: Team) {
        this._team = value;
        this.checkTotalCost();
    }

    private _turboDriver: Driver

    get turboDriver(): Driver {
        return this._turboDriver;
    }

    set turboDriver(value: Driver) {
        if (value.cost >= 20) {
            throw Error(`${this.name}: Turbo driver must cost less than 20 million`)
        }

        this._turboDriver = value;
    }

    private _name: string

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get numericalId(): string {
        return (this.drivers.reduce((acc, driver) => acc += driver.id, 0)
            + this.team.id
        ).toString() + this.turboDriver.id;
    }

    static fromBackupObject(object: RosterBackupObject): Roster {

        const driversArray = Object.values(drivers);
        const roster = new Roster();
        roster.team = Object.values(teams).find((team) => team.id === object.team);
        // @ts-ignore id is unique
        roster.drivers = [...driversArray.filter((driver) => object.drivers.includes(driver.id))];
        roster.turboDriver = driversArray.find((driver) => driver.id === object.turboDriver);

        return roster;
    }

    getTeamDrivers(drivers: Driver[]) {
        return drivers.filter((driver) => driver.team.id === this.team.id);
    }

    isTurboDriver(driver: Driver): boolean {
        return this._turboDriver.id === driver.id;
    }

    checkTotalCost() {
        if (!this.team || !this.drivers || !this.drivers.length) return

        const totalCost = this.drivers.reduce((acc, driver) => acc + driver.cost, 0) + this.team.cost;
        if (parseInt(totalCost.toFixed(2)) > 100) {
            console.error(this.drivers, this.team);
            throw Error(`${this.name}: The total cost of the roster exceeds 100 million: ${totalCost}`);
        }
    }

    generateBackupObject(): RosterBackupObject {
        return {
            team: this.team.id,
            drivers: this.drivers.map((driver) => driver.id),
            turboDriver: this.turboDriver.id
        }
    }
}
