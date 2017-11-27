$erroractionpreference = "stop"
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
if ((get-location).Path -notlike "*electron*") { cd "electron" }
copy-item src\* ..\temp_electron -Force
copy-item .\package.json ..\temp_electron -Force
.\run-windows.ps1
