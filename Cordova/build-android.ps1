$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot\..
"Übersetze Angular-App für Cordova nach /Cordova/www ..."
ng build --base-href ./ --output-path Cordova/www/
& "$PSScriptRoot\run-android.ps1"
Set-Location $lok
