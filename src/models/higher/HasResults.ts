import Result from "../Result";
import Driver from "../Driver";
import HasDrivers from "./HasDrivers";

export default class HasResults extends HasDrivers{

    get results(): Result[] {
        return this._results;
    }

    set results(value: Result[]) {
        this._results = value;
    }
    private _results: Result[] = [];

}
