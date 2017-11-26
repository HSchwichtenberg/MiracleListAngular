$erroractionpreference = "stop"
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
if ((get-location).Path -notlike "*electron*") { cd "electron" }
copy-item * ..\temp_electron  -Force -exclude *.ps1 #-Recurse
.\run-windows.ps1
