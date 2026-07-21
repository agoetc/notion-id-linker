# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GitHubのイシュー参照（例：AAA-123、BBB-456）を自動的にクリック可能なリンクに変換するChrome拡張機能です。プレフィックスごとに Notion または Backlog のどちらへリンクするかを選べます。GitHubページで動作し、動的に読み込まれるコンテンツもリアルタイムで変換します。

## アーキテクチャ

### 主要コンポーネント

- **コンテンツスクリプト** (`app/content.js`): DOMをスキャンしてパターンをリンクに変換するメイン機能
- **ポップアップUI** (`app/popup.html` + `app/popup.js`): プレフィックス・リンク先種別・Backlogホストを管理するUI
- **マニフェスト** (`app/manifest.json`): Chrome拡張機能の設定（Manifest V3）

### 実装の詳細

- Chrome Storage Sync APIで設定をデバイス間同期
- 既存のリンクを避けながら効率的なDOM走査にTreeWalkerを使用
- GitHubの動的コンテンツに対応するためMutationObserverを実装
- パターンマッチング: `(PREFIX1|PREFIX2|...)(-SUB)?-\d+` 形式
- マッチを種別に応じて変換:
  - Notion: `https://notion.so/MATCH`
  - Backlog: `https://{backlogHost}/view/MATCH`（ホスト未設定時は変換せずテキストのまま）

### ストレージ形式

- `prefixes`: `{ prefix: string, type: 'notion' | 'backlog' }` の配列
- `backlogHost`: Backlogのホスト名（例：`your-space.backlog.com`。`https://` や末尾スラッシュは正規化）
- 後方互換: 旧形式（文字列の配列）は読み込み時に `type: 'notion'` として正規化

### データフロー

1. ユーザーがポップアップでプレフィックス・リンク先種別・Backlogホストを設定
2. 設定が配列としてChrome sync storageに保存
3. コンテンツスクリプトが設定を取得し正規表現パターンを構築
4. TreeWalkerを使用してDOMをマッチングスキャン
5. マッチしたテキストノードを、種別に応じたリンクを含むドキュメントフラグメントで置換
6. MutationObserverが新しいコンテンツを監視し変換を繰り返し

## 開発コマンド

ビルドツールなしのChrome拡張機能のため：

- **拡張機能の読み込み**: Chrome Extensions → Developer mode → Load unpacked → `app/` ディレクトリを選択
- **拡張機能のリロード**: コード変更後、Chrome Extensionsでリロードボタンをクリック
- **コンテンツスクリプトのデバッグ**: GitHubページでChrome DevToolsを使用
- **ポップアップのデバッグ**: 拡張機能アイコンを右クリック → Inspect popup
