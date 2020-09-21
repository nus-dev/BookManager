import ConfigDC from '../dc/ConfigDC';
import { BookModel } from '../model/BookModel';
import DateConvertUtil from '../view/bookmanage/util/DateConvertUtil';
import exceljs from 'exceljs';
import xlsx from 'xlsx';
import * as fs from 'fs';

class ExcelAgent {
    private addSheet(workBook: exceljs.Workbook, arrayOfArray: Array<Array<any>>, name: string): void {
        const workSheet = workBook.addWorksheet(name);
        workSheet.addRows(arrayOfArray);
        workSheet.getRow(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFBDD6EE'}};
        workSheet.autoFilter = {
            from: {
                row: 1,
                column: 1
            },
            to: {
                row: 1,
                column: arrayOfArray[0].length
            }
        }
    }

    public async writeExcelFileOnlyLogistics(books: Array<BookModel>, logistics: Array<string>, filePath: string): Promise<void> {
        const excelFormat = ConfigDC.getExcelFormat(1);
        const arrayOfArray = [];
        const header = excelFormat.열.slice().concat(logistics);
        arrayOfArray.push(header);
        books.forEach((book: any) => {
            const 열 = excelFormat.열.map((열이름: string) => book[열이름] || '');
            logistics.forEach((platform: string) => {
                열.push(book.플랫폼들.get(platform) || '-');
            });
            arrayOfArray.push(열);
        })
        
        const workBook = new exceljs.Workbook();
        this.addSheet(workBook, arrayOfArray, excelFormat.시트명);

        const buffer = await workBook.xlsx.writeBuffer();
        fs.writeFileSync(filePath, buffer);
    }

    public async writeExcelFileAll(books: Array<BookModel>, logistics: Array<string>, filePath: string): Promise<void> {
        const workBook = new exceljs.Workbook();
        
        const excelFormats = ConfigDC.getExcelFormatAll();
        excelFormats.forEach((excelFormat, formatIdx) => {
            const arrayOfArray = [];
            const header = formatIdx === 1 ? excelFormat.열.slice().concat(logistics) : excelFormat.열.slice();
            arrayOfArray.push(header);
            books.forEach((book: any) => {
                const 열 = excelFormat.열.map((열이름: string) => book[열이름] || '');
                if (formatIdx === 1) {
                    logistics.forEach((platform: string) => {
                        열.push(book.플랫폼들.get(platform) || '-');
                    });
                }
                arrayOfArray.push(열);
            })
            this.addSheet(workBook, arrayOfArray, excelFormat.시트명);
        });

        const buffer = await workBook.xlsx.writeBuffer();
        fs.writeFileSync(filePath, buffer);
    }

    public writeExcelFile(json: any, filePath: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                const jsonArray = Array.isArray(json) ? json : [json];
            
                const newSpreadSheet = xlsx.utils.book_new();
                jsonArray.forEach(json => {
                    const sheet = xlsx.utils.json_to_sheet(json);
                    xlsx.utils.book_append_sheet(newSpreadSheet, sheet);
                });
                xlsx.writeFile(newSpreadSheet, filePath);
            } catch (e) {
                reject(e);
                return;
            }
            resolve();
        });
    }

    public readExcelFile(filePath: string): Promise<Array<BookModel>> {
        return new Promise<Array<BookModel>>((resolve) => {
            const workBook = xlsx.readFile(filePath);
            const sheets = workBook.SheetNames.map((sheetName: string) => workBook.Sheets[sheetName]);
            const json = sheets.map((sheet) => xlsx.utils.sheet_to_json(sheet));
            const bookModels = this.jsonToBookModels(json);
            resolve(bookModels);
        });
    }

    private jsonToBookModels(json: any): Array<BookModel> {
        const bookModels: Array<BookModel> = json[0].map((data: any) => this.bookJsonToBookModel(data));

        const map = new Map<number, BookModel>();
        bookModels.forEach((book: BookModel) => map.set(book.순번, book));

        // console.log(json[1]);
        json[1].forEach((data: any) => {
            const idx = data.순번;
            const book: BookModel = map.get(idx);
            if (book) {
                Object.keys(data).filter(key => key === '독점 플랫폼' || key === '독점종료일').forEach(key => {
                    (book as any)[key] = data[key] || '';
                });

                Object.keys(data).filter(key => key !== '순번' && key !== '도서명' && key !== '저자명' && key !== '출판사' && key !== '판매상태').forEach((key: string) => {
                    // console.log(json[1]);
                    const value = (String(data[key]) || '').trim().toUpperCase();
                    if (value === 'O') {
                        book.플랫폼들.set(key, 'O')
                    } else if (value === 'X') {
                        book.플랫폼들.set(key, 'X')
                    } else {
                        book.플랫폼들.set(key, '-')
                    }
                });
            }
        });

        return bookModels;
    }

    private bookJsonToBookModel(json: any): BookModel {
        json.플랫폼들 = new Map<string, 'O' | 'X' | '-'>();
        json.구분 = this.getValidValue(ConfigDC.getGubuns(), json.구분);
        json.분류 = this.getValidValue(ConfigDC.getKinds(), json.분류);
        json.완결 = this.getValidValue(ConfigDC.getIsFinishs(), json.완결);
        json.성인 = this.getValidValue(ConfigDC.getIsAdults(), json.성인);
        json.대여여부 = this.getValidValue(ConfigDC.getIsLendables(), json.대여여부);
        json.판매상태 = this.getValidValue(ConfigDC.getSellStates(), json.판매상태);
        if (json.발행일) json.발행일 = DateConvertUtil.excelDateToDateString(json.발행일);
        if (json.독점종료일) json.독점종료일 = DateConvertUtil.excelDateToDateString(json.독점종료일);
        return json;
    }

    private getValidValue(arr: Array<string>, data: any): any {
        const idx: number = arr.indexOf((data || '').trim());
        return (idx >= 0) ? arr[idx] : arr[0];
    }
}

export default new ExcelAgent();