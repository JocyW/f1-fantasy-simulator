import CsvTable from "./CsvTable";
import makeSingleton from '../../util/makeSingleton';
import {FinishableData} from "./FinishableData";

export interface ResultData extends FinishableData {
    grid: string,
}

export class ResultsTable extends CsvTable<ResultData> {
    static STATUS_DISQUALIFIED = 2;
    static POSITION_NOT_FINISHED = '\\N';
    static instance: ResultsTable;
    static singleton = makeSingleton(ResultsTable);
    path: string = 'assets/history/results.data.csv';
}

export default ResultsTable.singleton()
