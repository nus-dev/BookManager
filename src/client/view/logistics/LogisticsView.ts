import { BookLogistics } from "../../model/BookLogistics";
import { BookModel } from "../../model/BookModel"
import { ButtonView } from "../common/ButtonView";
import { View, ViewState } from "../View"
import { LogisticsGridView, LogisticsGridViewStatus } from "./LogisticsGridView";

export class BookLogisticsView extends View<BookLogisticsViewStatus>{
    private onSelectHandlers: Array<any> = [];
    public logisticsGridView: LogisticsGridView;
    private btnSaveLogistics: ButtonView;

    constructor(id: string) {
        super(id);

        this.logisticsGridView = new LogisticsGridView('logisticsGrid');

        this.btnSaveLogistics = new ButtonView('btnSaveLogistics');
        this.btnSaveLogistics.setOnClick(() => {
            this.logisticsGridView.gridInstance.finishEditing();
            const state = this.logisticsGridView.getState();
            this.logisticsGridView.changedDatas.forEach((changeData) => {
                const book = state.books[changeData.idx];
                book.플랫폼들.set(changeData.platform, changeData.value as any);
            });
            this.logisticsGridView.changedDatas = [];
            this.logisticsGridView.render();
        });
    }

    public render(): void {
        if (!this.state.visible) {
            this.element.classList.add('hide');
            return;
        }
        this.logisticsGridView.setState(new LogisticsGridViewStatus(this.state.books, this.state.logistics));
        this.element.classList.remove('hide');
    }

    private onSelect(book: BookModel): void {
        this.onSelectHandlers.forEach(handler => handler(book));
    }

    public setOnSelect(handler: (book: BookModel) => void): void {
        this.onSelectHandlers.push(handler);
    }
}

export class BookLogisticsViewStatus extends ViewState {
    constructor(public visible: boolean, public books: Array<BookModel>, public logistics: Array<string>) {
        super();
    }
}