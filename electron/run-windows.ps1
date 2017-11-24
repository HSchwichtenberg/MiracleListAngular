$erroractionpreference = "stop"
"Kopiere Zusatzdateien für Electron nach /temp_electron ..."
xcopy *.* ..\temp_electron /s /e /y
"Starte Electron App..."
.\node_modules\.bin\electron ..\temp_electron
