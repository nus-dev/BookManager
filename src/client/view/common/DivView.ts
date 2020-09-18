import { View, ViewState } from "../View";

export class DivView extends View<DivViewStatus> {
    private onClickHandlers: Array<any> = [];

    constructor(id: string) {
        super(id);

        this.element.onclick = (ev: MouseEvent) => this.onClick(ev);
    }
    public render(): void {
        this.state.visible ? this.element.classList.remove('hide') : this.element.classList.add('hide');
    }

    public isShowed(): boolean {
        return this.state && this.state.visible;
    }

    private onClick(ev: MouseEvent): void {
        this.onClickHandlers.forEach(handler => handler(ev));
    }
    
    public setOnClick(handler: (ev: MouseEvent) => void): void {
        this.onClickHandlers.push(handler);
    }
}

export class DivViewStatus extends ViewState {
    //
    constructor(public visible: boolean) {
        super();
    }
}