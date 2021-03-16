import CsvTable from "./CsvTable";
import singleton from '../../../makeSingleton';

export class RacesTable extends CsvTable {
    data: { raceId: number, year: number, round: number, circuitId: number, date: Date }[] = [];
    path: string = '../assets/history/races.csv';

    static instance: RacesTable;

    static singleton = singleton(RacesTable)
}

export default RacesTable.singleton()
