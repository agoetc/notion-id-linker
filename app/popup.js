document.addEventListener('DOMContentLoaded', () => {
  const prefixList = document.getElementById('prefixList');
  const addButton = document.getElementById('addPrefix');
  const saveButton = document.getElementById('save');
  const status = document.getElementById('status');

  // プレフィックスアイテムを作成する関数
  function createPrefixItem(value = '') {
    const item = document.createElement('div');
    item.className = 'prefix-item';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'prefix-input';
    input.value = value;
    input.placeholder = 'Enter project ID (e.g., PROJ)';
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => item.remove();
    
    item.appendChild(input);
    item.appendChild(removeBtn);
    return item;
  }

  // 保存されているプレフィックスを読み込んでフォームに表示
  chrome.storage.sync.get(['prefixes'], (result) => {
    const prefixes = result.prefixes || [''];
    prefixes.forEach(prefix => {
      prefixList.appendChild(createPrefixItem(prefix));
    });
  });

  // 新しいプレフィックス入力欄を追加
  addButton.addEventListener('click', () => {
    prefixList.appendChild(createPrefixItem());
  });

  // 保存処理
  function saveSettings() {
    const inputs = document.querySelectorAll('.prefix-input');
    const prefixes = Array.from(inputs)
      .map(input => input.value.trim())
      .filter(value => value !== '');

    chrome.storage.sync.set({ prefixes }, () => {
      status.style.display = 'block';
      setTimeout(() => {
        status.style.display = 'none';
        window.close();
      }, 1500);
    });
  }

  // 保存ボタンのクリックイベントを処理
  saveButton.addEventListener('click', saveSettings);

  // Enterキーでも保存できるようにする
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveSettings();
    }
  });
});