if ((get-location).Path -notlike "*electron*") { cd "electron" }
electron ..\temp_electron --inspect=12345 --debug-brk
