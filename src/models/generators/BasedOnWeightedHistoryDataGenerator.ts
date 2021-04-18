import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "../races/Result";
import CombinedHistoryData from "../data/csv/CombinedHistoryData";
import Driver from "../roster/Driver";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../../logger";
import {mapDriverId} from "../data/csv/mappings/func";
import Qualifying from "../races/Qualifying";
import Race from "../races/Race";
import WeekendObject from "../higher/WeekendObject";

type WeightMap = {
    weight: number,
    driver: Driver
}

export default class BasedOnWeightedHistoryDataGenerator implements FinishGenerator, WithLogger {

    public logger: Logger;

    private prepared = false;
    private historyData: CombinedHistoryData;

    private qualiWeights: WeightMap[] = [];
    private raceWeights: WeightMap[] = [];

    private weights = new Map([
        [Qualifying, this.qualiWeights],
        [Race, this.raceWeights]
    ]);


    static supportedWeekendObjects = [Qualifying, Race];
    static baseWeight = 1000;
    static baseChange = 10;
    private seasonYears: string[];

    constructor(seasonYears: string[]) {
        this.seasonYears = seasonYears;
        this.historyData = new CombinedHistoryData();
        this.logger = new Logger('BasedOnWeightedHistoryGenerator')
    }


    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.prepare(weekendObject.drivers);

        //TODO: results generation based on weights
        return []
    }

    private static updateWithNewWeight(driver: Driver, map: WeightMap[], result: number, weight: number) {
        const currentMapping = map.find((mapping) => mapping.driver === driver);

        if (currentMapping.weight) {
            let position = 1;
            for (let weightMapping of map) {
                if (weightMapping.weight > currentMapping.weight) {
                    position++;
                }
            }
            currentMapping.weight += (position - result) * BasedOnWeightedHistoryDataGenerator.baseChange * weight
        } else {
            map.push({driver, weight: BasedOnWeightedHistoryDataGenerator.baseWeight})
        }
    }

    private async prepare(drivers: Driver[]) {
        if (this.prepared) return;
        this.logger.info('Preparing weights for generation');
        await this.historyData.readCsvs();
        let weight = 1;

        for (let seasonYear of this.seasonYears) {
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {

                for (let object of BasedOnWeightedHistoryDataGenerator.supportedWeekendObjects) {
                    for (let result of this.historyData.getResultsForWeekendObject(object, race)) {
                        const driver = Driver.findById(drivers, mapDriverId(result.driverId, seasonYear));
                        //TODO: calculate weight based on progression in season and season year
                        const weightMap = this.weights.get(object);
                        BasedOnWeightedHistoryDataGenerator.updateWithNewWeight(driver, weightMap, parseInt(result.position), weight)
                    }
                }
            }
            weight++;
        }

        this.logger.info('Finished preparing weights');
        this.prepared = true;
    }
}
