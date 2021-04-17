import FinishGenerator from "../../interfaces/FinishGenerator";
import HasResults from "../higher/HasResults";
import Result from "../races/Result";
import {RaceData} from "../data/csv/RacesTable";
import {ResultsTable} from '../data/csv/ResultsTable';
import {FinishableData} from "../data/csv/FinishableData";
import Race from "../races/Race";
import Qualifying from "../races/Qualifying";
import {CSV_DRIVER_IDS} from "../data/csv/mappings/data";
import {drivers} from "../../generate";
import {mapDriverId} from '../data/csv/mappings/func';
import CombinedHistoryData from "../data/csv/CombinedHistoryData";
import HasSeasonYear from "../higher/HasSeasonYear";
import WithLogger from "../../interfaces/WithLogger";
import logger from "../../logger";
import Logger from "../../logger";

export default class BasedOnSeasonGenerator extends HasSeasonYear implements FinishGenerator, WithLogger {

    private historyData: CombinedHistoryData;

    public logger: Logger;

    private raceIndex = 0;

    constructor(seasonYear: string) {
        super(seasonYear)
        this.historyData = new CombinedHistoryData();
        this.logger = new Logger('BasedOnSeasonGenerator');
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


    async generate(hasResults: HasResults): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.historyData.readCsvs();

        if (this.raceIndex >= this.historyData.races.length) {
            this.raceIndex = 0;
            console.log(`More races need to be generated than exist in Season ${this.seasonYear}. Restarting with the first`);
        }

        const results: Result[] = [];
        const race: RaceData = this.historyData.getRacesForSeason(this.seasonYear)[this.raceIndex];


        const csvResults = this.getResults(hasResults, race);
        for (let result of csvResults) {

            let season2021DriverId = mapDriverId(result.driverId, this.seasonYear);

            // FUCKING COVID driver changes...
            const weirdDriverChanges = [drivers.vettel.id, drivers.stroll.id];
            if (weirdDriverChanges.includes(season2021DriverId)) {
                if (results.find((result) => result.driver.id === season2021DriverId)) {
                    season2021DriverId = weirdDriverChanges.find((driverId) => driverId !== season2021DriverId);
                }
            }

            if (csvResults.find((finishable) => finishable.driverId === CSV_DRIVER_IDS.aitkin) && result.driverId === '847') {
                season2021DriverId = drivers.hamilton.id;
            }

            const driver = hasResults.drivers.find((driver) => driver.id === season2021DriverId);

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

}
