# MiracleList-Client als Docker-Container

$ImageName = "itvisions/miraclelistclient:WindowsServerCore_v0.6" # repository name must be lowercase
$ImageNameLatest = "itvisions/miraclelistclient:latest" # repository name must be lowercase
$Containername = "MiracleList"

get-container | where names -like "/miracle*" | Remove-Container
get-containerimage | where repotags -like "*miracle*" | Remove-ContainerImage
# Container erstellen
docker run -d -p 8111:80 --name $Containername  microsoft/iis

# Container Inhalt
docker exec $Containername  cmd /c del C:\inetpub\wwwroot\*.* /q
$Quelle = "H:\MiracleListClient\dist\*"
$containerID = (Get-container $Containername ).ID # oder  $containerID= docker inspect --format="{{.Id}}" IIS1
$session = New-PSSession -ContainerId $containerID -RunAsAdministrator
Copy-Item -ToSession $session $Quelle -Destination C:\inetpub\wwwroot -Recurse -Force -verbose

explorer http://localhost:8111

# windows does not support commit of a running container
docker stop $Containername

# Image erstellen
docker commit $Containername $ImageName 
docker tag $ImageName $ImageNameLatest

# Veröffentlichen
docker login
docker push $ImageName 
docker push $ImageNameLatest 
