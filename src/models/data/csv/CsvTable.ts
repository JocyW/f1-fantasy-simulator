import fs from 'fs';
import csv from 'csv-parser'
import WithLogger from "../../../interfaces/WithLogger";
import Logger from "../../../logger";

export default abstract class CsvTable<T> implements WithLogger {
    abstract path: string;
    data: T[] = [];
    public logger: Logger

    constructor() {
        this.logger = new Logger('CsvTable')
    }


    readFile(): Promise<T[]> {
        this.logger.info('Reading data from ', this.path)
        return new Promise((resolve, reject) => {

            if (!this.path) {
                reject(Error('No path for CSV file specified'))
            }

            if (this.data.length > 0) {
                resolve(this.data)
            }

            fs.createReadStream(this.path).pipe(csv())
                .on('data', (data) => {
                    this.data.push(data)
                })
                .on('end', () => {
                    resolve(this.data);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }
}
