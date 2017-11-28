$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot
"Kopiere package.json für Electron-Main-Process..."
copy-item .\package.json ..\temp_electron -Force -Verbose
"Kopiere JS/TS für Electron-Main-Process..."
copy-item src\* ..\temp_electron -Force -Verbose
cd $lok
