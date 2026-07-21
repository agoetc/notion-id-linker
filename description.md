# Notion ID Linker

## 日本語説明

**Notion ID Linker**

GitHubページ上のID（例：AAA-123、BBB-456）を、クリック可能な Notion / Backlog リンクに自動変換するChrome拡張機能です。

### 主な機能
- GitHubページ上で「AAA-123」のようなIDを自動検出
- プレフィックスごとに Notion または Backlog へのリンクを生成
  - Notion: `https://notion.so/AAA-123`
  - Backlog: `https://your-space.backlog.com/view/AAA-123`
- 複数のプロジェクトプレフィックスを設定可能
- 動的に読み込まれるコンテンツにもリアルタイムで対応
- 設定はデバイス間で自動同期

### 使い方
1. Chrome拡張機能をインストール
2. 拡張機能のポップアップを開く
3. プレフィックス（例：AAA、BBB）を追加し、リンク先（Notion / Backlog）を選択
4. Backlog を使う場合はBacklogホストを入力（例：your-space.backlog.com）
5. GitHubページを開くと、自動的にリンクが生成されます

---

## English Description

**Notion ID Linker**

This Chrome extension automatically converts issue references (e.g., AAA-123, BBB-456) into clickable Notion or Backlog links on GitHub pages.

### Key Features
- Automatically detects references like "AAA-123" on GitHub pages
- Generates a Notion or Backlog link per prefix
  - Notion: `https://notion.so/AAA-123`
  - Backlog: `https://your-space.backlog.com/view/AAA-123`
- Support for multiple project prefixes
- Real-time conversion of dynamically loaded content
- Settings sync across devices

### How to Use
1. Install the Chrome extension
2. Open the extension popup
3. Add prefixes (e.g., AAA, BBB) and choose the link target (Notion / Backlog)
4. If using Backlog, enter your Backlog host (e.g., your-space.backlog.com)
5. Visit GitHub pages and links will be generated automatically
