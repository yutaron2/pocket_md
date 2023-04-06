
const { remote, ipcRenderer } = require('electron');

const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

const editor = document.getElementById('editor');

const template = [
  {
    label: 'Font Size',
    submenu: [
      { label: 'Small', click: () => editor.style.fontSize = '14px' },
      { label: 'Medium', click: () => editor.style.fontSize = '16px' },
      { label: 'Large', click: () => editor.style.fontSize = '18px' }
    ]
  },
  {
    label: 'Font Color',
    submenu: [
      { label: 'Black', click: () => editor.style.color = '#000000' },
      { label: 'Red', click: () => editor.style.color = '#ff0000' },
      { label: 'Green', click: () => editor.style.color = '#008000' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

ipcRenderer.on('text-updated', (event, content) => {
  const lines = content.split('\n').length;
  const maxHeight = window.innerHeight * 0.7;
  const currentHeight = editor.clientHeight;
  if (currentHeight < maxHeight && lines > currentHeight / 30) {
    editor.style.height = `${currentHeight + 30}px`;
  }
});
