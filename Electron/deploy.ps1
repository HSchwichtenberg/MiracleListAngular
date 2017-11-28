$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." }
"--> Angular-Produktions-Build für Electron nach temp_electron..."
ng build --target=production --environment=prod --output-path=temp_electron --base-href .
"--> Kopiere Zusatzdateien für Electron nach /temp_electron ..."
copy-item Electron\package.json temp_electron -Force
copy-item Electron\src\*.js temp_electron -Force
"Kopiere Node-Module..."
copy-item Electron\node_modules\* temp_electron\node_modules -Force -Recurse
"--> Electron-Paket erstellen..."
electron-packager temp_electron MiracleListElectron --platform=darwin,linux,win32 --arch=x64 --out=dist_electron/ --overwrite --icon=Electron/src/img/assets/favicon.ico --asar
"--> !!!FERTIG!!!"
& "H:\MiracleListClient\dist_electron\MiracleListElectron-win32-x64\MiracleListElectron.exe"
