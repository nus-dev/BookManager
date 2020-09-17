import {ViewStatus, View} from "../View";

export class TextAreaView extends View<TextAreaViewStatus> {
    public element: HTMLTextAreaElement;

    public render(): void {
        this.element.value = this.status.text || '';
    }

    public getText(): string {
        return this.element.value;
    }
}

export class TextAreaViewStatus extends ViewStatus {
    constructor(public text: string) {
        super();
    }

    public isChanged(status: TextAreaViewStatus): boolean {
        return this.text !== status.text;
    }
}