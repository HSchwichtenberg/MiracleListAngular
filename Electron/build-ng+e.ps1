$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." }
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
cd "Electron"
copy-item * ..\temp_electron  -Force -exclude *.ps1 -Recurse
.\build-e.ps1
