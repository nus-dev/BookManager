import BookDC from "../dc/BookDC";
import {BookDetailView, BookDetailViewStatus} from "../view/bookmanage/BookDetailView";
import {BookModel} from "../model/BookModel";
import {BookManageView, BookManageViewStatus} from "../view/bookmanage/BookManageView";
import {ButtonView, ButtonViewStatus} from "../view/common/ButtonView";
import {BookLogisticsView, BookLogisticsViewStatus} from "../view/logistics/LogisticsView";

export class BookManagerVC {
    private bookManageView: BookManageView;
    private bookLogisticsView: BookLogisticsView;
    private bookDetailView: BookDetailView;

    private btnBookLogistics: ButtonView;
    private btnBookManage: ButtonView;
    private btnBookDetailUpdate: ButtonView;

    constructor() {
        const bookManageView = new BookManageView('manageMain');
        bookManageView.setStatus(new BookManageViewStatus(true, BookDC.getBooksByName('연재')));

        const bookLogisticsView = new BookLogisticsView('logisticsMain');
        this.bookLogisticsView = bookLogisticsView;

        this.bookDetailView = new BookDetailView(null);
        this.bookManageView = bookManageView;

        const btnBookLogistics = new ButtonView('btnLogistics');
        this.btnBookLogistics = btnBookLogistics;

        const btnBookManage = new ButtonView('btnManage');
        this.btnBookManage = btnBookManage;

        const btnBookDetailUpdate = new ButtonView('btnBookDetailUpdate');
        this.btnBookDetailUpdate = btnBookDetailUpdate;

        this.addEventListeners();
    }

    private addEventListeners(): void {
        this.bookDetailView = new BookDetailView(null);
        this.bookManageView.setOnSelect((book: BookModel) => {
            BookDC.setSelectedBook(book);
            this.bookDetailView.setStatus(new BookDetailViewStatus(book));
        });

        this.btnBookLogistics.setOnClick((ev: MouseEvent) => {
            this.btnBookManage.setStatus(new ButtonViewStatus(false));
            this.btnBookLogistics.setStatus(new ButtonViewStatus(true));
            this.bookManageView.setStatus(new BookManageViewStatus(false, BookDC.getSearchedBooks()));
            this.bookLogisticsView.setStatus(new BookLogisticsViewStatus(true, BookDC.getSearchedBooks()));
        });

        this.btnBookManage.setOnClick((ev: MouseEvent) => {
            this.btnBookManage.setStatus(new ButtonViewStatus(true));
            this.btnBookLogistics.setStatus(new ButtonViewStatus(false));
            this.bookManageView.setStatus(new BookManageViewStatus(true, BookDC.getSearchedBooks()));
            this.bookLogisticsView.setStatus(new BookLogisticsViewStatus(false, BookDC.getSearchedBooks()));
        });

        this.btnBookDetailUpdate.setOnClick((ev: MouseEvent) => {
            const book: BookModel = BookDC.getSelectedBook();
            const detailValues: Array<string> = this.bookDetailView.getCurrentValues();
            book.순번 = Number(detailValues[0]);
            book.ISBN = detailValues[1];
            book.총회차 = Number(detailValues[2]);
            book.무료회차 = Number(detailValues[3]);
            book.도서명 = detailValues[4];
            book.저자명 = detailValues[5];
            book.정가 = detailValues[6];
            book.판매가 = detailValues[7];
            book.대여가 = detailValues[8];
            book.출판사 = detailValues[9];
            book.저작권자 = detailValues[10];
            book.작품소개 = detailValues[11];
            book.저자소개 = detailValues[12];
            book.출판사서평 = detailValues[13];
            book.키워드 = detailValues[14];
            BookDC.update();
        });
    }
}