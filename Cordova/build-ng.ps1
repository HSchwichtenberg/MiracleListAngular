$erroractionpreference = "stop"
$lok = Get-Location
"Uebersetze Angular-App fuer Cordova nach /Cordova/www ..."
cd $PSScriptRoot\..
ng build --base-href ./ --output-path Cordova/www/
cd $lok
