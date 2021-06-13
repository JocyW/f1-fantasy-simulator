import Result from "./races/Result";
import HasDrivers from "./HasDrivers";
import Driver from "./roster/Driver";
import WithLogger from "./WithLogger";
import Logger from "./Logger";

export default abstract class HasResults extends HasDrivers implements WithLogger {

    public logger: Logger;

    constructor() {
        super();
        this.logger = new Logger('HasResults')
    }

    private _results: Result[] = [];

    get results(): Result[] {
        return this._results;
    }

    set results(value: Result[]) {
        this._results = value;
    }

    findResultByDriverId(driverId: number): Result {
        const result = this.results.find((result) => result.driver.id === driverId);

        if (!result) {
            this.logger.error(`No result found for driverId ${driverId}`);
            this.logger.debug(result);
        }

        return result;
    }

    findTeammateResult(driver: Driver): Result {
        const result = this.results.find((result) => result.driver.id !== driver.id && result.driver.team.id === driver.team.id);

        if (!result) {
            this.logger.debug(this.results, driver);
            this.logger.error(`No teammate result found for driverId ${driver.id}`);
        }

        return result
    }
}
