import { SFTPClient } from "./SFTPClient";

(async () => {
    try {
        const sftpClient = new SFTPClient();
        
        const filePath = process.argv[2].toString();
        if(!filePath) {
            throw new Error('Please update folder path');
        }

        await sftpClient.connect();

        // download file
        await sftpClient.download(filePath);
    } catch (error) {
        console.log(error);
    }
})();
