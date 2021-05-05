import FinishGenerator from "../../interfaces/FinishGenerator";
import WeekendObject from "../races/WeekendObject";
import Result from "../races/Result";
import WithLogger from "../../interfaces/WithLogger";
import WithExporter from "../../interfaces/WithExporter";
import Exportable from "../../interfaces/Exportable";
import Exporter from "../exporter/Exporter";
import Logger from "../Logger";
import BasedOnWeightedHistoryDataGenerator from "./BasedOnWeightedHistoryDataGenerator";
import Driver from "../roster/Driver";
import CombinedHistoryData from "../data/csv/CombinedHistoryData";

export default class BasedOnWeightedHistoryDataWithDNFs implements FinishGenerator, WithLogger, WithExporter, Exportable {

    constructor(seasonYears: string[]) {
        this.logger = new Logger('BasedOnWeightedHistoryDataWithDNFs')
        this.historyGenerator = new BasedOnWeightedHistoryDataGenerator(seasonYears)
        this.historyData = new CombinedHistoryData();
        for (let object of WeekendObject.SUPPORTED_CLASSES) {
            this.dnfProbabilityMapMap.set(object, new Map<Driver, number>())
        }
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        //TODO: implement
        return []
    }

    private async prepare() {
        await this.historyData.readCsvs();

        //TODO: implement

        this.prepared = true;
    }

    exporter: Exporter;
    logger: Logger;
    historyGenerator: BasedOnWeightedHistoryDataGenerator
    prepared = false;
    dnfProbabilityMapMap: Map<(typeof WeekendObject), Map<Driver, number>>
    historyData: CombinedHistoryData;

    //TODO: implement
    getExportData(): object[] {
        return [];
    }

    getExportName(): string {
        return "GeneratorWeightsWithDNFs";
    }

}
