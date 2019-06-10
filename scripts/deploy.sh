#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

echo "👉  $1"
( cd $parent_path/../client
echo "👉  building the client 🙀 ⏳"
npm run build
echo "👉  Deploying the SITE client 🙀 ⏳"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*.br" --exclude "*.gz" --exclude "*.json" --cache-control "max-age=31536000"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*" --include "*.js.gz" --content-type "application/javascript" --content-encoding "gzip" --cache-control "max-age=31536000"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*" --include "*.js.br" --content-type "application/x-compressed" --content-encoding "br" --cache-control "max-age=31536000"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*" --include "*.html.gz" --content-type "text/html" --content-encoding "gzip" --cache-control "max-age=31536000"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*" --include "*.html.br" --content-type "text/html" --content-encoding "gzip" --cache-control "max-age=31536000"
aws s3 sync ./build s3://saeedezzati.com/ --exclude "*" --include "*.json")
echo "👉 New https://saeedezzati.com is deployed 🍭🍭"

