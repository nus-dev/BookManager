import {BookModel} from "../../model/BookModel";
import {TextAreaView, TextAreaViewStatus} from "../common/TextAreaView";
import {View, ViewStatus} from "../View";

export class BookDetailView extends View<BookDetailViewStatus> {
    private bookIdView: TextAreaView;
    private isbnView: TextAreaView;
    private totalCountView: TextAreaView;
    private freeCountView: TextAreaView;
    private bookNameView: TextAreaView;
    private writerNameView: TextAreaView;
    private originPriceView: TextAreaView;
    private sellPriceView: TextAreaView;
    private lendPriceView: TextAreaView;
    private publisherView: TextAreaView;
    private copyrightView: TextAreaView;
    private bookInfoView: TextAreaView;
    private writerInfoView: TextAreaView;
    private previewView: TextAreaView;
    private keywordView: TextAreaView;

    constructor(id: string) {
        super(id);

        this.bookIdView = new TextAreaView('bookId');
        this.isbnView = new TextAreaView('ISBN');
        this.totalCountView = new TextAreaView('totalCount');
        this.freeCountView = new TextAreaView('freeCount');
        this.bookNameView = new TextAreaView('bookName');
        this.writerNameView = new TextAreaView('writerName');
        this.originPriceView = new TextAreaView('originPrice');
        this.sellPriceView = new TextAreaView('sellPrice');
        this.lendPriceView = new TextAreaView('lendPrice');
        this.publisherView = new TextAreaView('publisher');
        this.copyrightView = new TextAreaView('copyright');
        this.bookInfoView = new TextAreaView('bookInfo');
        this.writerInfoView = new TextAreaView('writerInfo');
        this.previewView = new TextAreaView('preview');
        this.keywordView = new TextAreaView('keyword');
    }

    public render(): void {
        const book: BookModel = this.status.book;
        this.bookIdView.setStatus(new TextAreaViewStatus(`${book.순번}`));
        this.isbnView.setStatus(new TextAreaViewStatus(book.ISBN));
        this.totalCountView.setStatus(new TextAreaViewStatus(`${book.총회차}`));
        this.freeCountView.setStatus(new TextAreaViewStatus(`${book.무료회차}`));
        this.bookNameView.setStatus(new TextAreaViewStatus(book.도서명));
        this.writerNameView.setStatus(new TextAreaViewStatus(book.저자명));
        this.originPriceView.setStatus(new TextAreaViewStatus(book.정가));
        this.sellPriceView.setStatus(new TextAreaViewStatus(book.판매가));
        this.lendPriceView.setStatus(new TextAreaViewStatus(book.대여가));
        this.publisherView.setStatus(new TextAreaViewStatus(book.출판사));
        this.copyrightView.setStatus(new TextAreaViewStatus(book.저작권자));
        this.bookInfoView.setStatus(new TextAreaViewStatus(book.작품소개));
        this.writerInfoView.setStatus(new TextAreaViewStatus(book.저자소개));
        this.previewView.setStatus(new TextAreaViewStatus(book.출판사서평));
        this.keywordView.setStatus(new TextAreaViewStatus(book.키워드));
    }

    public getCurrentValues(): Array<string> {
        return [
            this.bookIdView.getText(),
            this.isbnView.getText(),
            this.totalCountView.getText(),
            this.freeCountView.getText(),
            this.bookNameView.getText(),
            this.writerNameView.getText(),
            this.originPriceView.getText(),
            this.sellPriceView.getText(),
            this.lendPriceView.getText(),
            this.publisherView.getText(),
            this.copyrightView.getText(),
            this.bookInfoView.getText(),
            this.writerInfoView.getText(),
            this.previewView.getText(),
            this.keywordView.getText()
        ];
    }
}

export class BookDetailViewStatus extends ViewStatus {
    constructor(public book: BookModel) {
        super();
    }

    public isChanged(status: BookDetailViewStatus): boolean {
        const originBook: BookModel = this.book;
        const newBook: BookModel = status.book;

        return originBook.순번 !== newBook.순번
            || originBook.ISBN !== newBook.ISBN
            || originBook.총회차 !== newBook.총회차
            || originBook.무료회차 !== newBook.무료회차
            || originBook.도서명 !== newBook.도서명
            || originBook.저자명 !== newBook.저자명
            || originBook.정가 !== newBook.정가
            || originBook.판매가 !== newBook.판매가
            || originBook.대여가 !== newBook.대여가
            || originBook.출판사 !== newBook.출판사
            || originBook.저작권자 !== newBook.저작권자
            || originBook.작품소개 !== newBook.작품소개
            || originBook.저자소개 !== newBook.저자소개
            || originBook.출판사서평 !== newBook.출판사서평
            || originBook.키워드 !== newBook.키워드;
    }
}