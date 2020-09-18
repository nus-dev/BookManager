import {ViewState, View} from "../View";

export class TextAreaView extends View<TextAreaViewStatus> {
    public element: HTMLTextAreaElement;

    private onChangeHandlers: Array<any> = [];
    constructor(id: string) {
        super(id);
        
        this.element.onchange = () => this.onChange();
    }

    private onChange(): void {
        const value = this.element.value;
        this.setState(new TextAreaViewStatus(value));
    }

    public setOnChange(handler: (value: string) => void): void {
        this.onChangeHandlers.push(handler);
    }

    public render(): void {
        this.element.value = this.state.text || '';
    }

    public getText(): string {
        return this.element.value;
    }
}

export class TextAreaViewStatus extends ViewState {
    constructor(public text: string) {
        super();
    }

    public isChanged(status: TextAreaViewStatus): boolean {
        return this.text !== status.text;
    }
}