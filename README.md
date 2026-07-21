# Notion ID Linker

chrome拡張のstoreリンク
https://chromewebstore.google.com/detail/notion-id-linker/bnfabljablpgomcopdaiecaoibbndbep?authuser=0&hl=ja

**Chrome拡張機能：GitHubページのプロジェクトIDを自動的に Notion / Backlog リンクへ変換**

GitHubのイシューやプルリクエストで使われるプロジェクトID（例：`PROJ-123`、`TASK-456`）を、クリック可能なリンクに自動変換します。プレフィックスごとに Notion / Backlog のどちらへリンクするかを選べます。動的に読み込まれるコンテンツにもリアルタイムで対応します。

## ✨ 機能

- **プレフィックスごとにリンク先を選択**: Notion または Backlog を個別に設定
- **複数プロジェクト対応**: 複数のプレフィックスを同時に管理
- **リアルタイム変換**: GitHubページの動的コンテンツも自動変換
- **スマート処理**: 既存のリンク内は変換せず、テキストのみを対象
- **Chrome同期**: 設定をデバイス間で同期

## 🚀 インストール

1. `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このリポジトリの `app/` ディレクトリを選択

## ⚙️ 設定

拡張機能アイコンをクリックしてポップアップを開く：

1. プロジェクトIDのプレフィックスを追加（例：`PROJ`, `TASK`, `BUG`）
2. プレフィックスごとにリンク先（**Notion** / **Backlog**）を選択
3. Backlog を使う場合は **Backlog ホスト**を入力（例：`your-space.backlog.com`）
4. 「保存」をクリック

## 📖 使用方法

設定後、GitHubページ上のIDが自動的にリンクへ変換されます：

- Notion 設定のプレフィックス：`PROJ-123` → `https://notion.so/PROJ-123`
- Backlog 設定のプレフィックス：`TASK-456` → `https://your-space.backlog.com/view/TASK-456`

GitHubの全ページ（Issues / Pull Requests / Discussions など）で動作します。

## 🔧 開発

ビルドツール不要のChrome拡張機能です。

- **読み込み**: `chrome://extensions/` →「パッケージ化されていない拡張機能を読み込む」→ `app/`
- **リロード**: コード変更後、`chrome://extensions/` のリロードボタン
- **デバッグ**: コンテンツスクリプトはGitHubページのDevTools、ポップアップはアイコン右クリック →「ポップアップを検証」

実装の詳細（アーキテクチャ・データフロー・ストレージ形式）は [CLAUDE.md](CLAUDE.md) を参照。

## 📝 ライセンス

MIT License
