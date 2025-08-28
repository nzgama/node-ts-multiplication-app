import fs from "fs";
import { SaveFile } from "./save-file.use-case";

describe('CreateTableUseCase', () => {

    const optionsOptions = {
        fileContent: 'custom content',
        destination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name.txt'
    }

    const customFilePath = `${optionsOptions.destination}/${optionsOptions.fileName}`;


    // beforeEach(() => {
    //     jest.clearAllMocks();
    // })

    afterEach(() => {
        // clean up
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(optionsOptions.destination);
        if (customOutputFolderExists) fs.rmSync(optionsOptions.destination, { recursive: true });
    })

    test('should create a table with default values', () => {

        const saveFile = new SaveFile();
        const savePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(savePath);
        const fileContent = fs.readFileSync(savePath, { encoding: 'utf-8' });

        expect(result).toBe(true)
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });


    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(optionsOptions);
        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });
    });

    test('should return false if direcory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
                throw new Error('This is a custom error meessage from testing')
            });

        const result = saveFile.execute(optionsOptions);

        expect(result).toBe(false);

        mkdirMock.mockRestore();
    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
                throw new Error('This is a custom wirting error message from testing');
            });

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect(result).toBe(false);

        writeFileSyncSpy.mockRestore();
    });

});