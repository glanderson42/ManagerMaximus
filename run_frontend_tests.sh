#!/bin/bash

echo -e "Running frontend tests...\n"

cd testing
echo -e "Running routing tests...\n"
python3 -W ignore::DeprecationWarning routing_tests.py