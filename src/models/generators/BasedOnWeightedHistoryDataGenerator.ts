import FinishGenerator from "../../interfaces/FinishGenerator";
import HasResults from "../higher/HasResults";
import Result from "../races/Result";
import HasSeasonYear from "../higher/HasSeasonYear";
import CombinedHistoryData from "../data/csv/CombinedHistoryData";
import Driver from "../roster/Driver";
import WithLogger from "../../interfaces/WithLogger";
import Logger from "../../logger";

export default class BasedOnWeightedHistoryDataGenerator extends HasSeasonYear implements FinishGenerator, WithLogger {

    public logger: Logger;

    private prepared = false;
    private historyData: CombinedHistoryData;

    private qualiWeights: { weight: number, driver: Driver }[] = [];
    private raceWeights: { weight: number, driver: Driver }[] = [];

    constructor(seasonYear: string) {
        super(seasonYear);

        this.historyData = new CombinedHistoryData();
        this.logger = new Logger('BasedOnWeightedHistoryGenerator')
    }


    async generate(hasResults: HasResults): Promise<Result[]> {
        this.logger.debug('Generating results');
        await this.prepare(hasResults.drivers);
        return []
    }

    private async prepare(drivers: Driver[]) {
        if (this.prepared) return;
        await this.historyData.readCsvs();

        for (let race of this.historyData.getRacesForSeason(this.seasonYear)) {
            const qualiResults = this.historyData.getQualifyingResultForRace(race);
            const raceResults = this.historyData.getRaceResultForRace(race);

        }


        this.prepared = true;
    }
}
