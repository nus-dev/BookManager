import { View, ViewStatus } from "../View";

export class ButtonView extends View<ButtonViewStatus> {
    private onClickHandlers: Array<any> = [];

    constructor(id: string) {
        super(id);

        this.element.onclick = (ev: MouseEvent) => this.onClick(ev);
    }
    public render(): void {
        this.status.active ? this.element.classList.remove('inactive') : this.element.classList.add('inactive');
    }

    private onClick(ev: MouseEvent): void {
        this.onClickHandlers.forEach(handler => handler(ev));
    }

    public setOnClick(handler: (ev: MouseEvent) => void): void {
        this.onClickHandlers.push(handler);
    }
}

export class ButtonViewStatus extends ViewStatus {
    constructor(public active: boolean) {
        super();
    }
}