class ExcelAgent {
    public writeExcelFile(json: any, filePath: string): Promise<void> {
        return new Promise<void>((resolve) => {
            import('xlsx').then((xlsx) => {
                const newWorkBook = xlsx.utils.book_new();
                const sheet = xlsx.utils.json_to_sheet(json);
                xlsx.utils.book_append_sheet(newWorkBook, sheet);
                xlsx.writeFile(newWorkBook, filePath);
                resolve();
            });
        });
    }

    public readExcelFile(filePath: string): Promise<any> {
        return new Promise<any>((resolve) => {
            import('xlsx').then((xlsx) => {
                const workBook = xlsx.readFile(filePath);
                const sheets = workBook.SheetNames.map((sheetName: string) => workBook.Sheets[sheetName]);
                const json = sheets.map((sheet) => xlsx.utils.sheet_to_json(sheet));
                resolve(json);
            });
        });
    }
}

export default new ExcelAgent();