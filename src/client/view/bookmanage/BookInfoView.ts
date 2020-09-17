import {View, ViewStatus} from "../View";
import {BookModel} from "../../model/BookModel";
import {TdView, TdViewStatus} from "../common/TdView";

export class BookInfoView extends View<BookInfoViewStatus> {
    public element: HTMLTableRowElement;

    private 순번뷰: TdView;
    private 구분뷰: TdView;
    private 도서명뷰: TdView;
    private 저자명뷰: TdView;
    private 출판사뷰: TdView;
    private 판매상태뷰: TdView;

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

        this.element.appendChild(this.순번뷰.element);
        this.element.appendChild(this.구분뷰.element);
        this.element.appendChild(this.도서명뷰.element);
        this.element.appendChild(this.저자명뷰.element);
        this.element.appendChild(this.출판사뷰.element);
        this.element.appendChild(this.판매상태뷰.element);

        this.element.onclick = () => this.onClick();
    }
    
    protected createElement(): HTMLElement {
        return document.createElement('tr');
    }

    public render(): void {
        const book = this.status.book;
        this.순번뷰.setStatus(new TdViewStatus(`${book.순번}`));
        this.구분뷰.setStatus(new TdViewStatus(book.구분1));
        this.도서명뷰.setStatus(new TdViewStatus(book.도서명));
        this.저자명뷰.setStatus(new TdViewStatus(book.저자명));
        this.출판사뷰.setStatus(new TdViewStatus(book.출판사));
        this.판매상태뷰.setStatus(new TdViewStatus('판매함'));
    }

    private onClick(): void {
        this.onClickHandlers.forEach(handler => handler(this.status.book));
    }

    public setOnClick(handler: (book: BookModel) => void): void {
        this.onClickHandlers.push(handler);
    }
}

export class BookInfoViewStatus extends ViewStatus {
    constructor(public book: BookModel) {
        super();
    }

    public isChanged(status: BookInfoViewStatus): boolean {
        const originBook: BookModel = this.book;
        const newBook: BookModel = status.book;

        return originBook.순번 !== newBook.순번
            || originBook.구분1 !== newBook.구분1
            || originBook.도서명 !== newBook.도서명
            || originBook.저자명 !== newBook.저자명
            || originBook.판매상태 !== newBook.판매상태
    }
}