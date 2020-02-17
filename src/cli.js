#!/usr/bin/env node
const mdCli = require('../src/Md-cli.js')

const path = process.argv[2];
const validateRt = process.argv[3];
const validateRt1 = process.argv[4];

mdCli.mdLinksFunction(path, validateRt, validateRt1);