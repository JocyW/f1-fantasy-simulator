import WeightMapPreparator from "./WeightMapPreparator";
import Driver from "../../../roster/Driver";
import WeightMap from "../../BasedOnWeightsGenerator/WeightMap";
import combinedHistoryData, {CombinedHistoryData} from "../../../data/csv/CombinedHistoryData";
import Qualifying from "../../../race/weekend_object/Qualifying";
import Race from "../../../race/weekend_object/Race";
import BasedOnWeightedHistoryDataGenerator from "../BasedOnWeightedHistoryDataGenerator";
import Result from "../../../race/Result";
import WithLogger from "../../../logging/WithLogger";
import Logger from "../../../logging/Logger";
import Exportable from "../../../exporter/interface/Exportable";
import SUPPORTED_CLASSES from "../../../race/weekend_object/supportedWeekendObjects";
import WithExporter from "../../../exporter/interface/WithExporter";
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
                    .map(weight => {
                        let tmp: any = {
                            weight: weight.weight,
                            weekendObject: new weekendObject().type
                        }

                        if(weight.driver){
                            tmp = {
                                ...tmp,
                                driverId: weight.driver.id,
                                driverFirstName: weight.driver.firstName,
                                driverLastName: weight.driver.lastName,
                                driverTeamId: weight.driver.team.id
                            }
                        }

                        if(weight.team){
                            tmp = {
                                ...tmp,
                                teamId: weight.team.id,
                                teamName: weight.team.name
                            }
                        }

                        return tmp;
                    })
            )
        }
        return data;
    }

    getExportName(): string {
        return "HistoryWeightMapPreparator";
    }
}
