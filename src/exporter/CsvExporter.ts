import Exporter from "./Exporter";
import fs from 'fs';
import path from "path";
import Exportable from "../Exportable";
import countGenerator from "../countGenerator";

export default class CsvExporter extends Exporter {
    static DELIMITER = ';';

    private _fileName: string | Generator<string>;
    private basePath: string;
    private nameGenerator: Generator<any>

    constructor(props: { basePath: string }) {
        super();

        this.basePath = props.basePath;
        this.nameGenerator = countGenerator();

        let part = '';
        for (let split of this.basePath.split(path.delimiter)) {
            part = path.join(part, split);
            if (!fs.existsSync(part)) {
                fs.mkdirSync(part)
            }
        }
    }


    export(exportable: Exportable) {
        const data = exportable.getExportData();
        const stream = fs.createWriteStream(path.join(this.basePath, `${this.nameGenerator.next().value}-${exportable.getExportName()}.csv`));

        stream.write(Object.keys(data[0]).join(CsvExporter.DELIMITER))

        stream.write('\n');

        for (let line of data) {
            stream.write(Object.values(line).join(CsvExporter.DELIMITER))
            stream.write('\n');
        }

        stream.close();
    }

}
