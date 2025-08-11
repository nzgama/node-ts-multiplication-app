import { CreateTable } from "../domain/use-cases/create-tabe.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    show: boolean;
    name: string;
    destination: string;
}

export class ServerApp {

    static run({ base, limit, show, name, destination }: RunOptions) {
        console.log('ServerApp is running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile()
            .execute({
                fileContent: table,
                destination,
                fileName: `${name}.txt`,
            })

        if (show) console.log(table);

        (wasCreated)
            ? console.log(`Archivo tabla-${base}.txt creado`)
            : console.log(`No se pudo crear el archivo tabla-${base}.txt`);

    }
} 