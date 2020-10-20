import * as fs from 'fs';

type Config = {
    "옵션": {
        "구분": Array<string>,
        "분류": Array<string>,
        "완결": Array<string>,
        "성인": Array<string>,
        "대여여부": Array<string>,
        "판매상태": Array<string>
    },
    "플랫폼": Array<string>,
    "엑셀포맷": Array<{
        "시트명": string,
        "열": Array<string>
    }>
}

class ConfigDC {
    private config: Config;

    public readFromJson(jsonFilePath: string): void {
        this.config = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }

    public writeToJson(jsonFilePath: string): void {
        fs.writeFileSync(jsonFilePath, this.config, 'utf8');
    }

    public getGubuns(): Array<string> {
        return this.config.옵션.구분;
    }

    public getKinds(): Array<string> {
        return this.config.옵션.분류;
    }

    public getIsFinishs(): Array<string> {
        return this.config.옵션.완결;
    }

    public getIsAdults(): Array<string> {
        return this.config.옵션.성인;
    }

    public getIsLendables(): Array<string> {
        return this.config.옵션.대여여부;
    }

    public getSellStates(): Array<string> {
        return this.config.옵션.판매상태;
    }

    public getPlatforms(): Array<string> {
        return this.config.플랫폼;
    }

    public getExcelFormatAll(): Array<{"시트명": string, "열": Array<string>}> {
        return this.config.엑셀포맷
    }

    public getExcelFormat(idx: number): {"시트명": string, "열": Array<string>} {
        return this.config.엑셀포맷[idx];
    }
}

export default new ConfigDC();