// import yargs from "yargs";

const runCommand = async (args: string[]) => {

    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    // If yarg is a yargs instance, parse argv to get the arguments object
    return typeof yarg.parse === 'function' ? yarg.parse() : yarg;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {

        const argv = await runCommand(['-b', '5']);

        // console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));

    });

    test('should return configuration whit custom values', async () => {
        const argv = await runCommand(['-b', '10', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

        // console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: 10,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }));
    });



})