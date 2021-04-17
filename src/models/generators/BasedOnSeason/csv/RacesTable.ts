import CsvTable from "./CsvTable";
import singleton from '../../../makeSingleton';

export type RaceData = {
    raceId: string,
    year: string,
    round: string,
    circuitId: string,
    date: string
}

export class RacesTable extends CsvTable<RaceData> {
    path: string = 'assets/history/races.csv';

    static instance: RacesTable;

    static singleton = singleton(RacesTable);
}

export default RacesTable.singleton()
