$erroractionpreference = "stop"
if ((get-location).Path -like "*electron*") { cd ".." } 
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href . 
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
xcopy electron\* temp_electron /s /e /y
"Starte Electron App..."
.\electron\node_modules\.bin\electron temp_electron