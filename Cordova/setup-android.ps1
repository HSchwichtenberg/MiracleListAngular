
[Environment]::SetEnvironmentVariable("ANDROID_HOME","C:\Program Files (x86)\Android\android-sdk","User")
[Environment]::SetEnvironmentVariable("JAVA_HOME","C:\Program Files (x86)\Java\jdk1.8.0_131","User")
[Environment]::SetEnvironmentVariable("Path",$env:Path + "C:\Program Files (x86)\Android\android-sdk\tools;C:\Program Files (x86)\Android\android-sdk\platform-tools;C:\Program Files (x86)\Java\jdk1.8.0_131\bin;C:\Program Files (x86)\Gradle\bin","User")
[Environment]::SetEnvironmentVariable("_JAVA_OPTIONS","-Xmx512M","User")
java
gradle -v
