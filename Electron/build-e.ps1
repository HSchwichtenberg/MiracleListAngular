$erroractionpreference = "stop"
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
if ((get-location).Path -notlike "*electron*") { cd "electron" }
copy-item * ..\temp_electron -Recurse -Verbose
.\run-windows.ps1

