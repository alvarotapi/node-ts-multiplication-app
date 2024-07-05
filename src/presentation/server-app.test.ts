import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('ServerApp', () => {
  const options = { base: 2, limit: 10, showTable: false, fileDestination: 'test-filedestination', fileName: 'test-filename' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should create ServerApp instance', () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  it('Should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenLastCalledWith('File created!');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  it('Should run with custon values mocked', () => {
    const logMock = jest.fn();
    const errorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue('test value');
    const saveFileMock = jest.fn().mockReturnValue(true);

    global.console.log = logMock;
    global.console.error = errorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createTableMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: 'test value',
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith('File created!');
    expect(errorMock).not.toHaveBeenCalled();
  });
});
