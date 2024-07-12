import { createWriteStream } from "fs";
import * as ssh2 from "ssh2";
import { randomUUID } from "crypto";

export const downloadFile = async (fileStream: ssh2.ReadStream) => {
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
