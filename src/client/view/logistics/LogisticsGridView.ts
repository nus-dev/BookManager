import { BookLogistics } from "../../model/BookLogistics";
import { BookModel } from "../../model/BookModel";
import { View, ViewState } from "../View";
// import { LogisticsInfoView, LogisticsInfoViewStatus } from "./LogisticsInfoView";
import Grid from 'tui-grid';
import BookLogisticsDC from "../../dc/BookLogisticsDC";

export class LogisticsGridView extends View<LogisticsGridViewStatus> {
    private readonly gridInstance: Grid;
    private readonly platforms: Array<BookLogistics>;
    // private logisticsViews: Array<LogisticsInfoView> = [];
    // private onSelectHandlers: Array<any> = [];

    constructor(id: string) {
        super(id);
        this.platforms = BookLogisticsDC.getLogistics();
        this.gridInstance = new Grid({
            el: this.element,
            bodyHeight: 490,
            width: 'auto',
            columns: Object.assign([
                { header: '순번', name: 'id' },
                { header: '구분', name: 'gubun' },
                { header: '도서명', name: 'bookName' },
                { header: '저자명', name: 'writer' },
                { header: '출판사', name: 'publisher' },
                { header: '판매 상태', name: 'sellState' }
            ], this.platforms.map(logistic => {
                return {
                    header: logistic.key,
                    name: logistic.name
                }
            })
            )
            // header: {
            //   complexColumns: [{
            //     header: '플랫폼', name: 'platform',
            //     childNames: BookLogisticsDC.getLogistics().map(logistic => logistic.name)
            //   }]
            // }
        });
    }

    public render(): void {
        this.gridInstance.resetData(
            this.state.books.map((book: BookModel) => {
                return Object.assign({
                    id: book.순번,
                    gubun: book.구분1,
                    bookName: book.도서명,
                    writer: book.저자명,
                    publisher: book.출판사,
                    sellState: book.판매상태
                }, this.getPlatformMap(book))
            })
        );

        // for (let i = 0; i < this.state.books.length; i++) {
        //     if (!this.logisticsViews[i]) {
        //         this.logisticsViews.push(new LogisticsInfoView(null));
        //         this.element.appendChild(this.logisticsViews[i].element);
        //         // this.bookInfoViews[i].setOnClick((book: BookModel) => this.onSelect(book));
        //     }

        //     this.logisticsViews[i].setState(new LogisticsInfoViewStatus(this.state.books[i], this.state.logistics));
        // }
    }

    private getPlatformMap(book: BookModel): any {
        const result : any = {};
        // this.platforms.forEach(type => {
        //     const platformName : string = type.key;
        //     result[platformName] = book.플랫폼.some(이름 => 이름 === platformName) ? 'O' : 'X'
        // });

        return result;
    }

    // private onSelect(book: BookModel): void {
    //     this.onSelectHandlers.forEach(handler => handler(book));
    // }

    // public setOnSelect(handler: (book: BookModel) => void): void {
    //     this.onSelectHandlers.push(handler);
    // }
}

export class LogisticsGridViewStatus extends ViewState {
    constructor(public readonly books: Array<BookModel>, public readonly logistics: Array<BookLogistics>) {
        super();
    }
}