if (-not (test-path $PSScriptRoot\..\temp_electron\node_modules))
{
 "Erstelle Junction für Node-Module..."
 New-Item -ItemType Junction -Name node_modules -Value $PSScriptRoot\node_modules -Path $PSScriptRoot\..\temp_electron
}

rd ..\temp_electron\*.* -force -Recurse

"<html>Hello world!<button onclick='alert(""Hello"")'>Click!</button></html>" | Set-Content $PSScriptRoot\..\temp_electron\index.html
