#! /usr/bin/env node

const { spawn } = require('child_process');

spawn(require.resolve('husky/bin/install'), [], { stdio: 'inherit' });
