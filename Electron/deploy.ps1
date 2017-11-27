if ((get-location).Path -like "*electron*") { cd ".." } 
"--> Angular-Produktions-Build für Electron nach temp_electron..."
ng build --target=production --environment=prod --output-path=temp_electron --base-href . 
"--> Kopiere Zusatzdateien für Electron nach /temp_electron ..."
npm run w-copy-electron 
"--> Electron-Paket erstellen..."
electron-packager temp_electron MiracleListElectron --platform=darwin,linux,win32 --arch=x64 --out=dist_electron/ --overwrite --icon=src/assets/favicon.ico  --asar
"--> !!!FERTIG!!!"
& "H:\MiracleListClient\dist_electron\MiracleListElectron-win32-x64\MiracleListElectron.exe"
