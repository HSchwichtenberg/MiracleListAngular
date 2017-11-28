$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot\..
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
Set-Location $lok
"Erstelle Junction für Node-Module..."
New-Item -ItemType Junction -Name node_modules -Value $PSScriptRoot\node_modules -Path $PSScriptRoot\..\temp_electron
.\build-e.ps1
