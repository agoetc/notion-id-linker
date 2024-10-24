// Notion リンク変換のメイン関数
function convertToNotionLinks(node) {
  // ストレージから設定済みのプレフィックスを取得
  chrome.storage.sync.get(['prefix'], (result) => {
    const prefix = result.prefix || '';
    if (!prefix) return;

    // プレフィックスと数字のパターンを作成（例：PROJ-123）
    const pattern = new RegExp(`(${prefix}-\\d+)`, 'g');

    // DOM内のテキストノードを走査するためのTreeWalkerを作成
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // すでにリンクの中にある場合は変換しない
          if (node.parentElement.tagName === 'A') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    // 変換が必要なノードを収集
    const nodesToReplace = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
      if (pattern.test(currentNode.textContent)) {
        nodesToReplace.push(currentNode);
      }
    }

    // 収集したノードを順番に処理
    nodesToReplace.forEach(textNode => {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      const text = textNode.textContent;
      let match;

      pattern.lastIndex = 0;
      while ((match = pattern.exec(text)) !== null) {
        // マッチした部分の前にあるテキストを追加
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }

        // マッチした部分をNotionリンクに変換
        const link = document.createElement('a');
        link.href = `https://notion.so/${match[0]}`;
        link.textContent = match[0];
        link.target = '_blank';
        link.style.color = '#0366d6';
        link.style.textDecoration = 'underline';
        fragment.appendChild(link);

        lastIndex = pattern.lastIndex;
      }

      // 残りのテキストを追加
      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      // 元のテキストノードを変換後のフラグメントで置き換え
      textNode.parentNode.replaceChild(fragment, textNode);
    });
  });
}

// ページ読み込み時に初期変換を実行
convertToNotionLinks(document.body);

// DOM変更の監視を設定
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // 新しく追加された要素に対して変換を実行
      if (node.nodeType === Node.ELEMENT_NODE) {
        convertToNotionLinks(node);
      }
    });
  });
});

// body要素の変更を監視開始
observer.observe(document.body, {
  childList: true,
  subtree: true
});