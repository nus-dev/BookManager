import * as fs from 'fs';
import * as path from 'path';
import { BookLogistics } from '../model/BookLogistics';

class BookLogisticsDC {
    private logistics: Array<BookLogistics> = [];

    public loadFromJson(jsonFilePath: string): void {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonObject = JSON.parse(data);
        this.logistics = jsonObject.logistics.map((name: string) => new BookLogistics(name, name));
    }

    public getLogistics(): Array<BookLogistics> {
        return this.logistics;
    }
}

export default new BookLogisticsDC();