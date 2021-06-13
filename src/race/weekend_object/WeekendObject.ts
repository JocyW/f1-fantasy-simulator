import HasResults from "../interface/HasResults";
import Simulateable from "../interface/Simulateable";
import Driver from "../../roster/Driver";
import FinishGenerator from "../../generator/FinishGenerator";
import Result from "../Result";
import WithExporter from "../../exporter/interface/WithExporter";
import Exporter from "../../exporter/Exporter";
import Exportable from "../../exporter/interface/Exportable";

export default abstract class WeekendObject extends HasResults implements Simulateable, WithExporter, Exportable {


    abstract type: string;
    exporter: Exporter;

    private isTeamMap = new Map<Driver, number>()
    private driverMap = new Map<Driver, number>()


    abstract getDriverScore(driver: Driver, isTeam: boolean): Promise<number>

    // Caching for scoring
    async getScore(driver: Driver, isTeam: boolean): Promise<number> {
        if (isTeam && this.isTeamMap.get(driver)) {
            return this.isTeamMap.get(driver);
        } else if (!isTeam && this.driverMap.get(driver)) {
            return this.driverMap.get(driver);
        }

        const score = await this.getDriverScore(driver, isTeam);

        if (isTeam) {
            this.isTeamMap.set(driver, score)
        } else {
            this.isTeamMap.set(driver, score)
        }

        return score;
    }

    async simulate(generator: FinishGenerator): Promise<Result[]> {
        this.results = await generator.generate(this);

        if (this.exporter) {
            this.exporter.export(this);
        }

        return this.results;
    }

    getExportData(): object[] {
        return this.results.map((result) => {
            return {
                driverId: result.driver.id,
                driverFirstName: result.driver.firstName,
                driverLastName: result.driver.lastName,
                driverTeamId: result.driver.team.id,
                place: result.place
            }
        }).sort((resultLikeA, resultLikeB) => resultLikeA.place - resultLikeB.place)
    }

    getExportName(): string {
        return this.type;
    }
}
