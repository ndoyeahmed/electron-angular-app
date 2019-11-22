import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import {createConnection} from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from '../nodejs-resr-api/routes';
// database connection config
createConnection({
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
}).then(connection => {
  console.log(connection);
  // Create a new express application instance
  const express1 = express();

  // Call midlewares
  express1.use(cors());
  express1.use(helmet());
  express1.use(bodyParser.json());

  // Set all routes from routes folder
  express1.use('/', routes);

  express1.listen(3000, () => {
    console.log('Server started on port 3000!');
  });

}).catch(c => console.log(c));
// end database connection config

let win: BrowserWindow;

if (handleSquirrelEvent(app)) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  // @ts-ignore
  return;
}

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  // tslint:disable-next-line:no-shadowed-variable
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  // tslint:disable-next-line:only-arrow-functions
  const spawn = function(command, args) {
    let spawnedProcess;
    let error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) {}

    return spawnedProcess;
  };

  // tslint:disable-next-line:only-arrow-functions
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
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

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/../../dist/index.html'),
      protocol: 'file',
      slashes: true
    })
  );

  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}
