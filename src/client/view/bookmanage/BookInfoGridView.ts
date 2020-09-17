import {View, ViewStatus} from "../View";
import {BookModel} from "../../model/BookModel";
import {BookInfoView, BookInfoViewStatus} from "./BookInfoView";

export class BookInfoGridView extends View<BookInfoGridViewStatus> {
    public element: HTMLTableRowElement;
    private bookInfoViews: Array<BookInfoView> = [];
    private onSelectHandlers: Array<any> = [];
    constructor(id: string) {
        super(id);
    }
    
    public render(): void {
        for (let i = 0; i < this.status.books.length; i++) {
            if (!this.bookInfoViews[i]) {
                this.bookInfoViews.push(new BookInfoView(null));
                this.element.appendChild(this.bookInfoViews[i].element);
                this.bookInfoViews[i].setOnClick((book: BookModel) => this.onSelect(book));
            }

            this.bookInfoViews[i].setStatus(new BookInfoViewStatus(this.status.books[i]));
        }

        while (this.element.childElementCount > this.status.books.length) {
            this.element.removeChild(this.element.lastChild);
        }
    }

    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookInfoGridViewStatus extends ViewStatus {
    constructor(public books: Array<BookModel>) {
        super();
    }
}