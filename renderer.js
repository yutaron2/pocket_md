// Description: レンダラープロセスの処理
const { ipcRenderer } = require('electron');
const marked = require('marked');

// DOMの取得
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// エディタの初期化
editor.addEventListener('input', () => {
  const content = editor.value;
  const html = marked(content);
  preview.innerHTML = html;
  ipcRenderer.send('text-updated', content);
});

// プレビューの初期化
ipcRenderer.on('text-update', (event, content) => {
  editor.value = content;
  const html = marked(content);
  preview.innerHTML = html;
});
