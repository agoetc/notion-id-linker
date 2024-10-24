document.addEventListener('DOMContentLoaded', () => {
  // 保存されているプレフィックスを読み込んでフォームに表示
  chrome.storage.sync.get(['prefix'], (result) => {
    document.getElementById('prefix').value = result.prefix || '';
  });

  // 保存ボタンのクリックイベントを処理
  document.getElementById('save').addEventListener('click', () => {
    const prefix = document.getElementById('prefix').value;
    // プレフィックスをChromeストレージに保存
    chrome.storage.sync.set({ prefix }, () => {
      const status = document.getElementById('status');
      // 保存完了メッセージを表示
      status.style.display = 'block';
      // 2秒後にメッセージを非表示
      setTimeout(() => {
        status.style.display = 'none';
      }, 2000);
    });
  });
});