#!/bin/sh
rm -rf ../../results/*

npm install
npm run run_cypress_test_dev
r=$?
npm run merged_and_generate_test_report || exit 1

exit ${r}