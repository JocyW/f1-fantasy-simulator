import FinishGeneratorModifier from "../FinishGeneratorModifier";
import Result from "../../race/Result";
import WithLogger from "../../logging/WithLogger";
import WithExporter from "../../exporter/interface/WithExporter";
import Exportable from "../../exporter/interface/Exportable";
import Exporter from "../../exporter/Exporter";
import Logger from "../../logging/Logger";
import FinishGenerator from "../FinishGenerator";
import SUPPORTED_CLASSES from "../../race/weekend_object/supportedWeekendObjects";
import Driver from "../../roster/Driver";
import WeekendObject from "../../race/weekend_object/WeekendObject";
import {season2021To2021Mapping} from "../../data/csv/mappings/drivers";
import {ResultsTable} from "../../data/csv/ResultsTable";
import BasedOnWeightedHistoryDataGenerator
    from "../BasedOnWeightedHistoryDataGenerator/BasedOnWeightedHistoryDataGenerator";
import combinedHistoryData from "../../data/csv/CombinedHistoryData";

class DnfData {
    racesCount: number = 0
    dnfCount: number = 0

    get probability() {
        return this.dnfCount / this.racesCount
    }
}

export default class HistoricalDNFModifier extends FinishGeneratorModifier implements WithLogger, WithExporter, Exportable {

    exporter: Exporter;
    logger: Logger;
    historyGenerator: BasedOnWeightedHistoryDataGenerator
    prepared = false;
    dnfProbabilityMapMap: Map<(typeof WeekendObject), Map<Driver, DnfData>> = new Map<typeof WeekendObject, Map<Driver, DnfData>>()
    historyData = combinedHistoryData;
    seasonYears: string[] = [];

    constructor(generator: FinishGenerator, seasonYears: string[]) {
        super(generator);
        this.logger = new Logger('HistoricalDNFModifier')
        this.seasonYears = seasonYears;
        for (let object of SUPPORTED_CLASSES) {
            this.dnfProbabilityMapMap.set(object, new Map<Driver, DnfData>())
        }
    }

    async modify(weekendObject: WeekendObject, results: Result[]): Promise<Result[]> {
        await this.prepare(weekendObject);

        const objectClass = SUPPORTED_CLASSES.find((clazz) => (weekendObject instanceof clazz))

        for (let result of results) {
            if (Math.random() <= this.dnfProbabilityMapMap.get(objectClass).get(result.driver).probability) {
                result.place = Result.PLACE_DNF;
            }
        }

        return results
    }

    getExportData(): object[] {
        const res = [];

        for (let [weekendObject, map] of this.dnfProbabilityMapMap.entries()) {
            for (let [driver, data] of map.entries()) {
                res.push({
                    driverId: driver.id,
                    driverFirstName: driver.firstName,
                    driverLastName: driver.lastName,
                    driverTeamId: driver.team.id,
                    racesCount: data.racesCount,
                    dnfCount: data.dnfCount,
                    dnfProbability: data.probability
                })
            }
        }

        return res;
    }

    getExportName(): string {
        return "HistoricalDNFModifier";
    }

    private async prepare(weekendObject: WeekendObject) {
        if (this.prepared) return;
        await this.historyData.readCsvs();

        for (let seasonYear of this.seasonYears) {
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {
                for (let weekendObjectClass of SUPPORTED_CLASSES) {
                    const map = this.dnfProbabilityMapMap.get(weekendObjectClass);

                    for (let result of this.historyData.getResultsForWeekendObject(weekendObjectClass, race)) {
                        const driver = Driver.findById(weekendObject.drivers, season2021To2021Mapping[result.driverId]);

                        if (driver) {
                            let data = map.get(driver);

                            if (!data) {
                                data = new DnfData();
                                map.set(driver, data);
                            }

                            data.racesCount++
                            // @ts-ignore
                            if (ResultsTable.POSITION_NOT_FINISHED === result.position) {
                                data.dnfCount++;
                            }
                        }
                    }
                }
            }
        }

        if (this.exporter) {
            // @ts-ignore
            this.generator.exporter = this.exporter;
            this.exporter.export(this);
        }

        this.prepared = true;
    }

}
