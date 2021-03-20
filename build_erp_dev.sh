#!/usr/bin/expect
spawn git reset --hard HEAD
interact
spawn git checkout master
interact
spawn git pull origin master
interact
spawn npm run build
interact
spawn cp -rf dist/. /var/www/erp/html/
interact