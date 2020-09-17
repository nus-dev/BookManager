import { BookModel } from "../../model/BookModel";
import { View, ViewStatus } from "../View";
import { BookInfoGridView, BookInfoGridViewStatus } from "./BookInfoGridView";

export class BookManageView extends View<BookManageViewStatus> {
    public element: HTMLTableRowElement;
    private bookInfoGridView: BookInfoGridView;
    private onSelectHandlers: Array<any> = [];
    
    constructor(id: string) {
        super(id);

        this.bookInfoGridView = new BookInfoGridView('bookInfoGridTable');
        this.bookInfoGridView.setOnSelect((book: BookModel) => this.onSelect(book));
    }
    
    public render(): void {
        this.status.visible ? this.element.classList.remove('hide') : this.element.classList.add('hide');
        if (this.status.visible) {
            this.bookInfoGridView.setStatus(new BookInfoGridViewStatus(this.status.books));
        }
    }
    
    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookManageViewStatus extends ViewStatus {
    constructor(public visible: boolean, public books: Array<BookModel>) {
        super();
    }
}