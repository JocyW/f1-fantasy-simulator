import Result from "../races/Result";
import HasDrivers from "./HasDrivers";
import Driver from "../roster/Driver";

export default abstract class HasResults extends HasDrivers{

    get results(): Result[] {
        return this._results;
    }

    set results(value: Result[]) {
        this._results = value;
    }
    private _results: Result[] = [];

    findResultByDriverId(driverId: Symbol): Result{
        return this.results.find((result) => result.driver.id === driverId);
    }

    findTeammateResult(driver: Driver): Result{
        return this.results.find((result) => result.driver.id !== driver.id && result.driver.team.id === driver.team.id)
    }
}
