import BookDC from "../dc/BookDC";
import {BookDetailView, BookDetailViewStatus} from "../view/bookmanage/BookDetailView";
import {BookModel} from "../model/BookModel";
import {BookManageView, BookManageViewStatus} from "../view/bookmanage/BookManageView";
import {ButtonView, ButtonViewStatus} from "../view/common/ButtonView";
import {BookLogisticsView, BookLogisticsViewStatus} from "../view/logistics/LogisticsView";
import { DivView, DivViewStatus } from "../view/common/DivView";
import { InputView } from "../view/common/IntputView";
import { SelectView } from "../view/common/SelectView";
import BookLogisticsDC from "../dc/BookLogisticsDC";

export class BookManagerVC {
    private bookManageView: BookManageView;
    private bookLogisticsView: BookLogisticsView;
    private bookDetailView: BookDetailView;

    private btnBookLogistics: ButtonView;
    private btnBookManage: ButtonView;
    // private btnBookDetailUpdate: ButtonView;

    private searchKeywordInput: InputView;
    private selectSearchTarget: SelectView;

    constructor() {
        const bookManageView = new BookManageView('manageMain');
        bookManageView.setState(new BookManageViewStatus(true, BookDC.getBooksByName('연재')));
        // bookManageView.setState(new BookManageViewStatus(true, BookDC.getAllBooks()));

        const bookLogisticsView = new BookLogisticsView('logisticsMain');
        this.bookLogisticsView = bookLogisticsView;

        this.bookDetailView = new BookDetailView('bookDetail');
        this.bookManageView = bookManageView;

        const btnBookLogistics = new ButtonView('btnLogistics');
        this.btnBookLogistics = btnBookLogistics;

        const btnBookManage = new ButtonView('btnManage');
        this.btnBookManage = btnBookManage;

        // const btnBookDetailUpdate = new ButtonView('btnBookDetailUpdate');
        // this.btnBookDetailUpdate = btnBookDetailUpdate;

        const btnOpenSearchPopup = new ButtonView('openSearchPopup');
        const searchPopupView = new DivView('searchPopup');
        btnOpenSearchPopup.setOnClick((ev: MouseEvent) => searchPopupView.setState(new DivViewStatus(!searchPopupView.isShowed())));
        const popupBackgroundView = new DivView('popupBackgroundDiv');
        popupBackgroundView.setOnClick(() => searchPopupView.setState(new DivViewStatus(false)));

        const searchKeywordInput = new InputView('inputSearchKeyword');
        const btnSearch = new ButtonView('btnSearch');
        searchKeywordInput.setOnKeyDown((ev: KeyboardEvent) => {
            if (ev.key === 'Enter') {
                this.search();
            }
        });
        btnSearch.setOnClick((ev) => this.search());
        this.searchKeywordInput = searchKeywordInput;
        this.selectSearchTarget = new SelectView('selectSearchTarget');

        this.addEventListeners();
    }

    private search(): void {
        const keyword: string = this.searchKeywordInput.getText();
        const searchType = this.selectSearchTarget.getValue();

        const books: Array<BookModel> = this.getBooks(keyword, searchType);
        this.bookManageView.setState(new BookManageViewStatus(true, books));
    }

    private getBooks(keyword: string, searchType: string): Array<BookModel> {
        if (!keyword) {
            return BookDC.getAllBooks();
        }

        if (searchType === '책ID') {
            const book: BookModel = BookDC.getBookByIdx(Number(keyword));
            return book ? [book] : [];
        } else if (searchType === '도서명') {
            return BookDC.getBooksByName(keyword);
        } else if (searchType === '저자명') {
            return BookDC.getBooksByWriter(keyword);
        } else if (searchType === '출판사') {
            return BookDC.getBooksByPublisher(keyword);
        } else if (searchType === '판매상태') {
            return BookDC.getBooksBySellStatus(keyword === '판매중' || keyword.toLowerCase() === 'o');
        }
    }

    private addEventListeners(): void {
        this.bookManageView.setOnSelect((book: BookModel) => {
            BookDC.setSelectedBook(book);
            this.bookDetailView.setState(new BookDetailViewStatus(book));
        });

        this.btnBookLogistics.setOnClick((ev: MouseEvent) => {
            this.btnBookManage.setState(new ButtonViewStatus(false));
            this.btnBookLogistics.setState(new ButtonViewStatus(true));
            this.bookManageView.setState(new BookManageViewStatus(false, BookDC.getSearchedBooks()));
            this.bookLogisticsView.setState(new BookLogisticsViewStatus(true, BookDC.getSearchedBooks(), BookLogisticsDC.getLogistics()));
        });

        this.btnBookManage.setOnClick((ev: MouseEvent) => {
            this.btnBookManage.setState(new ButtonViewStatus(true));
            this.btnBookLogistics.setState(new ButtonViewStatus(false));
            this.bookManageView.setState(new BookManageViewStatus(true, BookDC.getSearchedBooks()));
            this.bookLogisticsView.setState(new BookLogisticsViewStatus(false, BookDC.getSearchedBooks(), BookLogisticsDC.getLogistics()));
        });

        // this.btnBookDetailUpdate.setOnClick((ev: MouseEvent) => {
        //     const book: BookModel = BookDC.getSelectedBook();
        //     const detailValues: Array<string> = this.bookDetailView.getCurrentValues();
        //     book.순번 = Number(detailValues[0]);
        //     book.ISBN = detailValues[1];
        //     book.총회차 = Number(detailValues[2]);
        //     book.무료회차 = Number(detailValues[3]);
        //     book.도서명 = detailValues[4];
        //     book.저자명 = detailValues[5];
        //     book.정가 = detailValues[6];
        //     book.판매가 = detailValues[7];
        //     book.대여가 = detailValues[8];
        //     book.출판사 = detailValues[9];
        //     book.저작권자 = detailValues[10];
        //     book.작품소개 = detailValues[11];
        //     book.저자소개 = detailValues[12];
        //     book.출판사서평 = detailValues[13];
        //     book.키워드 = detailValues[14];
        //     BookDC.update();
        // });
    }
}