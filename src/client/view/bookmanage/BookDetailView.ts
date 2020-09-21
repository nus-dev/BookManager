import {BookModel} from "../../model/BookModel";
import {TextAreaView, TextAreaViewStatus} from "../common/TextAreaView";
import {View, ViewState} from "../View";
import Grid from 'tui-grid';
import {CellRendererProps} from 'tui-grid/types/renderer';
import { ButtonView } from "../common/ButtonView";
import ConfigDC from "../../dc/ConfigDC";
import DateConvertUtil from "./util/DateConvertUtil";

// class RadioRenderer {
//     private el: HTMLDivElement;

//     constructor(props: CellRendererProps) {
//         const option = props.columnInfo.renderer.options;
//         const el = document.createElement('div');
//         el.appendChild(this.createInputElement(option.name, 'O', false));
//         el.appendChild(this.createInputElement(option.name, 'X', false));

//         el.addEventListener('mousedown', (ev) => {
//             ev.stopPropagation();
//         });

//         el.addEventListener('change', () => {
//             const value = (this.el.querySelector(`input[name=${option.name}]:checked`) as any).value;
//             // option.onChange(value);
//         });

//         this.el = el;
//         this.render(props);
//     }

//     private createInputElement(name: string, value: string, checked: boolean): HTMLLabelElement {
//         const labelElement = document.createElement('label');
//         labelElement.textContent = value;
//         const element = document.createElement('input');
//         labelElement.appendChild(element);
//         element.type = 'radio';
//         element.name = name;
//         element.checked = checked;
//         element.value = value;
//         return labelElement;
//     }

//     getElement() {
//         return this.el;
//     }

//     render(props: CellRendererProps) {
//         const value = props.grid.getValue(props.rowKey, props.columnInfo.name);
//         console.log(value);
//         // (this.el.querySelector('input[name=완결]:checked') as any).value
//         // this.el.value = String(props.value);
//     }
// }

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
                align: 'center'
            }, {
                name: 'isbn',
                header: 'ISBN',
                editor: 'text',
                align: 'center'
            }],
            header: {
                height: 24
            },
            editingEvent: 'click'
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
                align: 'center',
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getGubuns().map(value => {
                            return { text: value, value: value};
                        })
                    }
                }
            }, {
                name: 'kind',
                header: '분류',
                align: 'center',
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getKinds().map(value => {
                            return { text: value, value: value};
                        })
                    }
                }
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
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getIsFinishs().map(value => {
                            return { text: value, value: value};
                        })
                    }
                }
            }, {
                name: 'adult',
                header: '성인',
                width: 118,
                align: 'center',
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getIsAdults().map(value => {
                            return { text: value, value: value};
                        })
                    }
                }
            }],
            header: {
                height: 24
            },
        });
        this.bookBookNameInfoGrid.on('click', (ev) => {
            this.bookBookNameInfoGrid.finishEditing();
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
                editor: 'datePicker',
            }, {
                name: 'lendable',
                header: '대여여부',
                width: 118,
                align: 'center',
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getIsLendables().map(value => {
                            return { text: value, value: value};
                        })
                    }
                }
            }],
            header: {
                height: 24
            }
        });
        // this.bookWriterInfoGrid.on('afterChange', () => {
        //     let temp: any = this.bookWriterInfoGrid.getValue(0, 'startDate');
        //     for (let i = 0; i < 10; i++) {
        //         temp = DateConvertUtil.dateStringToExcelDate(temp);
        //         console.log(temp);
        //         temp = DateConvertUtil.excelDateToDateString(temp);
        //         console.log(temp);
        //     }
        // });

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
                editor: 'text'
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
                header: '독점 플랫폼',
                align: 'center',
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getPlatforms().map(value => {
                            return { text: value, value: value};
                        }).concat(...[{ text: '', value: ''}])
                    }
                }
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
                editor: {
                    type: 'select',
                    options: {
                        listItems: ConfigDC.getSellStates().map(value => {
                            return { text: value, value: value};
                        })
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

        this.bookMainInfoGrid.on('click', () => this.finishEditing());
        this.bookGubunInfoGrid.on('click', () => this.finishEditing());
        this.bookBookNameInfoGrid.on('click', () => this.finishEditing());
        this.bookWriterInfoGrid.on('click', () => this.finishEditing());
        this.bookPriceInfoGrid.on('click', () => this.finishEditing());
        this.bookPublisherInfoGrid.on('click', () => this.finishEditing());
        this.bookInfoGrid.on('click', () => this.finishEditing());
        this.bookPreviewInfoGrid.on('click', () => this.finishEditing());
        this.bookOpenInfoGrid.on('click', () => this.finishEditing());
        this.bookSellStatusInfoGrid.on('click', () => this.finishEditing());

        this.btnSave = new ButtonView(null);
        this.btnSave.element.textContent = '저장';
        this.btnSave.element.className = 'btnSave';
        this.element.appendChild(this.btnSave.element);
        this.btnSave.setOnClick(() => {
            // console.log(this.bookBookNameInfoGrid.getValue(0, 'adult').toString());
            // console.log(this.bookBookNameInfoGrid.getValue(0, 'adult').toString());
            // console.log(this.bookBookNameInfoGrid.getValue(0, 'adult').toString());
            // console.log(this.bookBookNameInfoGrid.getValue(0, 'adult').toString());
            // console.log(this.bookBookNameInfoGrid.getValue(0, 'adult').toString());
            // // private bookMainInfoGrid: Grid;
            // // private bookGubunInfoGrid: Grid;
            // // private bookBookNameInfoGrid: Grid;
            // // private bookWriterInfoGrid: Grid;
            // // private bookPriceInfoGrid: Grid;
            // // private bookPublisherInfoGrid: Grid;
            // // private bookInfoGrid: Grid;
            // // private bookPreviewInfoGrid: Grid;
            // // private bookOpenInfoGrid: Grid;
            // // private bookSellStatusInfoGrid: Grid;
            this.state.book.순번 = Number(this.bookMainInfoGrid.getValue(0, 'id').toString());
            this.state.book.ISBN = this.bookMainInfoGrid.getValue(0, 'isbn').toString();

            this.state.book.구분 = this.bookGubunInfoGrid.getValue(0, 'gubun').toString();
            this.state.book.분류 = this.bookGubunInfoGrid.getValue(0, 'kind').toString();
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
        });
    }

    private finishEditing(): void {
        this.bookMainInfoGrid.finishEditing();
        this.bookGubunInfoGrid.finishEditing();
        this.bookBookNameInfoGrid.finishEditing();
        this.bookWriterInfoGrid.finishEditing();
        this.bookPriceInfoGrid.finishEditing();
        this.bookPublisherInfoGrid.finishEditing();
        this.bookInfoGrid.finishEditing();
        this.bookPreviewInfoGrid.finishEditing();
        this.bookOpenInfoGrid.finishEditing();
        this.bookSellStatusInfoGrid.finishEditing();
    }

    public render(): void {
        const book: BookModel = this.state.book;

        this.bookMainInfoGrid.resetData([{
            id: book.순번,
            isbn: book.ISBN || '',
        }]);
        this.bookGubunInfoGrid.resetData([{
            gubun: book.구분,
            kind: book.분류,
            totalCount: book.총회차 || '',
            freeCount: book.무료회차 || '',
        }]);
        this.bookBookNameInfoGrid.resetData([{
            bookName: book.도서명 || '',
            finish: book.완결,
            adult: book.성인
        }]);

        this.bookWriterInfoGrid.resetData([{
            writerName: book.저자명 || '',
            startDate: book.발행일 || '',
            lendable: book.대여여부
        }]);

        this.bookPriceInfoGrid.resetData([{
            originPrice: book.정가 || '',
            sellPrice: book.판매가 || '',
            lendPrice: book.대여가 || '',
            lendDate: book.대여일
        }]);
        this.bookPublisherInfoGrid.resetData([{
            publisher: book.출판사 || '',
            copyright: book.저작권자 || ''
        }]);
        this.bookInfoGrid.resetData([{
            bookInfo: book.작품소개 || '',
            writerInfo: book.저자소개 || ''
        }]);
        this.bookPreviewInfoGrid.resetData([{
            preview: book.출판사서평 || '',
            keyword: book.키워드 || ''
        }]);
        this.bookOpenInfoGrid.resetData([{
            platform: book.독점,
            endDate: book.독점종료일
        }]);
        this.bookSellStatusInfoGrid.resetData([{
            sellStatus: book.판매상태,
            endDate2: ''
        }]);
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