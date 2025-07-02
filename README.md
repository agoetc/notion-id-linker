# Notion ID Linker

chrome拡張のstoreリンク
https://chromewebstore.google.com/detail/notion-id-linker/bnfabljablpgomcopdaiecaoibbndbep?authuser=0&hl=ja

**Chrome拡張機能：GitHubページでプロジェクトIDを自動的にNotion.soリンクに変換**

GitHubのイシューやプルリクエストで使用されるプロジェクトID（例：`PROJ-123`、`TASK-456`）を自動的にクリック可能なNotion.soリンクに変換するChrome拡張機能です。動的に読み込まれるコンテンツにもリアルタイムで対応します。

## ✨ 機能

- **複数プロジェクト対応**: 複数のプロジェクトプレフィックスを同時に管理
- **リアルタイム変換**: GitHubページの動的コンテンツも自動変換
- **スマート処理**: 既存のリンク内は変換せず、テキストのみを対象
- **Chrome同期**: 設定したプロジェクトIDをデバイス間で同期

## 🚀 インストール

### 開発者モード（推奨）

1. Chrome拡張機能ページを開く（`chrome://extensions/`）
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このリポジトリの`app/`ディレクトリを選択

## ⚙️ 設定

1. ブラウザツールバーの拡張機能アイコンをクリック
2. プロジェクトIDプレフィックスを追加（例：`PROJ`, `TASK`, `BUG`）
3. 「保存」をクリック

![設定画面のスクリーンショット例]

## 📖 使用方法

設定完了後、GitHubページで以下のパターンが自動的にNotion.soリンクに変換されます：

- `PROJ-123` → `https://notion.so/PROJ-123`
- `TASK-456` → `https://notion.so/TASK-456`
- `BUG-789` → `https://notion.so/BUG-789`

### 対応ページ
- GitHub Issues
- GitHub Pull Requests
- GitHub Discussions
- GitHub Code Reviews
- その他すべてのGitHubページ

## 🏗️ アーキテクチャ

### コンポーネント構成

```
app/
├── manifest.json      # Chrome拡張機能の設定
├── content.js         # メインロジック（DOM変換処理）
├── popup.html         # ポップアップUI
├── popup.js           # ポップアップ制御
├── options.html       # オプションページ（レガシー）
└── options.js         # オプション制御（レガシー）
```

### 技術仕様

- **ストレージ**: Chrome Storage Sync API
- **DOM操作**: TreeWalker + MutationObserver
- **パターンマッチング**: 正規表現 `(PREFIX1|PREFIX2|...)-\d+`
- **対象ドメイン**: `https://github.com/*`

### データフロー

1. ユーザーがポップアップでプレフィックスを設定
2. 設定がChrome Sync Storageに保存
3. コンテンツスクリプトが設定を取得し正規表現を構築
4. TreeWalkerでDOM内のテキストノードをスキャン
5. マッチしたパターンをリンクで置換
6. MutationObserverで新規コンテンツを監視

## 🔧 開発

### 開発環境セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/notion-id-linker.git
cd notion-id-linker

# Chrome拡張機能として読み込み
# chrome://extensions/ → デベロッパーモード → パッケージ化されていない拡張機能を読み込む
```

### デバッグ方法

- **コンテンツスクリプト**: GitHubページでChrome DevToolsを使用
- **ポップアップ**: 拡張機能アイコンを右クリック → 「ポップアップを検証」
- **拡張機能の更新**: `chrome://extensions/`でリロードボタンをクリック

### リリース用zipファイル作成

```bash
# appディレクトリをzipファイルにパッケージ化
zip -r notion-id-linker.zip app/
```

## 📝 ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。バグ報告や機能要望がありましたら、お気軽にお知らせください。

## 🔗 関連リンク

- [Chrome拡張機能開発ドキュメント](https://developer.chrome.com/docs/extensions/)
- [Notion.so](https://notion.so)