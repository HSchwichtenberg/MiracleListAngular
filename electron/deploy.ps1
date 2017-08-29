if ((get-location).Path -like "*electron*") { cd ".." } 
ng build --target=production --environment=prod --output-path=temp_electron --base-href . 
npm run m-copy-electron 
electron-packager temp_electron MiracleListElectron --platform=darwin,linux,win32 --arch=x64 --out=dist_electron/ --overwrite --icon=src/assets/favicon.ico  --asar
"!!!FERTIG!!!"