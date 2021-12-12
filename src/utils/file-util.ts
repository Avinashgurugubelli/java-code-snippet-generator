import fs from 'fs';
import path from 'path';

export class FileUtil {

    public static writeSync(filePath: string, data: string) {
        let isFileExists: boolean = fs.existsSync(filePath);
        try {
            if (isFileExists) {
                fs.appendFileSync(filePath, data, 'utf8');
            }
            else {
                this.createDir(filePath);
                fs.writeFileSync(filePath, data, { flag: 'wx' });
            }
        } catch (error) {
            console.log("error occurred while writing file: " + error);
            throw error;
        }
    }

    public static write(filePath: string, data: string) {
        let isFileExists: boolean = fs.existsSync(filePath);
        try {
            if (isFileExists) {
                fs.appendFile(filePath, data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            else {
                this.createDir(filePath);
                fs.writeFile(filePath, data, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        } catch (error) {
            console.log("error occurred while writing file: " + error);
        }
    }

    public static appendPromise(filePath: string, data: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.appendFile(filePath, data.toString(), (err) => {
                if (err) {
                    let errorMsg: string = "Some error occurred while writing a file in the specified path: " + filePath + " error: " + err;
                    reject(errorMsg);
                }
                resolve(true);
            });
        });
    }

    public static createDirAndWrite(filePath: string, data: string): Promise<boolean> {
        this.createDir(filePath);
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    let errorMsg: string = "Some error occurred while writing a file in the specified path: " + filePath + " error: " + err;
                    reject(errorMsg);
                }
            });
            resolve(true);
        });
    }

    
    public static writePromise(filePath: string, data: string, append: boolean = true): Promise<boolean> {
        let isFileExists: boolean = fs.existsSync(filePath);
        if (isFileExists) {
            return new Promise((resolve, reject) => {
                if (append) {
                    return this.appendPromise(filePath, data);
                }
                else {
                    return this.createDirAndWrite(filePath, data);
                }

            });
        }
        else {
            return this.createDirAndWrite(filePath, data);
        }
    }

    public static read(filePath: string): string {
        let data: string = "";
        let isFileExists: boolean = fs.existsSync(filePath);
        if (isFileExists) {
            fs.readFile(filePath, (error, data) => {
                if (error) {
                    console.log("Some error occurred while reading a file from the specified path: " + filePath + " error: " + error);
                }
                return data = data;
            });
        }
        else {
            console.log("File does not exist in the path: " + filePath);
        }
        return data;
    }

    public static readPromise(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let isFileExists: boolean = fs.existsSync(filePath);
            if (isFileExists) {
                fs.readFile(filePath, (error, data) => {
                    if (error) {
                        let errorMsg: string = "Some error occurred while reading a file from the specified path: " + filePath + " error: " + error;
                        reject(errorMsg);
                    }
                    resolve(data.toString())
                });
            }
            else {
                reject("File does not exist in the path: " + filePath);
            }
        });
    }


    public static readSync(filePath: string): string {
        let data: string = "";
        let isFileExists: boolean = fs.existsSync(filePath);
        if (isFileExists) {
            data = fs.readFileSync(filePath).toString();
        }
        else {
            console.log("File does not exist in the path: " + filePath);
        }
        return data;
    }

    public static createDir(filePath: string) {
        let dirName: string = path.dirname(filePath);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    }   

    public static fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }

}

// FileUtility.writeSync("./data/test.txt", "Hello World");
// console.log(FileOperations.read("./data/sample.txt"))

class FileOperatorsTester {
    private filePath: string = "";

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public async readFile() {
        try {
            console.log("file reading started ")
            let data: string = await FileUtil.readPromise(this.filePath);
            console.log("File reading completed. File data: " + data);
        }
        catch (err) {
            console.log("Error occurred while reading file: ", err);
        }
    }

    public async writeToFile(data: string): Promise<boolean> {
        try {
            console.log("file writing started ");
            let flag: boolean = await FileUtil.writePromise(this.filePath, data);
            console.log("File writing completed.");
            return flag;
        }
        catch (err) {
            return err;
        }
    }

    public writeAndRead(data: string) {
        this.writeToFile(data).then(() => this.readFile()).catch((err) => console.log(err))
    }
}

