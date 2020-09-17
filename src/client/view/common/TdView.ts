import {ViewStatus, View} from "../View";

export class TdView extends View<TdViewStatus> {
    public element: HTMLTableDataCellElement;

    public render(): void {
        this.element.textContent = this.status.text;
    }

    protected createElement(): HTMLElement {
        return document.createElement('td');
    }
}

export class TdViewStatus extends ViewStatus {
    constructor(public text: string) {
        super();
    }

    public isChanged(status: TdViewStatus): boolean {
        return this.text !== status.text;
    }
}