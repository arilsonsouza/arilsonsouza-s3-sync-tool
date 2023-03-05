/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  IpcMainEvent,
  dialog,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const { exec, spawn } = require('child_process');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const execSpawnCommand = (
  event: IpcMainEvent,
  channel: string,
  command: string,
  args: string[]
) => {
  const ls = spawn(command, args);
  ls.stdout.on('data', (data) => {
    event.reply(`${channel}-stdout`, `${data}`);
  });

  ls.stderr.on('data', (data) => {
    event.reply(`${channel}-stderr`, `${data}`);
  });

  ls.on('error', (error) => {
    event.reply(`${channel}-error`, error.message);
  });

  ls.on('close', (code) => {
    event.reply(`${channel}-close`, code);
  });
};

const execCommand = (event: IpcMainEvent, channel: string, command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.reply(`${channel}-error`, error.message);
      return;
    }
    if (stderr) {
      event.reply(`${channel}-stderr`, `${stderr}`.trim());
      return;
    }
    event.reply(`${channel}-stdout`, `${stdout}`.trim());
  });
};

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('dialog:openFolder', async (event, arg) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled) {
    event.reply('dialog:openFolder', '');
  } else {
    event.reply('dialog:openFolder', filePaths[0]);
  }
});

ipcMain.on('s3-ls', async (event, arg) => {
  execCommand(event, 's3-ls', 'aws s3 ls');
});

ipcMain.on('s3-bucket-stats', async (event, bucketName) => {
  execCommand(
    event,
    's3-bucket-stats',
    `aws s3 ls --summarize --human-readable --recursive s3://${bucketName}`
  );
});

ipcMain.on('s3-bucket-sync', async (event, syncArgs) => {
  execSpawnCommand(event, 's3-bucket-sync', 'aws', syncArgs);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
