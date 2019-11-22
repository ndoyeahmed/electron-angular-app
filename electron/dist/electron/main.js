"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var cors = require("cors");
var routes_1 = require("../nodejs-resr-api/routes");
// database connection config
typeorm_1.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'foo',
    password: 'bar',
    database: 'test_nodejs',
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: [
        'electron/dist/src/app/models/*.js'
    ],
    migrations: [
        'src/migration/**/*.js'
    ],
    subscribers: [
        'src/subscriber/**/*.js'
    ]
}).then(function (connection) {
    console.log(connection);
    // Create a new express application instance
    var express1 = express();
    // Call midlewares
    express1.use(cors());
    express1.use(helmet());
    express1.use(bodyParser.json());
    // Set all routes from routes folder
    express1.use('/', routes_1.default);
    express1.listen(3000, function () {
        console.log('Server started on port 3000!');
    });
}).catch(function (c) { return console.log(c); });
// end database connection config
var win;
if (handleSquirrelEvent(electron_1.app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    // @ts-ignore
    return;
}
function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }
    var ChildProcess = require('child_process');
    // tslint:disable-next-line:no-shadowed-variable
    var path = require('path');
    var appFolder = path.resolve(process.execPath, '..');
    var rootAtomFolder = path.resolve(appFolder, '..');
    var updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    var exeName = path.basename(process.execPath);
    // tslint:disable-next-line:only-arrow-functions
    var spawn = function (command, args) {
        var spawnedProcess;
        var error;
        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        }
        catch (error) { }
        return spawnedProcess;
    };
    // tslint:disable-next-line:only-arrow-functions
    var spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };
    var squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus
            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers
            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(application.quit, 1000);
            return true;
        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated
            application.quit();
            return true;
    }
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/../../dist/index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('close', function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map