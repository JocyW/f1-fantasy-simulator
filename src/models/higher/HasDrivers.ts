import Driver from "../Driver";

export default abstract class HasDrivers{
    private _drivers: Driver[] = [];
    get drivers(): Driver[] {
        return this._drivers;
    }

    set drivers(value: Driver[]) {
        this._drivers = value;
    }
}
