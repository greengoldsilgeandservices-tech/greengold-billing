const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// App ka naam
app.name = 'Green Gold Billing';

function createWindow() {
  // Main window banana
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Green Gold Silage — Billing Software v1.0',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false, // pehle hide rakho
    backgroundColor: '#f0f2f5'
  });

  // HTML file load karo
  mainWindow.loadFile(path.join(__dirname, 'src', 'GreenGoldBilling.html'));

  // Jab ready ho tab dikhao (white flash nahi hoga)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Simple menu - sirf zaroori options
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print',
          accelerator: 'Ctrl+P',
          click: () => mainWindow.webContents.print()
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'Alt+F4',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'Ctrl+=',
          click: () => {
            const zoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(zoom + 0.1);
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'Ctrl+-',
          click: () => {
            const zoom = mainWindow.webContents.getZoomFactor();
            mainWindow.webContents.setZoomFactor(zoom - 0.1);
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'Ctrl+0',
          click: () => mainWindow.webContents.setZoomFactor(1.0)
        },
        { type: 'separator' },
        {
          label: 'Full Screen',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Green Gold Silage v1.0',
          enabled: false
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App ready hone par window banao
app.whenReady().then(() => {
  createWindow();
});

// Sab windows band ho jaye to app quit karo (Windows/Linux)
app.on('window-all-closed', () => {
  app.quit();
});
