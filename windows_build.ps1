$install_command = "npm install"
$build_command = "npm run build"
cd .\Backend 
iex $install_command
if ($?) {
    echo "NPM INSTALLED SUCCESSFULLY"
} else {
    echo "NPM INSTALL FAILED"
    exit -1
}
cd ..
cd Frontend
iex $install_command
if ($?) {
    echo "NPM INSTALLED SUCCESFULLY"
} else {
    echo "NPM INSTALL FAILED"
    exit -1
}
iex $build_command
if ($?) {
    echo "NPM BUILDED SUCCESSFULLY"
} else {
    echo "NPM BUILD FAILED"
    exit -1
}
cd ..
$init_db = Read-Host "Do you want to init database? [Y/N]"
if ($init_db -eq "Y") {
    iex "powershell init_db.ps1"
}
echo "Everything is done"