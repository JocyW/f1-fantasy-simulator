import CsvTable from "./CsvTable";
import singleton from '../../../makeSingleton';
import {FinishableData} from "./FinishableData";

export interface QualifyingData extends FinishableData{
    qualifyId: string,
    number: string,
    position: string
}

export class QualityingsTable extends CsvTable<QualifyingData> {
    path: string = 'assets/history/qualifying.csv';

    static instance: QualityingsTable;

    static singleton = singleton(QualityingsTable);
}

export default QualityingsTable.singleton()
