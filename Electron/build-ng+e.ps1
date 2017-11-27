$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." }
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
copy-item Electron temp_electron  -Force -exclude *.ps1 -Recurse
cd "Electron"
.\build-e.ps1
