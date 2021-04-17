import fs from 'fs';
import csv from 'csv-parser'

export default abstract class CsvTable<T>{
    abstract path: string;
    data: T[] = [];

    readFile(): Promise<T[]> {
        return new Promise((resolve, reject) => {

            if(!this.path){
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
