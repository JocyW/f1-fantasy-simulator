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

    findResultByDriverId(driverId: number): Result{
        const result = this.results.find((result) => result.driver.id === driverId);

        if(!result) {
            console.log(this.results);
            throw Error(`No result found for driverId ${driverId}`)
        }

        return result;
    }

    findTeammateResult(driver: Driver): Result{
        const result = this.results.find((result) => result.driver.id !== driver.id && result.driver.team.id === driver.team.id);

        if(!result) {
            console.log(this.results,driver);
            throw Error(`No teammate result found for driverId ${driver.id}`);
        }

        return result
    }
}
