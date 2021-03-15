import Result from "../Result";
import Driver from "../Driver";
import HasDrivers from "./HasDrivers";

export default class Finishable extends HasDrivers{

    get results(): Result[] {
        return this._results;
    }

    set results(value: Result[]) {
        this._results = value;
    }
    private _results: Result[] = [];

}
