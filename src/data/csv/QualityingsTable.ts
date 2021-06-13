import CsvTable from "./CsvTable";
import singleton from '../makeSingleton';
import {FinishableData} from "./FinishableData";

export interface QualifyingData extends FinishableData {
    qualifyId: string,
    number: string,
    position: string
}

export class QualityingsTable extends CsvTable<QualifyingData> {
    static instance: QualityingsTable;
    static singleton = singleton(QualityingsTable);
    path: string = 'assets/history/qualifying.data.csv';
}

export default QualityingsTable.singleton()
