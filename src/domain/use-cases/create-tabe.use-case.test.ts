import { CreateTable } from "./create-tabe.use-case";

describe('CreateTableUseCase', () => {

    test('should create a with default values', () => {
        const createTable = new CreateTable();

        const table = createTable.execute({ base: 5 });
        const rows = table.split('\n').length;

        // console.log(table);

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('5 x 1 = 5');
        expect(table).toContain('5 x 10 = 50');
        expect(rows).toBe(10);
    });

    test('should create a table with custom values', () => {

        const createTable = new CreateTable();

        const options = { base: 3, limit: 20 };

        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        // console.log(table);

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain(`${options.base} x 1 = ${options.base}`);
        expect(table).toContain(`${options.base} x ${options.limit} = ${options.base * options.limit}`);
        expect(rows).toBe(options.limit);
    });

});