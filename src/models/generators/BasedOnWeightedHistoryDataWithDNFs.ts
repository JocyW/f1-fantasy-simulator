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
import {season2021To2021Mapping} from "../data/csv/mappings/data";
import {ResultsTable} from "../data/csv/ResultsTable";
import SUPPORTED_CLASSES from "../races/supportedWeekendObjects";

class DnfData {
    racesCount: number = 0
    dnfCount: number = 0

    get probability() {
        return this.dnfCount / this.racesCount
    }
}

export default class BasedOnWeightedHistoryDataWithDNFs implements FinishGenerator, WithLogger, WithExporter, Exportable {

    constructor(seasonYears: string[]) {
        this.logger = new Logger('BasedOnWeightedHistoryDataWithDNFs')
        this.historyGenerator = new BasedOnWeightedHistoryDataGenerator(seasonYears)
        this.historyData = new CombinedHistoryData();
        this.seasonYears = seasonYears;
        for (let object of SUPPORTED_CLASSES) {
            this.dnfProbabilityMapMap.set(object, new Map<Driver, DnfData>())
        }
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        await this.prepare(weekendObject);
        let res = await this.historyGenerator.generate(weekendObject);

        const objectClass = SUPPORTED_CLASSES.find((clazz) => (weekendObject instanceof clazz))

        for (let result of res) {
            if (Math.random() <= this.dnfProbabilityMapMap.get(objectClass).get(result.driver).probability) {
                result.place = Result.PLACE_DNF;
            }
        }

        return res
    }

    private async prepare(weekendObject: WeekendObject) {
        if(this.prepared) return;
        await this.historyData.readCsvs();

        for (let seasonYear of this.seasonYears) {
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {
                for (let weekendObjectClass of SUPPORTED_CLASSES) {
                    const map = this.dnfProbabilityMapMap.get(weekendObjectClass);

                    if (!map) throw Error('WTF?')

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
                            if (ResultsTable.POSITION_NOT_FINISHED === result.position || (result.q1 && result.q1 === ResultsTable.POSITION_NOT_FINISHED)) {
                                data.dnfCount++;
                            }
                        }
                    }
                }
            }
        }

        if (this.exporter) {
            this.historyGenerator.exporter = this.exporter;
            this.exporter.export(this);
        }

        this.prepared = true;
    }

    exporter: Exporter;
    logger: Logger;
    historyGenerator: BasedOnWeightedHistoryDataGenerator
    prepared = false;
    dnfProbabilityMapMap: Map<(typeof WeekendObject), Map<Driver, DnfData>> = new Map<typeof WeekendObject, Map<Driver, DnfData>>()
    historyData: CombinedHistoryData;
    seasonYears: string[] = [];

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
        return "GeneratorWeightsWithDNFs";
    }

}
