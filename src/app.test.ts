// process.argv = ['node','app.ts','-b', '10'];
// import './app';

import { ServerApp } from './presentation/server-app';

describe('app.ts', () => {
  it('Should call Server.run with values', async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;

    process.argv = [...process.argv, '-b', '10', '-l', '20', '-s', '-n', 'test-file', '-d', 'test-outputs'];

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 20,
      showTable: true,
      fileName: 'test-file',
      fileDestination: 'test-outputs',
    });
  });
});
