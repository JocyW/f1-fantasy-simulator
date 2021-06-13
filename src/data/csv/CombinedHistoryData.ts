import races, {RaceData} from "./RacesTable";
import results, {ResultData} from "./ResultsTable";
import qualifyingData, {QualifyingData} from "./QualityingsTable";
import WithLogger from "../logging/WithLogger";
import Logger from "../logging/Logger";
import Qualifying from "../races/Qualifying";
import Race from "../races/Race";
import WeekendObject from "../races/WeekendObject";
import singleton from '../makeSingleton';
import {FinishableData} from "./FinishableData";

export class CombinedHistoryData implements WithLogger {

    static instance: CombinedHistoryData;
    static singleton = singleton(CombinedHistoryData);

    public logger: Logger;
    private readCsvsAlready = false;

    constructor() {
        this.logger = new Logger('CombinedHistoryData');
    }

    private _races: RaceData[];

    get races(): RaceData[] {
        return this._races;
    }

    private _results: ResultData[];

    get results(): ResultData[] {
        return this._results;
    }

    private _qualifyingResults: QualifyingData[];

    get qualifyingResults(): QualifyingData[] {
        return this._qualifyingResults;
    }

    private _resultsMapping: WeakMap<RaceData, ResultData[]> = new WeakMap<RaceData, ResultData[]>();

    get resultsMapping(): WeakMap<RaceData, ResultData[]> {
        return this._resultsMapping;
    }

    private _qualifyingResultsMapping: WeakMap<RaceData, QualifyingData[]> = new WeakMap<RaceData, QualifyingData[]>();

    get qualifyingResultsMapping(): WeakMap<RaceData, QualifyingData[]> {
        return this._qualifyingResultsMapping;
    }

    public getRaceResultForRace(race: RaceData): ResultData[] {
        if (!this.readCsvsAlready) {
            this.logger.error('readCsvs must be called first')
        }
        return this.resultsMapping.get(race)
    }

    public getQualifyingResultForRace(race: RaceData) {
        if (!this.readCsvsAlready) {
            this.logger.error('readCsvs must be called first')
        }

        return this.qualifyingResultsMapping.get(race)
    }

    public getRacesForSeason(seasonYear: string): RaceData[] {
        return this.races.filter((race) => race.year === seasonYear);
    }

    public getResultsForWeekendObject(weekendObject: WeekendObject | typeof WeekendObject, race: RaceData): QualifyingData[]|ResultData[] {
        if (weekendObject instanceof Race || weekendObject === Race) {
            this.logger.debug('getting results for race');
            return this.getRaceResultForRace(race);
        } else if (weekendObject instanceof Qualifying || weekendObject || Qualifying) {
            this.logger.debug('getting results for qualifying');
            return this.getQualifyingResultForRace(race)
        } else {
            this.logger.error('WeekendObject is not supported ', weekendObject);
        }
    }


    public async readCsvs() {
        if (this.readCsvsAlready) return;
        this.logger.info('Reading CSVs...');

        this._races = (await races.readFile())
        this._qualifyingResults = await qualifyingData.readFile();
        this._results = await results.readFile();

        for (let race of this._races) {
            const results = this._results.filter((r) => {
                return r.raceId === race.raceId
            });
            this._resultsMapping.set(race, results);

            const qualifyingResults = this._qualifyingResults.filter((qualifyingResult) => {
                return qualifyingResult.raceId === race.raceId;
            });
            this._qualifyingResultsMapping.set(race, qualifyingResults);
        }
        this.readCsvsAlready = true;
        this.logger.info('Reading CSVs done');
    }
}

export default CombinedHistoryData.singleton()
