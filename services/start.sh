#!/bin/sh

npm run start:auth & npm run start:products & npm run start:accounts

(trap 'kill 0' SIGINT; npm run start:auth & npm run start:products & npm run start:accounts)