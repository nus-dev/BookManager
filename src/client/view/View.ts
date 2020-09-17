export abstract class View<VIEWSTATUS extends ViewStatus> {
    public element: HTMLElement;
    protected status: VIEWSTATUS;

    constructor(id: string) {
        this.element = document.getElementById(id);
        if (!this.element) {
            this.element = this.createElement();
        }
    }

    protected createElement(): HTMLElement {
        return null;
    }

    public setStatus(status: VIEWSTATUS): void {
        if (!this.status || this.status.isChanged(status)) {
            this.status = status;
            this.render();
            console.log('render');
        } else {
            this.status = status;
        }
    }

    public getStatus(): VIEWSTATUS {
        return this.status;
    }

    protected abstract render(): void;
}

export abstract class ViewStatus {
    public isChanged(status: ViewStatus): boolean {
        return true;
    }
}