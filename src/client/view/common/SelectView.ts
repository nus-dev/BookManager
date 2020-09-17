import {View, ViewStatus} from "../View";

export class SelectView extends View<SelectViewStatus> {
    public element: HTMLSelectElement;
    private onChangeHandlers: Array<any> = [];
    constructor(id: string) {
        super(id);
        
        this.element.onchange = () => this.onChange();
    }

    private onChange(): void {
        const value = this.element.options[this.element.selectedIndex].value;
        this.onChangeHandlers.forEach(handler => handler(value));
    }

    protected render(): void {
        //
    }

    public setOnChange(handler: (value: string) => void): void {
        this.onChangeHandlers.push(handler);
    }
}

export class SelectViewStatus extends ViewStatus {
    // public isChanged(status: ViewStatus): boolean {
    //     return super.isChanged(status) && true;
    // }
}