import { BookModel } from "../../model/BookModel"
import { View, ViewStatus } from "../View"

export class BookLogisticsView extends View<BookLogisticsViewStatus>{
    private onSelectHandlers: Array<any> = [];
    
    public render(): void {
        this.status.visible ? this.element.classList.remove('hide') : this.element.classList.add('hide');
        if (this.status.visible) {
            // this.bookInfoGridView.setStatus(new BookInfoGridViewStatus(this.status.books));
        }
    }

    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookLogisticsViewStatus extends ViewStatus {
    constructor(public visible: boolean, public books: Array<BookModel>) {
        super();
    }
}