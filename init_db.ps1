try {
	cd Backend
	cd SQL
    iex "mysql -h manager_maximus -u manager_maximus -p 3Pi14159265 manager_maximus < generate_db.sql"
    iex "mysql -h manager_maximus -u manager_maximus -p 3Pi14159265 manager_maximus < insert_data.sql"
} catch {
    echo "Mysql is not set to the path or not installed!"
    exit -1
}