import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

// console.log(yarg);
const { b: base, l: limit, s: showTable } = yarg;

const headerMessage = `
----------------------------------------
             TABLA DEL ${base}
----------------------------------------\n
`;
let outputMessage = '';

for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} * ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;
if (showTable) console.log(outputMessage);

const outputPath = 'outputs/';
fs.mkdirSync(`${outputPath}`, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla${base}.txt`, outputMessage);

console.log('File created!');
