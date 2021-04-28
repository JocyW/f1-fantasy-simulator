import Exporter from "./Exporter";
import fs from 'fs';
import path from "path";

export default class CsvExporter extends Exporter {
    get fileName(): string {
        if (typeof this._fileName === 'string') {
            return this._fileName
        }

        // @ts-ignore
        return this._fileName.next().value
    }

    set fileName(value: string) {
        this._fileName = value;
    }

    static DELIMITER = ';';

    private _fileName: string | Generator<string>;
    private basePath: string;

    constructor(props: { basePath: string, fileName: string | Generator<string> }) {
        super();

        this.basePath = props.basePath;


        let part = '';
        for (let split of this.basePath.split(path.delimiter)) {
            part = path.join(part,split);
            if(!fs.existsSync(part)){
                fs.mkdirSync(part)
            }
        }

        this._fileName = props.fileName;
    }


    export(data: object[]) {
        const stream = fs.createWriteStream(path.join(this.basePath, this.fileName));

        stream.write(Object.keys(data[0]).join(CsvExporter.DELIMITER))

        stream.write('\n');

        for (let line of data) {
            stream.write(Object.values(line).join(CsvExporter.DELIMITER))
            stream.write('\n');
        }

        stream.end();
    }

}
