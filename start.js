/**
 * This file should be run using PM2
 * see process.json
 *
 * Full command:    pm2 start process.json
 */

const fs = require('fs-extra');

if(fs.existsSync('./app/server/app.js')) {
    process.env.MODE = 'prod';
    process.env.PORT = 3000;
    require('./app/server/app.js');
} else {
    console.log('Project does not exist');
}
