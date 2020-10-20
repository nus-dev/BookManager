export class BookModel {
    public "구분": string;
    public "분류": string;
    public "독점종료일": string; // 얘는???
    public "순번": string;
    public "판매상태": string;
    public "도서명": string;
    public "저자명": string;
    public "출판사": string;
    public "저작권자": string;
    public "ISBN": string;
    public "발행일": string;
    public "완결": string;
    public "성인": string;
    public "작품소개": string;
    public "저자소개": string;
    public "출판사서평": string;
    public "키워드": string;
    public "정가": string;
    public "판매가": string;
    public "총회차": string;
    public "무료회차": string;
    public "대여여부": string;
    public "대여가": string;
    public "대여일": string;
    public "독점 플랫폼": string;

    public 플랫폼들: Map<string, 'O' | 'X' | '-'>;
}