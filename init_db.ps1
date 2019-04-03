$pass = Read-Host 'What is your mysql password for root user?' -AsSecureString
$pass = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pass))

try {
	if($pass -eq ""){
		Get-Content ./Backend/SQL/generate_db.sql | mysql -u root
		Get-Content ./Backend/SQL/insert_data.sql | mysql -u root
	} else {
		Get-Content ./Backend/SQL/generate_db.sql | mysql -u root -p$pass
		Get-Content ./Backend/SQL/insert_data.sql | mysql -u root -p$pass
	}
} catch {
	echo "Mysql is not set to the path or not installed!"
	exit -1
}
