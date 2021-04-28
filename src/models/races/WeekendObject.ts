import HasResults from "../higher/HasResults";
import Simulateable from "../../interfaces/Simulateable";
import Driver from "../roster/Driver";
import FinishGenerator from "../../interfaces/FinishGenerator";
import Result from "./Result";
import Exportable from "../../interfaces/Exportable";
import Exporter from "../exporter/Exporter";

export default abstract class WeekendObject extends HasResults implements Simulateable, Exportable {

    abstract type: string;

    abstract getDriverScore(driver: Driver, isTeam: boolean): Promise<number>

    exporter: Exporter;

    async simulate(generator: FinishGenerator): Promise<Result[]> {
        this.results = await generator.generate(this);

        if (this.exporter) {
            this.exporter.export(this.results);
        }

        return this.results;
    }

}
