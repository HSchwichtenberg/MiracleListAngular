& "$PSScriptRoot\build-ng.ps1"
if (-not(test-path $PSScriptRoot\www)) {
 Write-Warning "Kein WWW-Verzeichnis vorhanden!";
 return; }
cd $PSScriptRoot
& ".\run-browser.ps1"
Set-Location $lok
