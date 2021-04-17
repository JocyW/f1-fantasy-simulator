import CsvTable from "./CsvTable";
import makeSingleton from '../../makeSingleton';
import {FinishableData} from "./FinishableData";

export interface ResultData extends FinishableData{
    grid: string,
}

export class ResultsTable extends CsvTable<ResultData>{
    static STATUS_DISQUALIFIED = 2;
    static POSITION_NOT_FINISHED = '\\N';

    path: string = 'assets/history/results.csv';

    static instance: ResultsTable;

    static singleton = makeSingleton(ResultsTable)
}

export default ResultsTable.singleton()
