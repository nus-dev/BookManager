class DateConvertUtil {
    private readonly STANDARD_DATE: Date = new Date('1900/01/01');

    public excelDateToDateString(excelDate: number): string {
        const newDate = new Date((this.STANDARD_DATE.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000));
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
    }

    public dateStringToExcelDate(dateStr: string): number {
        const date = new Date(dateStr);
        const Timediff = date.getTime() - this.STANDARD_DATE.getTime();
        return Math.round(Timediff / (24 * 60 * 60 * 1000)) + 1;
    }
}

export default new DateConvertUtil();