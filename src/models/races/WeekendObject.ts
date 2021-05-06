import HasResults from "../higher/HasResults";
import Simulateable from "../../interfaces/Simulateable";
import Driver from "../roster/Driver";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "./Result";
import WithExporter from "../../interfaces/WithExporter";
import Exporter from "../exporter/Exporter";
import Exportable from "../../interfaces/Exportable";
import Qualifying from "./Qualifying";
import Race from "./Race";

export default abstract class WeekendObject extends HasResults implements Simulateable, WithExporter, Exportable {


    abstract type: string;
    exporter: Exporter;

    abstract getDriverScore(driver: Driver, isTeam: boolean): Promise<number>

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
