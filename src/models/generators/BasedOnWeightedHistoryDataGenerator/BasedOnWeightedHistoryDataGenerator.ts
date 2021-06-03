import FinishGenerator from "../../../interfaces/FinishGenerator";
import Result from "../../races/Result";
import combinedHistoryData from "../../data/csv/CombinedHistoryData";
import Driver from "../../roster/Driver";
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../Logger";
import Qualifying from "../../races/Qualifying";
import Race from "../../races/Race";
import WeekendObject from "../../races/WeekendObject";
import BasedOnWeightsGenerator from "../BasedOnWeightsGenerator/BasedOnWeightsGenerator";
import WithExporter from "../../../interfaces/WithExporter";
import Exporter from "../../exporter/Exporter";
import SUPPORTED_CLASSES from "../../races/supportedWeekendObjects";
import DriverWeightMapPreparator from "./preparators/DriverWeightMapPreparator";
import TeamWeightMapPreparator from "./preparators/TeamWeightMapPreparator";


export default class BasedOnWeightedHistoryDataGenerator implements FinishGenerator, WithLogger, WithExporter {

    static baseWeight = 10;
    static baseChange = 10
    static raceMultiplier = 1.01;
    static seasonMultiplier = 1.1;
    static rookieWeight = BasedOnWeightedHistoryDataGenerator.baseWeight * 0.01;

    public logger: Logger;
    public exporter: Exporter;
    public seasonYears: string[];
    private generators: WeakMap<typeof Race | typeof Qualifying, BasedOnWeightsGenerator> = new WeakMap<typeof Race | typeof Qualifying, BasedOnWeightsGenerator>();
    private prepared = false;
    private historyData = combinedHistoryData;

    constructor(seasonYears: string[]) {
        this.seasonYears = seasonYears;
        this.logger = new Logger('BasedOnWeightedHistoryGenerator')
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.prepare(weekendObject.drivers);

        let generator;
        for (let object of SUPPORTED_CLASSES) {
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

    private async prepare(drivers: Driver[]) {
        if (this.prepared) return;
        this.logger.info('Preparing weights for generation');
        await this.historyData.readCsvs();

        const driverPreparator = new DriverWeightMapPreparator(this)
        await driverPreparator.prepare(drivers);

        const teamPreparator = new TeamWeightMapPreparator(this);
        await teamPreparator.prepare(drivers);

        for (let object of SUPPORTED_CLASSES) {
            const driverWeights = driverPreparator.weights.get(object)
            driverWeights.forEach((map) => {
                    const teamWeights = teamPreparator.weights.get(object)
                    const teamWeight = teamWeights.find((weightMap) => weightMap.team === map.driver.team)

                    map.weight = map.weight === BasedOnWeightedHistoryDataGenerator.baseWeight ?
                        BasedOnWeightedHistoryDataGenerator.rookieWeight
                        :
                        map.weight

                    const normalizedTeamWeight = (teamWeight.weight / teamWeights.reduce((max, weight) => weight.weight > max ? weight.weight : max, 0)) * BasedOnWeightsGenerator.NORMALIZE_TO
                    const normalizedDriverWeight = (map.weight / driverWeights.reduce((max, weight) => weight.weight > max ? weight.weight : max, 0)) * BasedOnWeightsGenerator.NORMALIZE_TO
                    map.weight = (normalizedDriverWeight + normalizedTeamWeight) / 2
                }
            )

            this.generators.set(object, new BasedOnWeightsGenerator(driverWeights))
        }

        if (this.exporter) {
            this.exporter.export(driverPreparator);
            this.exporter.export(teamPreparator);
        }

        this.logger.info('Finished preparing weights');
        this.prepared = true;
    }
}
