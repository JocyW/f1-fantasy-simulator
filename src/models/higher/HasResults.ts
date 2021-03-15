import Result from "../Result";
import HasDrivers from "./HasDrivers";

export default abstract class HasResults extends HasDrivers{

    get results(): Result[] {
        return this._results;
    }

    set results(value: Result[]) {
        this._results = value;
    }
    private _results: Result[] = [];

}
