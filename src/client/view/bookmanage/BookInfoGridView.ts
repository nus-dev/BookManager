import {View, ViewState} from "../View";
import {BookModel} from "../../model/BookModel";
import Grid from 'tui-grid';

export class BookInfoGridView extends View<BookInfoGridViewStatus> {
    private gridInstance: Grid;
    private onSelectHandlers: Array<any> = [];

    constructor(id: string) {
        super(id);

        this.gridInstance = new Grid({
            el: this.element,
            bodyHeight: 745,
            columns: [
                {
                    header: '책ID',
                    name: 'id',
                    width: 60
                },
                {
                    header: '구분',
                    name: 'gubun',
                    width: 50
                },
                {
                    header: '도서명',
                    name: 'bookName',
                    width: 410
                },
                {
                    header: '저자명',
                    name: 'writer',
                    width: 140
                },
                {
                    header: '출판사',
                    name: 'publisher',
                    width: 200
                },
                {
                    header: '판매상태',
                    name: 'sellState',
                    width: 80
                },
            ],
            rowHeight: 40
        });

        this.gridInstance.on('focusChange', ev => {
            const rowKey: number = (ev as any).rowKey;
            this.onSelect(this.state.books[rowKey]);
        });
    }
    
    public render(): void {
        this.gridInstance.resetData(this.state.books.map((book: BookModel) => {
            return {
                id: book.순번,
                gubun: book.구분1,
                bookName: book.도서명,
                writer: book.저자명,
                publisher: book.출판사,
                sellState: book.판매상태
            }
        }), {
            sortState: {
                ascending: true,
                columnName: 'id',
                multiple: false
            }
        });
    }

    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookInfoGridViewStatus extends ViewState {
    constructor(public books: Array<BookModel>) {
        super();
    }
}