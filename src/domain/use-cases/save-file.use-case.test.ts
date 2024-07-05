import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    if (outputFolderExists) fs.rmSync('outputs', { recursive: true });

    const customFolderExists = fs.existsSync('custom-outputs');
    if (customFolderExists) fs.rmSync('custom-outputs', { recursive: true });
  });

  it('should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = { fileContent: 'test content' };

    const result = saveFile.execute(options);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExist).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('should save file with custom values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs',
      fileName: 'custom-table-name',
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const result = saveFile.execute(options);
    const fileExist = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExist).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  it('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error from testing');
    });

    const options = { fileContent: 'test error content' };

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();

    mkdirSpy.mockRestore();
  });

  it('should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('This is a custom writing error message');
    });

    const options = { fileContent: 'test error content' };

    const result = saveFile.execute(options);

    expect(result).toBeFalsy();

    writeFileSpy.mockRestore();
  });
});
