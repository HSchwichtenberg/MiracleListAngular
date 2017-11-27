$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." }
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
"Kopiere Dateien..."
cd "Electron"
copy-item .\package.json ..\temp_electron -Force
copy-item src\* ..\temp_electron -Force
"Kopiere Node-Module..."
copy-item node_modules\* ..\temp_electron\node_modules -Force -Recurse
.\build-e.ps1
