import Driver from "../roster/Driver";

export default class Result {

    static PLACE_DNF = -1;
    static PLACE_DISQUALIFICATION = -2;

    constructor(props: { driver: Driver, place: number }) {
        this._driver = props.driver;
        this._place = props.place;
    }

    private _driver: Driver;

    get driver(): Driver {
        return this._driver;
    }

    set driver(value: Driver) {
        this._driver = value;
    }

    private _place: number;

    get place(): number {
        return this._place;
    }

    set place(value: number) {
        this._place = value;
    }
}
