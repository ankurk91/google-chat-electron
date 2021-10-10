; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!
; http://www.jrsoftware.org/isinfo.php

; {{ }} will be replaced at runtime by js

#define AppId "{E458AEFA-2577-4543-8554-F6335BC2D994}"
#define AppName "Google Chat Electron"
#define AppVersion "{{appVersion}}"
#define AppPublisher "ankurk91"
#define AppURL "https://github.com/ankurk91/google-chat-electron"
#define AppExeName "google-chat-electron.exe"
#define OutputBaseFilename "google-chat-electron-setup-win-x64-{{appVersion}}"
#define OutputDir "../dist/installers"
#define AppSourceDir "../dist/google-chat-electron-win32-x64/*"


[Setup]
AppId={{#AppId}
AppName={#AppName}
AppVersion={#AppVersion}
VersionInfoVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL={#AppURL}
AppSupportURL={#AppURL}
AppUpdatesURL={#AppURL}
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
DefaultDirName={autopf}\{#AppName}
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
DisableStartupPrompt=yes
Compression=lzma2
SolidCompression=yes
SetupIconFile=setup-icon.ico
SetupLogging=yes
UninstallDisplayIcon={app}\{#AppExeName}
LicenseFile=../LICENSE.txt
PrivilegesRequired=admin
OutputBaseFilename={#OutputBaseFilename}
OutputDir = {#OutputDir}
DisableDirPage=auto
WizardStyle=modern

[Languages]

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: {#AppSourceDir}; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{group}\{cm:UninstallProgram,{#AppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#AppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(AppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Registry]

[UninstallDelete]

[UninstallRun]

