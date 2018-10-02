$erroractionpreference = "stop"
$lok = Get-Location
cd $PSScriptRoot\..

if ((test-path $PSScriptRoot\..\temp_electron\node_modules))
{
 "Entferne Junction fuer node_modules"
 $Directory = Get-Item $PSScriptRoot\..\temp_electron\node_modules
 $Directory.FullName
$Directory.Delete()
}

"Uebersetze Angular-App fuer Electron nach /temp_electron ..."
ng build --output-path=temp_electron --base-href .
Set-Location $lok
& "$PSScriptRoot\copy+run.ps1"
