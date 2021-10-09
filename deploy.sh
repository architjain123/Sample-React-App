#! /bin/bash
rm -rf ./build
npm run-script build
find /var/www/econ.architjain123.com -maxdepth 1 -type f -delete
rm -rf /var/www/econ.architjain123.com/static
cp -r ./build/* /var/www/econ.architjain123.com/