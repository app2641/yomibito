#! /bin/sh
. ./credential
tmp_js='/tmp/main.js'
echo "/* Yomibito https://github.com/app2641/yomibito */" > $tmp_js
echo "/* Version {VERSION} */" | sed -e "s/{VERSION}/`head VERSION`/g" >> $tmp_js
echo "/* (c) app2641 2017- License: MIT */" >> $tmp_js
echo "/* ------------------- */" >> $tmp_js
cat src/*.js >> $tmp_js
cat $tmp_js | sed -e "s/{YAHOO_APPLICATION_ID}/$YAHOO_APPLICATION_ID/g" \
    -e "s/{YOMIBITO_SLACK_HOOKS_URL}/$YOMIBITO_SLACK_HOOKS_URL/g" > dest/main.js

while getopts u OPT
do
    case $OPT in
        'u' ) gapps upload;
    esac
done

echo 'done!'
