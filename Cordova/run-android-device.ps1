
"-------> Übersetzen für Cordova..."
if ((get-location).Path -like "*MLCordova*") { cd ".." } 
npm run build-cordova
"-------> Übersetzen in Cordova..."
cd MLCordova
cordova build android
"-------> Starten..."
cordova run android -device 