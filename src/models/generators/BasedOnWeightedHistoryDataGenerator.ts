import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "../races/Result";
import CombinedHistoryData from "../data/csv/CombinedHistoryData";
import Driver from "../roster/Driver";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../Logger";
import Qualifying from "../races/Qualifying";
import Race from "../races/Race";
import WeekendObject from "../races/WeekendObject";
import BasedOnWeightsGenerator from "./BasedOnWeightsGenerator/BasedOnWeightsGenerator";
import WeightMap from "./BasedOnWeightsGenerator/WeightMap";
import {ResultsTable} from "../data/csv/ResultsTable";
import {season2021To2021Mapping} from "../data/csv/mappings/data";
import WithExporter from "../../interfaces/WithExporter";
import Exportable from "../../interfaces/Exportable";
import Exporter from "../exporter/Exporter";


export default class BasedOnWeightedHistoryDataGenerator implements FinishGenerator, WithLogger, WithExporter, Exportable {

    static baseWeight = 1000;
    static baseChange = 100;
    public logger: Logger;
    private generators: WeakMap<typeof Race | typeof Qualifying, BasedOnWeightsGenerator> = new WeakMap<typeof Race | typeof Qualifying, BasedOnWeightsGenerator>();
    private prepared = false;
    private historyData: CombinedHistoryData;
    private qualiWeights: WeightMap[] = [];
    private raceWeights: WeightMap[] = [];
    private weights = new Map([
        [Qualifying, this.qualiWeights],
        [Race, this.raceWeights]
    ]);
    private seasonYears: string[];

    constructor(seasonYears: string[]) {
        this.seasonYears = seasonYears;
        this.historyData = new CombinedHistoryData();
        this.logger = new Logger('BasedOnWeightedHistoryGenerator')
    }

    getExportData(): object[] {
        let data = [];

        for (let weekendObject of WeekendObject.SUPPORTED_CLASSES) {

            data = data.concat(
                ...this.weights.get(Qualifying)
                    .sort((a, b) => b.weight - a.weight)
                    .map(weight => ({
                        driverId: weight.driver.id,
                        driverFirstName: weight.driver.firstName,
                        driverLastName: weight.driver.lastName,
                        driverTeamId: weight.driver.team.id,
                        weight: weight.weight,
                        weekendObject: new weekendObject().type
                    }))
            )
        }
        return data;
    }

    getExportName(): string {
        return "GeneratorWeights"
    }

    exporter: Exporter;


    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.prepare(weekendObject.drivers);

        let generator;
        for (let object of WeekendObject.SUPPORTED_CLASSES) {
            if (weekendObject instanceof object) {
                generator = this.generators.get(object)
            }
        }

        if (generator) {
            this.logger.debug('Found generator. Invoking generate()')
            return await generator.generate(weekendObject);
        }
        this.logger.error('No generator found for weekendObject', weekendObject)
        return [];
    }

    private async updateWithNewWeight(driver: Driver, map: WeightMap[], result: number, weight: number) {
        if (result === Result.PLACE_DNF) {
            result = 20;
        }
        const currentMapping = map.find((mapping) => mapping.driver === driver);

        if (currentMapping) {
            let position = 1;
            for (let weightMapping of map) {
                if (weightMapping.weight > currentMapping.weight) {
                    position++;
                }
            }
            currentMapping.weight += (position - result) * BasedOnWeightedHistoryDataGenerator.baseChange * weight;
            if (currentMapping.weight < 1) {
                currentMapping.weight = 1;
            }
        } else {
            map.push(new WeightMap({driver, weight: BasedOnWeightedHistoryDataGenerator.baseWeight}))
        }
        this.logger.debug('updateWithNewWeight', map);
    }

    private async prepare(drivers: Driver[]) {
        if (this.prepared) return;
        this.logger.info('Preparing weights for generation');
        await this.historyData.readCsvs();
        let weight = 1;

        for (let seasonYear of this.seasonYears) {
            this.logger.debug('seasonYear', seasonYear);
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {
                this.logger.debug('race');

                for (let object of WeekendObject.SUPPORTED_CLASSES) {
                    this.logger.debug('object', object);

                    for (let result of this.historyData.getResultsForWeekendObject(object, race)) {
                        this.logger.debug('result');
                        const driver = Driver.findById(drivers, season2021To2021Mapping[result.driverId]);
                        if (driver) {
                            //TODO: calculate weight based on progression in season and season year
                            const weightMap = this.weights.get(object);

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
                weight *= 1.5
            }
            weight *= 2;
        }

        for (let object of WeekendObject.SUPPORTED_CLASSES) {
            this.generators.set(object, new BasedOnWeightsGenerator(this.weights.get(object)))
        }

        if (this.exporter)
            this.exporter.export(this)


        this.logger.info('Finished preparing weights');
        this.prepared = true;
    }
}
