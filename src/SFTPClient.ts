import Client, { FileInfo } from "ssh2-sftp-client";
import dotenv from "dotenv";
import { downloadFile } from "./utils";

dotenv.config();

export class SFTPClient {
    private readonly client: Client;

    constructor() {
        this.client = new Client();
    }

    public async connect(): Promise<void> {
        await this.client.connect({
            host: process.env.SFTP_HOST,
            port: parseInt(process.env.SFTP_PORT as string),
            username: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD
        });
        console.log('connection established!');
    }

    public async download(filePath: string): Promise<void> {
        const fileStream = this.client.createReadStream(filePath, {
            encoding: 'utf-8'
        }); 
    
        await downloadFile(fileStream);
        console.log(`file downloaded!: ${filePath}`);
    }

    public async createFolder(folderPath: string): Promise<void> {
        await this.client.mkdir(folderPath);
        console.log(`folder created: ${folderPath}`);
    }

    public async listFiles(folderPath: string): Promise<FileInfo[]> {
        return this.client.list(folderPath);
    }
}
