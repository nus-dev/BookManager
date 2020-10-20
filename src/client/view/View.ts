export abstract class View<VIEWSTATE extends ViewState> {
    public element: HTMLElement;
    protected state: VIEWSTATE;

    constructor(id: string) {
        this.element = document.getElementById(id);
        if (!this.element) {
            this.element = this.createElement();
        }
    }

    protected createElement(): HTMLElement {
        return null;
    }

    public setState(state: VIEWSTATE): void {
        if (!this.state || this.state.isChanged(state)) {
            this.state = state;
            this.render();
        } else {
            this.state = state;
        }
    }

    public getState(): VIEWSTATE {
        return this.state;
    }

    protected abstract render(): void;
}

export abstract class ViewState {
    public isChanged(state: ViewState): boolean {
        return true;
    }
}