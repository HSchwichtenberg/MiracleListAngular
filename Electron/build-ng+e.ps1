$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot\..
"Übersetze Angular-App für Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
Set-Location $lok
.\build-e.ps1
