import { ServerApp } from "./server-app";
import { CreateTable } from "../domain/use-cases/create-tabe.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        show: false,
        destination: 'test-destination',
        name: 'test-filename'
    }

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {

        //     const logSpy = jest.spyOn(console, 'log');
        //     const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        //     const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        //     ServerApp.run(options);

        //     expect(logSpy).toHaveBeenCalledTimes(3);
        //     expect(logSpy).toHaveBeenCalledWith('ServerApp is running...');
        //     expect(logSpy).toHaveBeenCalledWith('Archivo tabla-2.txt creado');

        //     expect(createTableSpy).toHaveBeenCalledTimes(1);
        //     expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        //     expect(saveFileSpy).toHaveBeenCalledTimes(1);
        //     expect(saveFileSpy).toHaveBeenCalledWith({
        //         fileContent: expect.any(String),
        //         destination: options.destination,
        //         fileName: `${options.name}.txt`
        //     });
    });

    test('should run whit custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('ServerApp is running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            destination: options.destination,
            fileName: `${options.name}.txt`
        });
        expect(logMock).toHaveBeenCalledWith('Archivo tabla-2.txt creado');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
});