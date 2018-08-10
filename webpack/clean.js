const fs = require('fs-extra');
const path = require('path');
const buildDir = path.resolve(__dirname + '/../build');
const appDir = path.resolve(__dirname + '/../app');
const chalk = require('chalk');
fs.remove(buildDir)
    .then(() => {
        console.log(chalk.green('Build directory cleared\n'), buildDir);
    })
    .catch(err => {
        console.log(chalk.red('Error clearing build directory'));
        console.error(err);
    });

fs.remove(appDir)
    .then(() => {
        console.log(chalk.green('App directory cleared\n'), appDir);
    })
    .catch(err => {
        console.log(chalk.red('Error clearing app directory'));
        console.error(err);
    });
