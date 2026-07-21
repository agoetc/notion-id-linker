// 正規表現用に文字列をエスケープ
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 保存済みプレフィックスを {prefix, type} 形式に正規化（旧形式の文字列は notion 扱い）
function normalizePrefixes(rawPrefixes) {
  return (rawPrefixes || [])
    .map(p => (typeof p === 'string' ? { prefix: p, type: 'notion' } : { prefix: p.prefix, type: p.type || 'notion' }))
    .filter(c => c.prefix);
}

// Backlogホストを正規化（プロトコル・末尾スラッシュを除去）
function normalizeBacklogHost(host) {
  return (host || '').trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

// マッチしたテキストがどのプレフィックス設定に該当するか判定（重複時は最長プレフィックス優先）
function findConfigForMatch(matchText, configs) {
  let best = null;
  for (const c of configs) {
    const re = new RegExp(`^${escapeRegex(c.prefix)}(?:-SUB)?-\\d+$`);
    if (re.test(matchText) && (!best || c.prefix.length > best.prefix.length)) {
      best = c;
    }
  }
  return best;
}

// マッチ文字列とその設定からリンク先URLを組み立てる（生成不可なら null）
function buildHref(matchText, config, backlogHost) {
  if (!config) return null;
  if (config.type === 'backlog') {
    if (!backlogHost) return null; // ホスト未設定なら変換しない
    return `https://${backlogHost}/view/${matchText}`;
  }
  return `https://notion.so/${matchText}`;
}

// リンク変換のメイン関数
function convertToLinks(node) {
  // ストレージから設定を取得
  chrome.storage.sync.get(['prefixes', 'backlogHost'], (result) => {
    const configs = normalizePrefixes(result.prefixes);
    if (configs.length === 0) return;

    const backlogHost = normalizeBacklogHost(result.backlogHost);

    // すべてのプレフィックスを含むパターンを作成（例：(AAA|BBB|PROJ)-\d+、AAA-SUB-\d+）
    const prefixPattern = configs.map(c => escapeRegex(c.prefix)).join('|');
    const pattern = new RegExp(`((?:${prefixPattern})(?:-SUB)?-\\d+)`, 'g');

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

        // マッチした部分を該当する種別のリンクに変換
        const config = findConfigForMatch(match[0], configs);
        const href = buildHref(match[0], config, backlogHost);

        if (href) {
          const link = document.createElement('a');
          link.href = href;
          link.textContent = match[0];
          link.target = '_blank';
          link.style.color = '#0366d6';
          link.style.textDecoration = 'underline';
          fragment.appendChild(link);
        } else {
          // リンク生成不可（Backlogホスト未設定など）はテキストのまま
          fragment.appendChild(document.createTextNode(match[0]));
        }

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
convertToLinks(document.body);

// DOM変更の監視を設定
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      // 新しく追加された要素に対して変換を実行
      if (node.nodeType === Node.ELEMENT_NODE) {
        convertToLinks(node);
      }
    });
  });
});

// body要素の変更を監視開始
observer.observe(document.body, {
  childList: true,
  subtree: true
});
