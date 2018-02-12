$erroractionpreference = "stop"
$lok = Get-Location
& "$PSScriptRoot\build-ng.ps1"
if (-not(test-path $PSScriptRoot\www)) {
 Write-Warning "Kein WWW-Verzeichnis vorhanden!";
 return; }
& "$PSScriptRoot\run-android.ps1"
Set-Location $lok
