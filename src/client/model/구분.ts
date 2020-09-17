import {EnumType} from "./Enum";

export class 구분 extends EnumType<구분>() {
    static readonly 연재 = new 구분('연재');
    static readonly 시리즈 = new 구분('시리즈');
    static readonly 단권 = new 구분('단권');
    static readonly 세트 = new 구분('세트');

    constructor(readonly value: string) {
        super();
    }
}