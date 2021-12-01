#!/bin/sh
cd fontend && npm run build
cd ../
cp -a ./fontend/build ./nginx/build 