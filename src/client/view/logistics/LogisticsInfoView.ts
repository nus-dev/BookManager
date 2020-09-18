import {View, ViewState} from "../View";
import {BookModel} from "../../model/BookModel";
import {TdView, TdViewStatus} from "../common/TdView";
import { BookLogistics } from "../../model/BookLogistics";

export class LogisticsInfoView extends View<LogisticsInfoViewStatus> {
    public element: HTMLTableRowElement;

    private 순번뷰: TdView;
    private 구분뷰: TdView;
    private 도서명뷰: TdView;
    private 저자명뷰: TdView;
    private 출판사뷰: TdView;
    private 판매상태뷰: TdView;
    private logisticsViews: Array<TdView> = [];

    private onClickHandlers: Array<any> = [];

    constructor(id: string) {
        super(id);

        

        this.순번뷰 = new TdView(null);
        this.순번뷰.element.classList.add('bookId');
        this.구분뷰 = new TdView(null);
        this.구분뷰.element.classList.add('gubun');
        this.도서명뷰 = new TdView(null);
        this.도서명뷰.element.classList.add('bookName');
        this.저자명뷰 = new TdView(null);
        this.저자명뷰.element.classList.add('writer');
        this.출판사뷰 = new TdView(null);
        this.출판사뷰.element.classList.add('publisher');
        this.판매상태뷰 = new TdView(null);
        this.판매상태뷰.element.classList.add('sellState');



        this.element.onclick = () => this.onClick();
    }
    
    protected createElement(): HTMLElement {
        return document.createElement('tr');
    }

    public render(): void {
        const book = this.state.book;
        this.element.innerHTML = '';

        this.element.appendChild(this.순번뷰.element);
        this.element.appendChild(this.구분뷰.element);
        this.element.appendChild(this.도서명뷰.element);
        this.element.appendChild(this.저자명뷰.element);
        this.element.appendChild(this.출판사뷰.element);
        this.element.appendChild(this.판매상태뷰.element);

        this.logisticsViews.splice(0, this.logisticsViews.length);
        this.순번뷰.setState(new TdViewStatus(`${book.순번}`));
        this.구분뷰.setState(new TdViewStatus(book.구분1));
        this.도서명뷰.setState(new TdViewStatus(book.도서명));
        this.저자명뷰.setState(new TdViewStatus(book.저자명));
        this.출판사뷰.setState(new TdViewStatus(book.출판사));
        this.판매상태뷰.setState(new TdViewStatus('판매함'));

        this.state.logistics.forEach((logistics) => {
            const logisticsTdView: TdView = new TdView(null);
            this.logisticsViews.push(logisticsTdView);
            logisticsTdView.element.classList.add('logistics');
            logisticsTdView.setState(new TdViewStatus(logistics.name));
            this.element.appendChild(logisticsTdView.element);
        });
    }

    private onClick(): void {
        this.onClickHandlers.forEach(handler => handler(this.state.book));
    }

    public setOnClick(handler: (book: BookModel) => void): void {
        this.onClickHandlers.push(handler);
    }
}

export class LogisticsInfoViewStatus extends ViewState {
    constructor(public book: BookModel, public logistics: Array<BookLogistics>) {
        super();
    }

    public isChanged(status: LogisticsInfoViewStatus): boolean {
        const originBook: BookModel = this.book;
        const newBook: BookModel = status.book;
        const originLogistics: Array<BookLogistics> = this.logistics;
        const newLogistics: Array<BookLogistics> = status.logistics;
        return originBook.순번 !== newBook.순번
            || originBook.구분1 !== newBook.구분1
            || originBook.도서명 !== newBook.도서명
            || originBook.저자명 !== newBook.저자명
            || originBook.판매상태 !== newBook.판매상태
            || originLogistics.length !== newLogistics.length
            || originLogistics.some((originLogistic, idx) => originLogistic !== newLogistics[idx]);
    }
}