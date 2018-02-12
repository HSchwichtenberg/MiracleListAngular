
$js = @"
var electronInstaller = require('electron-winstaller');

console.log('Start...');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'H:\MiracleListClient\temp_electron2',
    outputDirectory: 'H:\MiracleListClient\dist_electron\MiracleListElectron-win32-x64-Installer',
    authors: 'Dr. Holger Schwichtenberg',
    exe: 'MiracleListElectron.exe'
  });
console.log('Start2...');

resultPromise.then(() => console.log('It worked!'), (e) => console.log('No dice: ' + e.message));
"@

$js

node -e $js
