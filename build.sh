#!/bin/bash

#############
# COLORS:  #
############

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # no color


echo -e "Running npm install in Frontend\n"

sleep 1

cd Frontend/ && npm install

IS_FAILED=$?

if [[ $IS_FAILED -ne 0 ]]
then
    
    echo -e "${RED}Error while npm install! ${NC}" 1>&2
    echo -e "${RED}Build stop, exiting! ${NC} \n" 1>&2
    exit

fi

sleep 1

echo -e "${GREEN}Frontend install finished!\n${NC}"

sleep 3

echo -e "\nRunning build in Frontend\n"

sleep 1

npm run build

IS_FAILED=$?

if [[ $IS_FAILED -ne 0 ]]
then
    
    echo -e "${RED}Error while npm build! ${NC}" 1>&2
    echo -e "${RED}Build stop, exiting! ${NC} \n" 1>&2
    exit

fi

sleep 1

echo -e "${GREEN}\nFrontend build finished!\n${NC}"

sleep 3

echo -e "Running npm install in backend\n"

cd ..

cd Backend/ && npm install

IS_FAILED=$?

if [[ $IS_FAILED -ne 0 ]]
then
    
    echo -e "${RED}Error while npm install ${NC}" 1>&2
    echo -e "${RED}Build stop, exiting!\n ${NC}" 1>&2
    exit

fi

echo -e "${GREEN}Backend install finished!\n ${NC}"

sleep 2

echo -e "${GREEN}All build and install finished!\n${NC}"