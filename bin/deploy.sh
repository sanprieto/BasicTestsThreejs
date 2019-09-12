#!/bin/bash
rsync -avz --delete dist/ ovh:/var/www/demos/"${1}"
