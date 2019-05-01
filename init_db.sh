#!/bin/bash

# Read Password
echo -n "What is your mysql password for root user? "
read -s password

cd Backend/SQL

if [ $password = "" ]
then
  mysql -u root < generate_db.sql
  mysql -u root < insert_data.sql
else
  mysql -u root -p$password < generate_db.sql
  mysql -u root -p$password < insert_data.sql
fi
