$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot
"Kopiere package.json für Electron-Main-Process..."
copy-item .\package.json ..\temp_electron -Force -Verbose
"Kopiere JS/TS für Electron-Main-Process..."
copy-item src\* ..\temp_electron -Force -Verbose -Recurse

if (-not (test-path $PSScriptRoot\..\temp_electron\node_modules))
{
 "Erstelle Junction für Node-Module..."
 New-Item -ItemType Junction -Name node_modules -Value $PSScriptRoot\node_modules -Path $PSScriptRoot\..\temp_electron
}
else
 {
  "Junction für Node-Module ist vorhanden!"
 }

cd $lok
