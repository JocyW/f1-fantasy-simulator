import CsvTable from "./CsvTable";

export class ResultsTable extends CsvTable{
    static STATUS_DISQUALIFIED = 2;

    data: { raceId: number, driverId: number, grid: number, position: number|'\\N'}[];
    path: string;
}
