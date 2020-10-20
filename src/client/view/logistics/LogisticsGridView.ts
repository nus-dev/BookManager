import { BookLogistics } from "../../model/BookLogistics";
import { BookModel } from "../../model/BookModel";
import { View, ViewState } from "../View";
import Grid, { Filter } from 'tui-grid';

export class LogisticsGridView extends View<LogisticsGridViewStatus> {
    public readonly gridInstance: Grid;
    public changedDatas: Array<{
        idx: number,
        platform: string,
        value: string
    }> = [];

    constructor(id: string) {
        super(id);
        this.gridInstance = new Grid({
            el: this.element,
            bodyHeight: 680,
            width: 'auto',
            scrollX: true,
            scrollY: true,
            columns:[],
            columnOptions: {
                frozenCount: 5,
                frozenBorderWidth: 2
            }
        });
    }

    private getLogisticsColumns(): any {
        return this.state.logistics.map(platform => {
            return {
                header: platform,
                name: platform,
                width: 100,
                filter: 'select',
                copyOptions: {
                    useListItemText: true
                },
                formatter: 'listItemText',
                editor: {
                    type: 'select',
                    options: {
                        listItems: [
                            { text: 'O', value: 'O' },
                            { text: 'X', value: 'X' },
                            { text: '-', value: '-' }
                        ]
                    }
                }
            }
        })
    }

    public render(): void {
        this.gridInstance.finishEditing();
        this.changedDatas = [];

        this.gridInstance.setColumns([
                { header: '책ID', name: 'id', width: 60 },
                { header: '도서명', name: 'bookName', width: 410 },
                { header: '저자명', name: 'writer', width: 140 },
                { header: '출판사', name: 'publisher', width: 200 },
                { header: '판매상태', name: 'sellState', width: 70 },
                ...this.getLogisticsColumns()
            ]
        );

        this.gridInstance.on('afterChange', (gridEvent) => {
            const datas = Array.isArray((gridEvent as any).changes) ? (gridEvent as any).changes : [(gridEvent as any).changes];
            this.changedDatas.push(...datas.map((data: any) => {
                return {
                    idx: data.rowKey,
                    platform: data.columnName,
                    value: data.value
                }
            }));
        });

        this.gridInstance.resetData(
            this.state.books.map((book: BookModel) => {
                const platformMap = this.getPlatformMap(book);
                platformMap.id = book.순번;
                platformMap.gubun = book.구분;
                platformMap.bookName = book.도서명;
                platformMap.writer = book.저자명;
                platformMap.publisher = book.출판사;
                platformMap.sellState = book.판매상태;
                return platformMap;
            })
        );
    }

    public isFiltered(): boolean {
        return this.gridInstance.getFilterState() && this.gridInstance.getFilterState().length > 0;
    }

    public getFilters(): Array<Filter> {
        return this.gridInstance.getFilterState();
    }

    private getPlatformMap(book: BookModel): any {
        const result: any = {};
        this.state.logistics.forEach(platform => {
            result[platform] = book.플랫폼들.get(platform);
        });

        return result;
    }
}

export class LogisticsGridViewStatus extends ViewState {
    constructor(public readonly books: Array<BookModel>, public readonly logistics: Array<string>) {
        super();
    }
}