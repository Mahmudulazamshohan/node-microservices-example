#!/bin/sh

use admin;

db.createUser({
    user:'shohan',
    pwd:'shohan',
    roles:['roles']
})