import WeightMapPreparator from "./WeightMapPreparator";
import Driver from "../../../roster/Driver";
import WeightMap from "../../BasedOnWeightsGenerator/WeightMap";
import combinedHistoryData, {CombinedHistoryData} from "../../../data/csv/CombinedHistoryData";
import Qualifying from "../../../races/Qualifying";
import Race from "../../../races/Race";
import BasedOnWeightedHistoryDataGenerator from "../BasedOnWeightedHistoryDataGenerator";
import Result from "../../../races/Result";
import WithLogger from "../../../../interfaces/WithLogger";
import Logger from "../../../Logger";
import Exportable from "../../../../interfaces/Exportable";
import SUPPORTED_CLASSES from "../../../races/supportedWeekendObjects";
import WithExporter from "../../../../interfaces/WithExporter";
import Exporter from "../../../exporter/Exporter";

export default abstract class HistoryWeightMapPreparator implements WeightMapPreparator, WithExporter, Exportable, WithLogger {

    public exporter: Exporter;
    logger: Logger;
    protected historyData: CombinedHistoryData = combinedHistoryData;
    protected qualiWeights: WeightMap[] = [];
    protected raceWeights: WeightMap[] = [];
    public weights = new Map([
        [Qualifying, this.qualiWeights],
        [Race, this.raceWeights]
    ]);
    protected historyGenerator: BasedOnWeightedHistoryDataGenerator;

    protected constructor(historyGenerator: BasedOnWeightedHistoryDataGenerator) {
        this.historyGenerator = historyGenerator;
        this.logger = new Logger('HistoryWeightMapPreparator')
    }

    abstract prepare(drivers: Driver[]): Promise<void>

    getExportData(): object[] {
        let data = [];

        for (let weekendObject of SUPPORTED_CLASSES) {

            data = data.concat(
                ...this.weights.get(weekendObject)
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
        return "HistoryWeightMapPreparator";
    }
}
