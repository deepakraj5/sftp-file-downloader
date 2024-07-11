import Client from "ssh2-sftp-client";
import dotenv from "dotenv";
import { createWriteStream } from "fs";
import * as ssh2 from "ssh2";
import { randomUUID } from "crypto";

dotenv.config();

const sftpClient = new Client();

const downloadFile = async (fileStream: ssh2.ReadStream) => {
    try {
        return new Promise(async (resolve, reject) => {

            const storageFilePath = `./result/${randomUUID()}.csv`;

            const writeStream = createWriteStream(storageFilePath, {
                encoding: 'utf-8'
            });
            
            for await (const chunk of fileStream) {
                writeStream.write(chunk);
            }

            writeStream.end((error: any) => {
                if(error) {
                    reject(error);
                }
                resolve(true);
            });

        })
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    try {
        await sftpClient.connect({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT as string),
            username: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD
        });
        console.log('connection established!');

        // list files inside the folder
        const fileInfo = await sftpClient.list("/downloads/Algolia_Test");
        console.log(fileInfo);

        const fileStream = sftpClient.createReadStream("/downloads/Algolia_Test/inv_agg_export_240711081319.csv", {
            encoding: 'utf-8'
        });

        await downloadFile(fileStream);
        console.log('file downloaded!');
    } catch (error) {
        console.log(error);
    }
})();
