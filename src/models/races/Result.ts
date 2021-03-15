import Driver from "../roster/Driver";

export default class Result{
    get driver(): Driver {
        return this._driver;
    }

    set driver(value: Driver) {
        this._driver = value;
    }
    get place(): number {
        return this._place;
    }

    set place(value: number) {
        this._place = value;
    }
    private _driver: Driver;
    private _place: number;

    constructor(props: {driver: Driver, place: number}) {
        this._driver = props.driver;
        this._place = props.place;
    }
}
