import { BookLogistics } from "../../model/BookLogistics";
import { BookModel } from "../../model/BookModel"
import { View, ViewState } from "../View"
import { LogisticsGridView, LogisticsGridViewStatus } from "./LogisticsGridView";

export class BookLogisticsView extends View<BookLogisticsViewStatus>{
    private onSelectHandlers: Array<any> = [];
    private logisticsGridView: LogisticsGridView;

    constructor(id: string) {
        super(id);

        this.logisticsGridView = new LogisticsGridView('logisticsGridTable');
    }
    
    public render(): void {
        this.state.visible ? this.element.classList.remove('hide') : this.element.classList.add('hide');
        if (this.state.visible) {
            this.logisticsGridView.setState(new LogisticsGridViewStatus(this.state.books, this.state.logistics));
        }
    }

    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookLogisticsViewStatus extends ViewState {
    constructor(public visible: boolean, public books: Array<BookModel>, public logistics: Array<BookLogistics>) {
        super();
    }
}