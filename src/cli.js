#!/usr/bin/env node
const mdCli = require('../src/Md-cli.js')

const path = process.argv[2]; // path
const validateRt = process.argv[3]; // options | validate
const validateRt1 = process.argv[4]; // validate

mdCli.mdLinksFunction(path, validateRt, validateRt1)
   .then((resp) => {
       console.log(resp);
   });