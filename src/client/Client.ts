import { SelectView } from "./view/common/SelectView";
import BookDC from "./dc/BookDC";
import { BookManagerVC } from "./vc/BookManagerVC";
import { BookInfoGridView } from "./view/bookmanage/BookInfoGridView";
import * as path from 'path';
import BookLogisticsDC from "./dc/BookLogisticsDC";
import ExcelAgent from "./agent/ExcelAgent";
import ConfigDC from "./dc/ConfigDC";

class Client {
    constructor() {
        // const sview = new SelectView('gubun');
        // const aa = (sview as any).element as HTMLSelectElement;
        // setTimeout(() => aa.value = '4', 5000);

        // console.log(Date.now());
        // const book = BookDC.getBookByIdx(33068);
        // const books = BookDC.getBooksByName('연재');
        // console.log(Date.now());

        // BookDC.loadFromJson(path.join(__dirname, '../../testData/BookData.json'));
        // BookLogisticsDC.loadFromJson(path.join(__dirname, '../../testData/BookData.json'));
        ConfigDC.readFromJson(path.join(__dirname, '../../public/config/config.json'));
            

        (async () => {
            await BookDC.readExcelFile(path.join(__dirname, '../../public/도서정보_MH_서식변경.xlsx'));
            new BookManagerVC();
        })();

        // new BookManagerVC();
        // ExcelAgent.readExcelFile(path.join(__dirname, '../../public/도서정보_MH_서식변경.xlsx')).then(data => {
        //     // console.log(data);
        //     // const firstBook = data[0][0];
        //     // const logistics = data[1][0];

        //     // console.log(Object.keys(firstBook));
        //     // console.log(Object.keys(logistics));
        // });
    }
}

export default new Client();