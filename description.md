# Notion ID Linker

## 日本語説明

**Notion ID Linker**

このChrome拡張機能は、GitHubページでID（例：AAA-123、BBB-456）を自動的にクリック可能なNotion.soリンクに変換します。

### 主な機能
- GitHubページ上で「AAA-123」のようなIDを自動検出
- それらを `https://notion.so/AAA-123` のようなクリック可能なリンクに変換
- 複数のプロジェクトプレフィックスを設定可能
- 動的に読み込まれるコンテンツにもリアルタイムで対応
- 設定はデバイス間で自動同期

### 使い方
1. Chrome拡張機能をインストール
2. 拡張機能のポップアップを開く
3. プロジェクトプレフィックス（例：AAA、BBB、PROJECT）を追加
4. GitHubページを開くと、自動的にリンクが生成されます

### 設定例
プレフィックス「AAA」「BBB」を設定した場合：
- `AAA-123` → `https://notion.so/AAA-123` にリンク
- `BBB-456` → `https://notion.so/BBB-456` にリンク

---

## English Description

**Notion ID Linker**

This Chrome extension automatically converts issue references (e.g., AAA-123, BBB-456) into clickable Notion.so links on GitHub pages.

### Key Features
- Automatically detects project references like "AAA-123" on GitHub pages
- Converts them into clickable links to `https://notion.so/AAA-123`
- Support for multiple project prefixes
- Real-time conversion of dynamically loaded content
- Settings sync across devices

### How to Use
1. Install the Chrome extension
2. Open the extension popup
3. Add project prefixes (e.g., AAA, BBB, PROJECT)
4. Visit GitHub pages and links will be automatically generated

### Example Setup
With prefixes "AAA" and "BBB" configured:
- `AAA-123` → Links to `https://notion.so/AAA-123`
- `BBB-456` → Links to `https://notion.so/BBB-456`