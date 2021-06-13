import FinishGenerator from "../FinishGenerator";
import HasResults from "../../race/interface/HasResults";
import Result from "../../race/Result";
import {RaceData} from "../../data/csv/RacesTable";
import {ResultsTable} from '../../data/csv/ResultsTable';
import {FinishableData} from "../../data/csv/FinishableData";
import Race from "../../race/weekend_object/Race";
import Qualifying from "../../race/weekend_object/Qualifying";
import {CSV_DRIVER_IDS} from "../../data/csv/mappings/drivers";
import {driversObj} from "../../data/fantasy";
import {mapDriverId} from '../../data/csv/mappings/func';
import combinedHistoryData from "../../data/csv/CombinedHistoryData";
import HasSeasonYear from "./HasSeasonYear";
import WithLogger from "../../logging/WithLogger";
import Logger from "../../logging/Logger";
import WeekendObject from "../../race/weekend_object/WeekendObject";

export default class BasedOnSeasonGenerator extends HasSeasonYear implements FinishGenerator, WithLogger {

    public logger: Logger;
    private historyData = combinedHistoryData;
    private raceIndex = 0;

    constructor(seasonYear: string) {
        super(seasonYear)
        this.logger = new Logger('BasedOnSeasonGenerator');
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.historyData.readCsvs();

        if (this.raceIndex >= this.historyData.races.length) {
            this.raceIndex = 0;
            console.log(`More races need to be generated than exist in Season ${this.seasonYear}. Restarting with the first`);
        }

        const results: Result[] = [];
        const race: RaceData = this.historyData.getRacesForSeason(this.seasonYear)[this.raceIndex];


        const csvResults = this.getResults(weekendObject, race);
        for (let result of csvResults) {

            let season2021DriverId = mapDriverId(result.driverId, this.seasonYear);

            // FUCKING COVID driver changes...
            const weirdDriverChanges = [driversObj.vettel.id, driversObj.stroll.id];
            if (weirdDriverChanges.includes(season2021DriverId)) {
                if (results.find((result) => result.driver.id === season2021DriverId)) {
                    season2021DriverId = weirdDriverChanges.find((driverId) => driverId !== season2021DriverId);
                }
            }

            if (csvResults.find((finishable) => finishable.driverId === CSV_DRIVER_IDS.aitkin) && result.driverId === '847') {
                season2021DriverId = driversObj.hamilton.id;
            }

            const driver = weekendObject.drivers.find((driver) => driver.id === season2021DriverId);

            if (!driver) {
                throw Error(`Could not find driver with id ${season2021DriverId}`)
            }


            let position;
            if (result.position === ResultsTable.POSITION_NOT_FINISHED) {
                position = Result.PLACE_DNF;
            } else {
                position = parseInt(result.position, 10)
            }

            if (!position) {
                throw Error(`No position found for driver ${result.driverId} in race ${result.raceId}`)
            }

            results.push(new Result({
                driver,
                place: position
            }))
        }


        this.raceIndex++;

        return results;
    }

    private getResults(hasResults: HasResults, race: RaceData): FinishableData[] {
        let mapping: WeakMap<RaceData, FinishableData[]>;

        if (hasResults instanceof Race) {
            mapping = this.historyData.resultsMapping;
        } else if (hasResults instanceof Qualifying) {
            mapping = this.historyData.qualifyingResultsMapping
        } else {
            throw Error('Generate must be called with Race or Qualifying as parameter')
        }
        return mapping.get(race);
    }

}
