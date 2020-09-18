import {BookModel} from "../../model/BookModel";
import {TextAreaView, TextAreaViewStatus} from "../common/TextAreaView";
import {View, ViewState} from "../View";
import Grid from 'tui-grid';

export class BookDetailView extends View<BookDetailViewStatus> {
    private bookMainInfoGrid: Grid;
    private bookGubunInfoGrid: Grid;
    private bookBookNameInfoGrid: Grid;
    private bookWriterInfoGrid: Grid;
    private bookPriceInfoGrid: Grid;
    private bookPublisherInfoGrid: Grid;
    private bookInfoGrid: Grid;
    private bookPreviewInfoGrid: Grid;
    private bookOpenInfoGrid: Grid;
    private bookSellStatusInfoGrid: Grid;
    
    // private bookIdView: TextAreaView;
    // private isbnView: TextAreaView;
    // private totalCountView: TextAreaView;
    // private freeCountView: TextAreaView;
    // private bookNameView: TextAreaView;
    // private writerNameView: TextAreaView;
    // private originPriceView: TextAreaView;
    // private sellPriceView: TextAreaView;
    // private lendPriceView: TextAreaView;
    // private publisherView: TextAreaView;
    // private copyrightView: TextAreaView;
    // private bookInfoView: TextAreaView;
    // private writerInfoView: TextAreaView;
    // private previewView: TextAreaView;
    // private keywordView: TextAreaView;

    constructor(id: string) {
        super(id);

        this.bookMainInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: false,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'id',
                header: '책ID',
                editor: 'text',
                align: 'center'
            }, {
                name: 'isbn',
                header: 'ISBN',
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookGubunInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: false,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'gubun',
                header: '구분',
                editor: 'text',
                align: 'center'
            }, {
                name: 'kind',
                header: '분류',
                editor: 'text',
                align: 'center'
            }, {
                name: 'totalCount',
                header: '총화(권)',
                editor: 'text',
                align: 'center'
            }, {
                name: 'freeCount',
                header: '무료화(권)',
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookBookNameInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: true,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'bookName',
                header: '도서명',
                width: 237,
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }, {
                name: 'finish',
                header: '완결',
                width: 118,
                editor: 'text',
                align: 'center'
            }, {
                name: 'adult',
                header: '성인',
                width: 118,
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookWriterInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: true,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'writerName',
                header: '저자명 (필명)',
                width: 237,
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }, {
                name: 'startData',
                header: '발행일',
                width: 118,
                editor: 'datePicker'
            }, {
                name: 'lendable',
                header: '대여여부',
                width: 118,
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookPriceInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: false,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'originPrice',
                header: '정가',
                editor: 'text',
                align: 'center'
            }, {
                name: 'sellPrice',
                header: '판매가',
                editor: 'text',
                align: 'center'
            }, {
                name: 'lendPrice',
                header: '대여가',
                editor: 'text',
                align: 'center'
            }, {
                name: 'lendDate',
                header: '대여일',
                editor: 'datePicker'
            }],
            header: {
                height: 24
            }
        });

        this.bookPublisherInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: true,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'publisher',
                header: '출판사',
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }, {
                name: 'copyright',
                header: '저작권자명 (본명 or 회사)',
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: true,
            rowHeight: 72,
            bodyHeight: 92,
            minRowHeight: 92,
            minBodyHeight: 92,
            columns: [{
                name: 'bookInfo',
                header: '작품소개',
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }, {
                name: 'writerInfo',
                header: '저자소개',
                editor: 'text',
                whiteSpace: 'normal',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookPreviewInfoGrid = new Grid({
            el: this.element,
            scrollX: false,
            scrollY: true,
            rowHeight: 72,
            bodyHeight: 92,
            minRowHeight: 92,
            minBodyHeight: 92,
            columns: [{
                name: 'preview',
                header: '출판사 서평',
                editor: 'text',
                align: 'center'
            }, {
                name: 'keyword',
                header: '키워드',
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            }
        });

        this.bookOpenInfoGrid = new Grid({
            el: this.element,
            width: 227,
            scrollX: false,
            scrollY: false,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'platform',
                header: '오픈 플랫폼',
                editor: 'text',
                align: 'center'
            }, {
                name: 'endDate',
                header: '독점 종료일',
                editor: 'datePicker'
            }],
            header: {
                height: 24
            }
        });

        this.bookSellStatusInfoGrid = new Grid({
            el: this.element,
            width: 227,
            scrollX: false,
            scrollY: false,
            rowHeight: 24,
            bodyHeight: 44,
            minRowHeight: 44,
            minBodyHeight: 44,
            columns: [{
                name: 'sellState',
                header: '판매상태',
                editor: 'text',
                align: 'center'
            }, {
                name: 'endDate2',
                header: '중지 일시',
                editor: 'datePicker'
            }],
            header: {
                height: 24
            }
        });
        
        // this.bookIdView = new TextAreaView('bookId');
        // this.isbnView = new TextAreaView('ISBN');
        // this.totalCountView = new TextAreaView('totalCount');
        // this.freeCountView = new TextAreaView('freeCount');
        // this.bookNameView = new TextAreaView('bookName');
        // this.writerNameView = new TextAreaView('writerName');
        // this.originPriceView = new TextAreaView('originPrice');
        // this.sellPriceView = new TextAreaView('sellPrice');
        // this.lendPriceView = new TextAreaView('lendPrice');
        // this.publisherView = new TextAreaView('publisher');
        // this.copyrightView = new TextAreaView('copyright');
        // this.bookInfoView = new TextAreaView('bookInfo');
        // this.writerInfoView = new TextAreaView('writerInfo');
        // this.previewView = new TextAreaView('preview');
        // this.keywordView = new TextAreaView('keyword');
    }

    public render(): void {
        const book: BookModel = this.state.book;

        this.bookMainInfoGrid.resetData([{
            id: book.순번,
            isbn: book.ISBN,
        }]);
        this.bookGubunInfoGrid.resetData([{
            gubun: book.구분1,
            kind: book.구분2,
            totalCount: book.총회차,
            freeCount: book.무료회차,
        }]);
        this.bookBookNameInfoGrid.resetData([{
            bookName: book.도서명,
            finish: book.완결,
            adult: book.성인
        }]);

        this.bookWriterInfoGrid.resetData([{
            writerName: book.저자명,
            startDate: book.발행일,
            lendable: true //book.대여여부???
        }]);

        this.bookPriceInfoGrid.resetData([{
            originPrice: book.정가,
            sellPrice: book.판매가,
            lendPrice: book.대여가,
            lendDate: book.대여일
        }]);
        this.bookPublisherInfoGrid.resetData([{
            publisher: book.출판사,
            copyright: book.저작권자
        }]);

        this.bookInfoGrid.resetData([{
            bookInfo: book.작품소개,
            writerInfo: book.저자소개
        }]);
        this.bookPreviewInfoGrid.resetData([{
            preview: book.출판사서평,
            keyword: book.키워드
        }]);
        this.bookOpenInfoGrid.resetData([{
            platform: book.독점,
            endDate: '' //book.독점종료일
        }]);
        this.bookSellStatusInfoGrid.resetData([{
            sellStatus: '판매중',
            endDate2: ''
        }]);
        // this.bookIdView.setState(new TextAreaViewStatus(`${book.순번}`));
        // this.isbnView.setState(new TextAreaViewStatus(book.ISBN));
        // this.totalCountView.setState(new TextAreaViewStatus(`${book.총회차}`));
        // this.freeCountView.setState(new TextAreaViewStatus(`${book.무료회차}`));
        // this.bookNameView.setState(new TextAreaViewStatus(book.도서명));
        // this.writerNameView.setState(new TextAreaViewStatus(book.저자명));
        // this.originPriceView.setState(new TextAreaViewStatus(book.정가));
        // this.sellPriceView.setState(new TextAreaViewStatus(book.판매가));
        // this.lendPriceView.setState(new TextAreaViewStatus(book.대여가));
        // this.publisherView.setState(new TextAreaViewStatus(book.출판사));
        // this.copyrightView.setState(new TextAreaViewStatus(book.저작권자));
        // this.bookInfoView.setState(new TextAreaViewStatus(book.작품소개));
        // this.writerInfoView.setState(new TextAreaViewStatus(book.저자소개));
        // this.previewView.setState(new TextAreaViewStatus(book.출판사서평));
        // this.keywordView.setState(new TextAreaViewStatus(book.키워드));
    }

    public getCurrentValues(): Array<string> {
        return [
            // this.bookIdView.getText(),
            // this.isbnView.getText(),
            // this.totalCountView.getText(),
            // this.freeCountView.getText(),
            // this.bookNameView.getText(),
            // this.writerNameView.getText(),
            // this.originPriceView.getText(),
            // this.sellPriceView.getText(),
            // this.lendPriceView.getText(),
            // this.publisherView.getText(),
            // this.copyrightView.getText(),
            // this.bookInfoView.getText(),
            // this.writerInfoView.getText(),
            // this.previewView.getText(),
            // this.keywordView.getText()
        ];
    }
}

export class BookDetailViewStatus extends ViewState {
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