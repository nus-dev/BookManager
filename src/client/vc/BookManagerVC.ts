import BookDC from "../dc/BookDC";
import {BookDetailView, BookDetailViewStatus} from "../view/bookmanage/BookDetailView";
import {BookModel} from "../model/BookModel";
import {BookManageView, BookManageViewStatus} from "../view/bookmanage/BookManageView";
import {ButtonView, ButtonViewStatus} from "../view/common/ButtonView";
import {BookLogisticsView, BookLogisticsViewStatus} from "../view/logistics/LogisticsView";
import { DivView, DivViewStatus } from "../view/common/DivView";
import { InputView } from "../view/common/IntputView";
import { SelectView } from "../view/common/SelectView";
import ConfigDC from "../dc/ConfigDC";

export class BookManagerVC {
    private bookManageView: BookManageView;
    private bookLogisticsView: BookLogisticsView;
    private bookDetailView: BookDetailView;

    private btnBookLogistics: ButtonView;
    private btnBookManage: ButtonView;

    private searchKeywordInput: InputView;
    private selectSearchTarget: SelectView;
    private isDetailView: boolean = true;

    constructor() {
        const bookManageView = new BookManageView('manageMain');
        bookManageView.setState(new BookManageViewStatus(true, []));

        const bookLogisticsView = new BookLogisticsView('logisticsMain');
        this.bookLogisticsView = bookLogisticsView;

        this.bookDetailView = new BookDetailView('bookDetail');
        this.bookManageView = bookManageView;

        const btnBookLogistics = new ButtonView('btnLogistics');
        this.btnBookLogistics = btnBookLogistics;

        const btnBookManage = new ButtonView('btnManage');
        this.btnBookManage = btnBookManage;

        const btnExportToFile = new ButtonView('exportToFile');
        btnExportToFile.setOnClick(() => {
            this.isDetailView 
                ? BookDC.saveAll() 
                : (() => {
                    if (this.bookLogisticsView.logisticsGridView.isFiltered()) {
                        const filters = this.bookLogisticsView.logisticsGridView.getFilters();
                        const books = BookDC.getSearchedBooks().filter(book => {
                            return filters.every(filter => {
                                return (book as any)[filter.columnName] && filter.state.map(s => s.value).indexOf((book as any)[filter.columnName]) >= 0;
                            })
                        })
                        
                        BookDC.save(books, filters.map(filter => filter.columnName));
                    } else {
                        BookDC.save(BookDC.getSearchedBooks(), ConfigDC.getPlatforms());
                    }
                })();
        });

        const btnUpload = new ButtonView('upload');
        btnUpload.setOnClick(() => {
            this.btnBookManage.click();
            (async () => {
                await BookDC.upload();
                this.bookManageView.setState(new BookManageViewStatus(true, BookDC.getAllBooks()));
            })();
        });

        const btnOpenSearchPopup = new ButtonView('openSearchPopup');
        const searchPopupView = new DivView('searchPopup');
        btnOpenSearchPopup.setOnClick((ev: MouseEvent) => {
            searchPopupView.setState(new DivViewStatus(!searchPopupView.isShowed()))
            if (searchPopupView.isShowed()) {
                window.resizeBy(10, 10);
            }
        });
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
        if (this.isDetailView) this.bookManageView.setState(new BookManageViewStatus(true, books));
        else this.bookLogisticsView.setState(new BookLogisticsViewStatus(true, books, ConfigDC.getPlatforms()));
    }

    private getBooks(keyword: string, searchType: string): Array<BookModel> {
        if (!keyword) {
            return BookDC.getAllBooks();
        }

        if (searchType === '책ID') {
            const book: BookModel = BookDC.getBookByIdx(keyword);
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
            this.bookLogisticsView.setState(new BookLogisticsViewStatus(true, BookDC.getSearchedBooks(), ConfigDC.getPlatforms()));
            this.isDetailView = false;
        });

        this.btnBookManage.setOnClick((ev: MouseEvent) => {
            this.btnBookManage.setState(new ButtonViewStatus(true));
            this.btnBookLogistics.setState(new ButtonViewStatus(false));
            this.bookManageView.setState(new BookManageViewStatus(true, BookDC.getSearchedBooks()));
            this.bookLogisticsView.setState(new BookLogisticsViewStatus(false, BookDC.getSearchedBooks(), ConfigDC.getPlatforms()));
            this.isDetailView = true;
        });
    }
}