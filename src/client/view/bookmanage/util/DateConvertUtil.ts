class DateConvertUtil {
    private readonly STANDARD_DATE: Date = new Date('1900/01/01');

    public excelDateToDateString(excelDate: string): string {
        if (Number.isSafeInteger(Number(excelDate))) {
            const newDate = new Date((this.STANDARD_DATE.getTime() + (Number(excelDate) - 1) * 24 * 60 * 60 * 1000));
            return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`;
        }
        return excelDate;
    }

    public dateStringToExcelDate(dateStr: string): string {
        const date = new Date(dateStr);
        const Timediff = date.getTime() - this.STANDARD_DATE.getTime();
        return String(Math.round(Timediff / (24 * 60 * 60 * 1000)) + 1);
    }
}

export default new DateConvertUtil();