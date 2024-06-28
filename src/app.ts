import { yarg } from './config/plugins/args.plugin';
import { ServerApp } from './presentation/server-app';

// console.log('process.argv', process.argv);
// console.log('yarg.b', yarg.b);

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: showTable, d: fileDestination, n: fileName } = yarg;

  ServerApp.run({ base, limit, showTable, fileDestination, fileName });
}
