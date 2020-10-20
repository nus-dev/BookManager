import ExcelAgent from '../agent/ExcelAgent';
import { BookModel } from '../model/BookModel';
import {ipcRenderer, IpcRendererEvent} from 'electron';
import ConfigDC from './ConfigDC';

class BookDC {
    private books: Array<BookModel> = [];
    private searchedBooks: Array<BookModel> = [];
    private selectedBook: BookModel;

    public getBookByIdx(idx: string): BookModel {
        const searchedBook = this.books.find((book: BookModel) => book.순번 === idx);
        this.searchedBooks = searchedBook ? [searchedBook] : [];
        return searchedBook;
    }

    public getBooksByName(name: string): Array<BookModel> {
        this.searchedBooks = this.books.filter((book: BookModel) => book.도서명 && book.도서명.includes(name));
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
        this.searchedBooks = this.books.filter((book: BookModel) => book.판매상태 === (sellStatus ? 'O' : 'X'));
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

    public save(books: Array<BookModel>, platforms: Array<string>) {
        const onFileDialogOff = (event: IpcRendererEvent, args: any) => {
            ipcRenderer.off('savedFilePath', onFileDialogOff);

            if (args) {
                // ExcelAgent.writeExcelFileAll(this.searchedBooks, 'C:/Users/NUS/Documents/Dev/aaa.xlsx');
                ExcelAgent.writeExcelFileOnlyLogistics(books, platforms, args);
            }
        }
        ipcRenderer.on('savedFilePath', onFileDialogOff);
        ipcRenderer.send('showFileSaveDialog', '도서관리.xlsx');
    }

    public saveAll() {
        const onFileDialogOff = (event: IpcRendererEvent, args: any) => {
            ipcRenderer.off('savedFilePath', onFileDialogOff);

            if (args) {
                // ExcelAgent.writeExcelFileAll(this.searchedBooks, 'C:/Users/NUS/Documents/Dev/aaa.xlsx');
                ExcelAgent.writeExcelFileAll(this.searchedBooks, ConfigDC.getPlatforms(), args);
            }
        }
        ipcRenderer.on('savedFilePath', onFileDialogOff);
        ipcRenderer.send('showFileSaveDialog', '도서관리.xlsx');
    }

    public async readExcelFile(filePath: string): Promise<void> {
        const bookModels: Array<BookModel> = await ExcelAgent.readExcelFile(filePath);
        bookModels.sort((book1, book2) => {
            return Number(book1.순번) - Number(book2.순번)
        });

        if (bookModels.some(book => {
            const idx = String(book.순번);
            const oldBookk = this.books.find(oldBook => oldBook.순번 === idx);
            return oldBookk && JSON.stringify(book) !== JSON.stringify(oldBookk);
        })) {
            // 덮어쓸거냐 물어봐서
            const code = await this.showMessageBox();
            if (code === 0) {
                return;
            }

            if (code === 1) {
                //덮어 쓴다면
                const newBooks = this.books.filter(book => bookModels.every(oldBook => book.순번 !== oldBook.순번));
                this.books = bookModels;
                this.books.push(...newBooks);
                this.books.sort((book1, book2) => {
                    return Number(book1.순번) - Number(book2.순번)
                });
            } else {
                //아니라면 안겹치는것만 넣어주기

                const newBooks = bookModels.filter(book => this.books.every(oldBook => book.순번 !== oldBook.순번));
                this.books.push(...newBooks);
                this.books.sort((book1, book2) => {
                    return Number(book1.순번) - Number(book2.순번)
                });
            }
        } else {
            this.books = bookModels;
        }
    }

    private showMessageBox(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const onFileDialogOff = async (event: IpcRendererEvent, args: any) => {
                try {
                    ipcRenderer.off('message', onFileDialogOff);
                    resolve(args);
                } catch (e) {
                    reject(e);
                }
            }
            ipcRenderer.on('message', onFileDialogOff);
            ipcRenderer.send('showMessageBox', '겹치는 수정내역이 있습니다. 덮어쓰시겠습니까?', ['취소', '덮어쓰기', '겹치지 않는 것만 추가']);
        });
    }

    public upload(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const onFileDialogOff = async (event: IpcRendererEvent, args: any) => {
                try {
                    ipcRenderer.off('openFilePath', onFileDialogOff);
    
                    if (args && args.length > 0) {
                        await this.readExcelFile(args[0]);
                        resolve();
                    }
                } catch (e) {
                    reject(e);
                }
            }
            ipcRenderer.on('openFilePath', onFileDialogOff);
            ipcRenderer.send('showFileOpenDialog', 'xlsx');
        })
    }

    public update(): Promise<void> {
        return null;
    }
}

export default new BookDC();