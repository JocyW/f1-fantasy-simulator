import fs from 'fs';
import csv from 'csv-parser'

export default abstract class CsvTable{
    abstract path: string;
    abstract data: { [headers: string]: string | number | Date }[] = [];

    readFile(): Promise<{ [headers: string]: string | number | Date }[]> {
        return new Promise((resolve, reject) => {

            if (this.data.length > 0) {
                resolve(this.data)
            }

            fs.createReadStream('data.csv').pipe(csv())
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
