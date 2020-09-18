import { View, ViewState } from "../View";

export class InputView extends View<InputViewStatus> {
    public element: HTMLInputElement;
    
    private onKeyUpHandlers: Array<any> = [];
    constructor(id: string) {
        super(id);

        this.element.onkeyup = (ev: KeyboardEvent) => this.onKeyUp(ev);
    }

    private onKeyUp(ev: KeyboardEvent): void {
        this.onKeyUpHandlers.forEach((handler) => handler(ev));
    }

    public render(): void {
        //
    }

    public setOnKeyDown(handler: (ev: KeyboardEvent) => void): void {
        this.onKeyUpHandlers.push(handler);
    }

    public getText(): string {
        return this.element.value;
    }
}

export class InputViewStatus extends ViewState {
    //
}