import { BookManagerVC } from "./vc/BookManagerVC";
import ConfigDC from "./dc/ConfigDC";
import {ipcRenderer, IpcRendererEvent} from 'electron';

class Client {
    constructor() {
        const onFileDialogOff = (event: IpcRendererEvent, args: any) => {
            ipcRenderer.off('openFilePath', onFileDialogOff);

            if (args && args.length > 0) {
                ConfigDC.readFromJson(args[0]);
                new BookManagerVC();
            }
        }
        ipcRenderer.on('openFilePath', onFileDialogOff);
        ipcRenderer.send('showFileOpenDialog', 'json');
    }
}

export default new Client();