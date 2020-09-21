export class BookModel {
    public "구분": string;
    public "분류": string;
    public "독점": string; // 얘는???
    public "독점종료일": number; // 얘는???
    public "순번": number;
    public "판매상태": string;
    public "도서명": string;
    public "저자명": string;
    public "출판사": string;
    public "저작권자": string;
    public "ISBN": string;
    public "발행일": number;
    public "완결": string;
    public "성인": string;
    public "작품소개": string;
    public "저자소개": string;
    public "출판사서평": string;
    public "키워드": string;
    public "정가": number;
    public "판매가": number;
    public "총회차": number;
    public "무료회차": number;
    public "대여여부": string;
    public "대여가": number;
    public "대여일": number;

    public 플랫폼들: Map<string, 'O' | 'X' | '-'>;
}