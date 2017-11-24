$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." }
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
cd "Electron"
.\build-e.ps1
