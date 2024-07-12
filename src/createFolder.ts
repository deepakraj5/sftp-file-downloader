import { SFTPClient } from "./SFTPClient";

(async () => {
    try {     
        const sftpClient = new SFTPClient();
        
        const folderPath = process.argv[2];
        if(!folderPath) {
            throw new Error('Please update folder path');
        }
        
        await sftpClient.connect();

        // create dir
        await sftpClient.createFolder(folderPath);
    } catch (error) {
        console.log(error);
    }
})();
