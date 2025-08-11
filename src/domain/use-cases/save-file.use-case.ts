import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean
}

export interface Options {
    fileContent: string;
    destination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        // Repository injection could be done here
    ) { }

    execute({
        fileContent,
        destination = 'outputs',
        fileName = 'table.txt'
    }: Options): boolean {

        try {
            fs.mkdirSync(destination, { recursive: true });
            fs.writeFileSync(`${destination}/${fileName}`, fileContent);
            console.log(`Archivo creado`);
            return true;
        } catch (error) {
            console.error('Error al crear el archivo:', error);
            return false;
        }
    };
}