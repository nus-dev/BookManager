import * as fs from 'fs';
import * as path from 'path';
import ExcelAgent from '../agent/ExcelAgent';
import { BookModel } from '../model/BookModel';

class BookDC {
    private books: Array<BookModel> = [];
    private searchedBooks: Array<BookModel> = [];
    private selectedBook: BookModel;

    // constructor() {
    //     const data = fs.readFileSync(path.join(__dirname, '../../../testData/BookData.json'), 'utf8');
    //     const jsonObject = JSON.parse(data);
    //     this.books = jsonObject.Sheet1;
    // }

    public loadFromJson(jsonFilePath: string): void {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const jsonObject = JSON.parse(data);
        this.books = jsonObject.Sheet1;
    }

    // public getBookCountByIdx(idx: number): number {
    //     return this.books.reduce((prev: number, curr: BookModel) => curr.순번 === idx ? prev + 1 : prev, 0);
    // }

    public getBookByIdx(idx: number): BookModel {
        const searchedBook = this.books.find((book: BookModel) => book.순번 === idx);
        this.searchedBooks = searchedBook ? [searchedBook] : [];
        return searchedBook;
    }

    public getBooksByName(name: string): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.도서명 && book.도서명.includes(name));
        return this.searchedBooks;
    }

    public getBooksById(bookId: number): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.순번 && book.순번 === bookId);
        return this.searchedBooks;
    }

    public getBooksByWriter(name: string): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.저자명 && book.저자명.includes(name));
        return this.searchedBooks;
    }

    public getBooksByPublisher(publisher: string): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.출판사 && book.출판사.includes(publisher));
        return this.searchedBooks;
    }

    public getBooksBySellStatus(sellStatus: boolean): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.판매상태 === sellStatus);
        return this.searchedBooks;
    }

    public getSearchedBooks(): Array<BookModel> {
        return this.searchedBooks;
    }

    public getSelectedBook(): BookModel {
        return this.selectedBook;
    }

    public getAllBooks(): Array<BookModel> {
        this.searchedBooks = this.books;
        return this.searchedBooks;
    }
    
    public setSelectedBook(book: BookModel): void {
        this.selectedBook = book;
    }

    public save() {
        ExcelAgent.writeExcelFile(this.books, 'C:/Users/NUS/Documents/Dev/aaa.xlsx');
    }

    public readExcelFile() {
        ExcelAgent.readExcelFile('C:/Users/NUS/Documents/Dev/aaa.xlsx');
    }

    public update(): Promise<void> {
        return null;
    }
}

export default new BookDC();