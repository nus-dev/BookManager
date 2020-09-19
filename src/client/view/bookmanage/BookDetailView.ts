import {BookModel} from "../../model/BookModel";
import {TextAreaView, TextAreaViewStatus} from "../common/TextAreaView";
import {View, ViewState} from "../View";
import Grid from 'tui-grid';
import {CellRendererProps} from 'tui-grid/types/renderer';
import { ButtonView } from "../common/ButtonView";

class RadioRenderer {
    private el: HTMLDivElement;

    constructor(props: CellRendererProps) {
        const option = props.columnInfo.renderer.options;
        const el = document.createElement('div');
        el.appendChild(this.createInputElement(option.name, 'O', false));
        el.appendChild(this.createInputElement(option.name, 'X', false));

        el.addEventListener('mousedown', (ev) => {
            ev.stopPropagation();
        });

        el.addEventListener('change', () => {
            const value = (this.el.querySelector(`input[name=${option.name}]:checked`) as any).value;
            // option.onChange(value);
        });

        this.el = el;
        this.render(props);
    }

    private createInputElement(name: string, value: string, checked: boolean): HTMLLabelElement {
        const labelElement = document.createElement('label');
        labelElement.textContent = value;
        const element = document.createElement('input');
        labelElement.appendChild(element);
        element.type = 'radio';
        element.name = name;
        element.checked = checked;
        element.value = value;
        return labelElement;
    }

    getElement() {
        return this.el;
    }

    render(props: CellRendererProps) {
        const value = props.grid.getValue(props.rowKey, props.columnInfo.name);
        console.log(value);
        // (this.el.querySelector('input[name=완결]:checked') as any).value
        // this.el.value = String(props.value);
    }
}

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

    private btnSave: ButtonView;

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
                align: 'center',
                renderer: {
                    type: RadioRenderer,
                    options: {
                        name: '완결',
                        onChange: (value: string) => this.onChangeBook완결(value)
                    }
                }
            }, {
                name: 'adult',
                header: '성인',
                width: 118,
                editor: 'text',
                align: 'center',
                renderer: {
                    type: RadioRenderer,
                    options: {
                        name: '성인',
                        onChange: (value: string) => this.onChangeBook성인(value)
                    }
                }
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
                name: 'startDate',
                header: '발행일',
                width: 118,
                editor: 'datePicker'
            }, {
                name: 'lendable',
                header: '대여여부',
                width: 118,
                align: 'center',
                renderer: {
                    type: RadioRenderer,
                    options: {
                        name: '대여',
                        onChange: (value: string) => this.onChangeBook대여여부(value)
                    }
                }
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
                align: 'center',
                renderer: {
                    type: RadioRenderer,
                    options: {
                        name: '판매상태',
                        onChange: (value: string) => this.onChangeBook판매상태(value)
                    }
                }
            }, {
                name: 'endDate2',
                header: '중지 일시',
                editor: 'datePicker'
            }],
            header: {
                height: 24
            }
        });

        this.btnSave = new ButtonView(null);
        this.btnSave.element.textContent = '저장';
        this.btnSave.element.className = 'btnSave';
        this.element.appendChild(this.btnSave.element);
        this.btnSave.setOnClick(() => {
            // private bookMainInfoGrid: Grid;
            // private bookGubunInfoGrid: Grid;
            // private bookBookNameInfoGrid: Grid;
            // private bookWriterInfoGrid: Grid;
            // private bookPriceInfoGrid: Grid;
            // private bookPublisherInfoGrid: Grid;
            // private bookInfoGrid: Grid;
            // private bookPreviewInfoGrid: Grid;
            // private bookOpenInfoGrid: Grid;
            // private bookSellStatusInfoGrid: Grid;

            this.state.book.순번 = Number(this.bookMainInfoGrid.getValue(0, 'id').toString());
            this.state.book.ISBN = this.bookMainInfoGrid.getValue(0, 'isbn').toString();

            this.state.book.구분1 = this.bookGubunInfoGrid.getValue(0, 'gubun').toString();
            this.state.book.구분2 = this.bookGubunInfoGrid.getValue(0, 'kind').toString();
            this.state.book.총회차 = Number(this.bookGubunInfoGrid.getValue(0, 'totalCount').toString());
            this.state.book.무료회차 = Number(this.bookGubunInfoGrid.getValue(0, 'freeCount').toString());

            this.state.book.도서명 = this.bookBookNameInfoGrid.getValue(0, 'bookName').toString();
            this.state.book.완결 = this.bookBookNameInfoGrid.getValue(0, 'finish').toString();
            this.state.book.성인 = this.bookBookNameInfoGrid.getValue(0, 'adult').toString();

            this.state.book.저자명 = this.bookWriterInfoGrid.getValue(0, 'writerName').toString();
            this.state.book.발행일 = Number(this.bookWriterInfoGrid.getValue(0, 'startDate').toString());
            // this.state.book.대여여부 = this.bookWriterInfoGrid.getValue(0, 'isbn').toString();

            this.state.book.정가 = Number(this.bookPriceInfoGrid.getValue(0, 'originPrice').toString());
            this.state.book.판매가 = Number(this.bookPriceInfoGrid.getValue(0, 'sellPrice').toString());
            this.state.book.대여가 = Number(this.bookPriceInfoGrid.getValue(0, 'lendPrice').toString());
            this.state.book.대여일 = Number(this.bookPriceInfoGrid.getValue(0, 'lendDate').toString());

            this.state.book.출판사 = this.bookPublisherInfoGrid.getValue(0, 'publisher').toString();
            this.state.book.저작권자 = this.bookPublisherInfoGrid.getValue(0, 'copyright').toString();

            this.state.book.작품소개 = this.bookInfoGrid.getValue(0, 'bookInfo').toString();
            this.state.book.저자소개 = this.bookInfoGrid.getValue(0, 'writerInfo').toString();

            this.state.book.출판사서평 = this.bookPreviewInfoGrid.getValue(0, 'preview').toString();
            this.state.book.키워드 = this.bookPreviewInfoGrid.getValue(0, 'keyword').toString();

            this.state.book.독점 = this.bookOpenInfoGrid.getValue(0, 'platform').toString();
            console.log(this.state.book);
            // this.state.book.독점종료일 = this.bookOpenInfoGrid.getValue(0, 'publisher').toString();
            // this.state.book.판매상태 = Number(this.bookSellStatusInfoGrid.getValue(0, 'lendDate').toString());
            // this.state.book.중지 = Number(this.bookSellStatusInfoGrid.getValue(0, 'isbn').toString());
        });
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
            finish: book.완결 === '완결' ? 'O' : 'X',
            adult: book.성인 === '성인' ? 'O' : 'X'
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
            sellStatus: 'O',
            endDate2: ''
        }]);
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

    private onChangeBook완결(value: string): void {
        this.state.book.완결 = value;
    }

    private onChangeBook성인(value: string): void {
        this.state.book.성인 = value;
    }

    private onChangeBook대여여부(value: string): void {
        // this.state.book.대여여부 = value;
    }

    private onChangeBook판매상태(value: string): void {
        this.state.book.판매상태 = value === 'O';
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