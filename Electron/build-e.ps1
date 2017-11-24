$erroractionpreference = "stop"
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
if ((get-location).Path -notlike "*electron*") { cd "electron" }
copy-item * ..\temp_electron -Recurse -Force -exclude *.ps1
.\run-windows.ps1
