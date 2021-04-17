import FinishGenerator from "../../../interfaces/FinishGenerator";
import HasResults from "../../higher/HasResults";
import Result from "../../races/Result";
import races, {RaceData} from "./csv/RacesTable";
import results, {ResultData, ResultsTable} from './csv/ResultsTable';
import qualifyingData, {QualifyingData} from "./csv/QualityingsTable";
import {FinishableData} from "./csv/FinishableData";
import Race from "../../races/Race";
import Qualifying from "../../races/Qualifying";
import {HISTORY_IDS, mappings} from "./mappings";
import {drivers} from "../../../generate";

export default class BasedOnSeasonGenerator implements FinishGenerator {

    private seasonYear: string;
    private racesData: RaceData[];
    private resultsData: ResultData[];
    private qualifyingResults: QualifyingData[];
    private resultsMapping: WeakMap<RaceData, ResultData[]> = new WeakMap<RaceData, ResultData[]>();
    private qualifyingResultsMapping: WeakMap<RaceData, QualifyingData[]> = new WeakMap<RaceData, QualifyingData[]>();
    private raceIndex = 0;

    private readCsvsAlready = false;

    constructor(seasonYear: string) {
        this.seasonYear = seasonYear;
    }

    async readCsvs() {
        if (this.readCsvsAlready) return;

        this.racesData = (await races.readFile()).filter((race) => race.year === this.seasonYear);
        this.qualifyingResults = await qualifyingData.readFile();
        this.resultsData = await results.readFile();

        for (let race of this.racesData) {
            const results = this.resultsData.filter((r) => {
                return r.raceId === race.raceId
            });
            this.resultsMapping.set(race, results);

            const qualifyingResults = this.qualifyingResults.filter((qualifyingResult) => {
                return qualifyingResult.raceId === race.raceId;
            });
            this.qualifyingResultsMapping.set(race, qualifyingResults);
        }
        this.readCsvsAlready = true;
    }


    async generate(hasResults: HasResults): Promise<Result[]> {
        await this.readCsvs();
        if (this.raceIndex >= this.racesData.length) {
            this.raceIndex = 0;
            console.log(`More races need to be generated than exist in Season ${this.seasonYear}. Restarting with the first`);
        }

        const results: Result[] = [];
        const race: RaceData = this.racesData[this.raceIndex];

        let mapping: WeakMap<RaceData, FinishableData[]>;

        if (hasResults instanceof Race) {
            mapping = this.resultsMapping;
        } else if (hasResults instanceof Qualifying) {
            mapping = this.qualifyingResultsMapping
        } else {
            throw Error('Generate must be called with Race or Qualifying as parameter')
        }
        const csvResults = mapping.get(race);

        for (let result of csvResults) {

            const driverMapping = mappings[this.seasonYear];

            if (!driverMapping) {
                throw Error(`No driver mapping found for season ${this.seasonYear}`)
            }

            let season2021DriverId = driverMapping[result.driverId];

            if (!season2021DriverId) {
                throw Error(`Could not find 2021 driver for ${result.driverId}`)
            }

            // FUCKING COVID driver changes...
            const weirdDriverChanges = [drivers.vettel.id, drivers.stroll.id];
            if (weirdDriverChanges.includes(season2021DriverId)) {
                if (results.find((result) => result.driver.id === season2021DriverId)) {
                    season2021DriverId = weirdDriverChanges.find((driverId) => driverId !== season2021DriverId);
                }
            }

            if(csvResults.find((finishable) => finishable.driverId === HISTORY_IDS.aitkin) && result.driverId === '847'){
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
