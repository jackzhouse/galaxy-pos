#!/usr/bin/expect
spawn git reset --hard HEAD
interact
spawn git checkout master
interact
spawn git pull origin master
expect "ass"
send "s0lusi2526\r"
interact
spawn npm run build
interact
spawn cp -rf dist/. /var/www/master.solusinegeri.com/html/
interact