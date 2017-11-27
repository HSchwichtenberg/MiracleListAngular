$env:ANDROID_HOME="C:\Program Files (x86)\Android\android-sdk"
$env:JAVA_HOME="C:\Program Files (x86)\Java\jdk1.8.0_131"
$env:Path=$env:Path + "C:\Program Files (x86)\Android\android-sdk\tools;C:\Program Files (x86)\Android\android-sdk\platform-tools;C:\Program Files (x86)\Java\jdk1.8.0_131\bin;"
$env:Path=$env:Path + ";C:\Program Files (x86)\Gradle\bin"
$env:_JAVA_OPTIONS="-Xmx512M"
java
gradle -v
"Setze Pfad..."
if ((get-location).Path -notlike "*Cordova*") { cd Cordova }
