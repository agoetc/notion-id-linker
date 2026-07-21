document.addEventListener('DOMContentLoaded', () => {
  const prefixList = document.getElementById('prefixList');
  const addButton = document.getElementById('addPrefix');
  const saveButton = document.getElementById('save');
  const status = document.getElementById('status');
  const backlogHostInput = document.getElementById('backlogHost');

  // プレフィックスアイテムを作成する関数
  function createPrefixItem(value = '', type = 'notion') {
    const item = document.createElement('div');
    item.className = 'prefix-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'prefix-input';
    input.value = value;
    input.placeholder = 'Enter project ID (e.g., PROJ)';

    const select = document.createElement('select');
    select.className = 'type-select';
    [['notion', 'Notion'], ['backlog', 'Backlog']].forEach(([val, label]) => {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = label;
      select.appendChild(option);
    });
    select.value = type;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => item.remove();

    item.appendChild(input);
    item.appendChild(select);
    item.appendChild(removeBtn);
    return item;
  }

  // 保存済みプレフィックスを {prefix, type} 形式に正規化（旧形式の文字列は notion 扱い）
  function normalizePrefixes(rawPrefixes) {
    return (rawPrefixes || [''])
      .map(p => (typeof p === 'string' ? { prefix: p, type: 'notion' } : { prefix: p.prefix || '', type: p.type || 'notion' }));
  }

  // 保存されている設定を読み込んでフォームに表示
  chrome.storage.sync.get(['prefixes', 'backlogHost'], (result) => {
    const configs = normalizePrefixes(result.prefixes);
    configs.forEach(c => {
      prefixList.appendChild(createPrefixItem(c.prefix, c.type));
    });
    backlogHostInput.value = result.backlogHost || '';
  });

  // 新しいプレフィックス入力欄を追加
  addButton.addEventListener('click', () => {
    prefixList.appendChild(createPrefixItem());
  });

  // 保存処理
  function saveSettings() {
    const items = document.querySelectorAll('.prefix-item');
    const prefixes = Array.from(items)
      .map(item => ({
        prefix: item.querySelector('.prefix-input').value.trim(),
        type: item.querySelector('.type-select').value
      }))
      .filter(p => p.prefix !== '');

    const backlogHost = backlogHostInput.value.trim();

    chrome.storage.sync.set({ prefixes, backlogHost }, () => {
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
