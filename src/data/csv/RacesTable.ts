import CsvTable from "./CsvTable";
import singleton from '../../util/makeSingleton';

export type RaceData = {
    raceId: string,
    year: string,
    round: string,
    circuitId: string,
    date: string
}

export class RacesTable extends CsvTable<RaceData> {
    static instance: RacesTable;
    static singleton = singleton(RacesTable);
    path: string = 'assets/history/races.data.csv';
}

export default RacesTable.singleton()
