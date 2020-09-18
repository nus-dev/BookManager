import { BookLogistics } from "../../model/BookLogistics";
import { BookModel } from "../../model/BookModel";
import { View, ViewState } from "../View";
import {LogisticsInfoView, LogisticsInfoViewStatus} from "./LogisticsInfoView";

export class LogisticsGridView extends View<LogisticsGridViewStatus> {
    public element: HTMLTableRowElement;
    private logisticsViews: Array<LogisticsInfoView> = [];
    // private onSelectHandlers: Array<any> = [];
    // constructor(id: string) {
    //     super(id);
    // }
    
    public render(): void {
        if (this.logisticsViews.length > this.state.books.length) {
            this.element.innerHTML = '';
            this.logisticsViews.splice(0, this.logisticsViews.length);
        }

        for (let i = 0; i < this.state.books.length; i++) {
            if (!this.logisticsViews[i]) {
                this.logisticsViews.push(new LogisticsInfoView(null));
                this.element.appendChild(this.logisticsViews[i].element);
                // this.bookInfoViews[i].setOnClick((book: BookModel) => this.onSelect(book));
            }

            this.logisticsViews[i].setState(new LogisticsInfoViewStatus(this.state.books[i], this.state.logistics));
        }
    }

    // private onSelect(book: BookModel): void {
    //     this.onSelectHandlers.forEach(handler => handler(book));
    // }

    // public setOnSelect(handler: (book: BookModel) => void): void {
    //     this.onSelectHandlers.push(handler);
    // }
}

export class LogisticsGridViewStatus extends ViewState {
    constructor(public books: Array<BookModel>, public logistics: Array<BookLogistics>) {
        super();
    }
}