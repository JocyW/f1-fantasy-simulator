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
import Team from "../../roster/Team";

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
    dnfProbabilityMapMap: Map<(typeof WeekendObject), Map<Driver | Team, DnfData>> = new Map<typeof WeekendObject, Map<Driver | Team, DnfData>>()
    historyData = combinedHistoryData;
    seasonYears: string[] = [];

    constructor(generator: FinishGenerator, seasonYears: string[]) {
        super(generator);
        this.logger = new Logger('HistoricalDNFModifier')
        this.seasonYears = seasonYears;
        for (let object of SUPPORTED_CLASSES) {
            this.dnfProbabilityMapMap.set(object, new Map<Driver | Team, DnfData>())
        }
    }

    async modify(weekendObject: WeekendObject, results: Result[]): Promise<Result[]> {
        await this.prepare(weekendObject);

        const objectClass = SUPPORTED_CLASSES.find((clazz) => (weekendObject instanceof clazz))
        const probabilityMap = this.dnfProbabilityMapMap.get(objectClass);

        for (let result of results) {
            const driverProbability = probabilityMap.get(result.driver).probability;
            const teamProbability = probabilityMap.get(result.driver.team).probability;
            if (Math.random() <= (driverProbability + teamProbability) / 2) {
                result.place = Result.PLACE_DNF;
            }
        }

        return results
    }

    getExportData(): object[] {
        const res = [];

        for (let [weekendObject, map] of this.dnfProbabilityMapMap.entries()) {
            for (let [teamOrDriver, data] of map.entries()) {
                if (teamOrDriver instanceof Driver) {
                    res.push({
                        driverId: teamOrDriver.id,
                        driverFirstName: teamOrDriver.firstName,
                        driverLastName: teamOrDriver.lastName,
                        driverTeamId: teamOrDriver.team.id,
                        racesCount: data.racesCount,
                        dnfCount: data.dnfCount,
                        dnfProbability: data.probability,
                        teamDnfProbability: map.get(teamOrDriver.team)
                    })
                }
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
                            for (let teamOrDriver of [driver, driver.team]) {
                                let data = map.get(teamOrDriver);

                                if (!data) {
                                    data = new DnfData();
                                    map.set(teamOrDriver, data);
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
        }

        if (this.exporter) {
            // @ts-ignore
            this.generator.exporter = this.exporter;
            this.exporter.export(this);
        }

        this.prepared = true;
    }

}
