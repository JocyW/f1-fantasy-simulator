import Driver from "../../../roster/Driver";
import BasedOnWeightedHistoryDataGenerator from "../BasedOnWeightedHistoryDataGenerator";
import SUPPORTED_CLASSES from "../../../race/weekend_object/supportedWeekendObjects";
import {season2021To2021Mapping} from "../../../data/csv/mappings/drivers";
import {ResultsTable} from "../../../data/csv/ResultsTable";
import Result from "../../../race/Result";
import HistoryWeightMapPreparator from "./HistoryWeightMapPreparator";
import WeightMap from "../../BasedOnWeightsGenerator/WeightMap";

export default class DriverWeightMapPreparator extends HistoryWeightMapPreparator {

    constructor(historyDataGenerator: BasedOnWeightedHistoryDataGenerator) {
        super(historyDataGenerator);
    }

    getExportName(): string {
        return "DriverWeightMapPreparator";
    }

    async prepare(drivers: Driver[]) {
        let weight = 1;
        for (let seasonYear of this.historyGenerator.seasonYears) {
            this.logger.debug('seasonYear', seasonYear);
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {
                this.logger.debug('race');

                for (let object of SUPPORTED_CLASSES) {
                    this.logger.debug('object', object);
                    const weightMap = this.weights.get(object);

                    for (let result of this.historyData.getResultsForWeekendObject(object, race)) {
                        this.logger.debug('result');
                        const driver = Driver.findById(drivers, season2021To2021Mapping[result.driverId]);
                        if (driver) {

                            let position;
                            if (result.position === ResultsTable.POSITION_NOT_FINISHED) {
                                position = Result.PLACE_DNF;
                            } else {
                                position = parseInt(result.position, 10)
                            }

                            await this.updateWithNewWeight(driver, weightMap, position, weight);
                        }
                    }
                }
                weight *= BasedOnWeightedHistoryDataGenerator.raceMultiplier
            }
            weight *= BasedOnWeightedHistoryDataGenerator.seasonMultiplier
        }

    }

    async updateWithNewWeight(driver: Driver, map: WeightMap[], result: number, weight: number) {
        if (result === Result.PLACE_DNF) {
            result = 20;
        }
        const currentMapping = map.find((mapping) => mapping.driver === driver);

        if (currentMapping) {
            let position = 1;
            for (let weightMapping of map) {
                if (weightMapping.weight >= currentMapping.weight) {
                    position++;
                }
            }

            const correction = (position - result) * BasedOnWeightedHistoryDataGenerator.baseChange * weight;

            this.logger.debug(`Expected position ${position} found ${result} correcting ${correction}`)

            currentMapping.weight += correction;
            if (currentMapping.weight < 1) {
                currentMapping.weight = 1;
            }
        } else {
            map.push(new WeightMap({driver, weight: BasedOnWeightedHistoryDataGenerator.baseWeight}))
        }
        this.logger.debug('updateWithNewWeight', map);
    }

}
