import { ServerApp } from "./presentation/server-app";

describe('Test App.ts', () => {

    test('should call Server.run whit values', async () => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '2', '-l', '10', '-s', 'true', '-n', 'test-table', '-d', 'test-destination'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 2,
            limit: 10,
            show: true,
            name: 'test-table',
            destination: 'test-destination'
        });
    });

})