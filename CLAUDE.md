# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GitHubのイシュー参照（例：AAA-123、BBB-456）を自動的にクリック可能なNotion.soリンクに変換するChrome拡張機能です。GitHubページで動作し、動的に読み込まれるコンテンツもリアルタイムで変換します。

## アーキテクチャ

### 主要コンポーネント

- **コンテンツスクリプト** (`app/content.js`): DOMをスキャンしてパターンをNotionリンクに変換するメイン機能
- **ポップアップUI** (`app/popup.html` + `app/popup.js`): 複数のプロジェクトプレフィックスを管理するプライマリUI
- **オプションページ** (`app/options.html` + `app/options.js`): 単一プレフィックス設定用のレガシーコード（未使用）
- **マニフェスト** (`app/manifest.json`): Chrome拡張機能の設定

### 実装の詳細

- Chrome Storage Sync APIを使用してプロジェクトプレフィックスをデバイス間で同期
- 既存のリンクを避けながら効率的なDOM走査にTreeWalkerを使用
- GitHubの動的コンテンツに対応するためMutationObserverを実装
- パターンマッチング: `(PREFIX1|PREFIX2|...)-\d+` 形式
- マッチを `https://notion.so/MATCH` 形式に変換

### データフロー

1. ユーザーがポップアップUIでプロジェクトプレフィックスを設定
2. プレフィックスが配列としてChrome sync storageに保存
3. コンテンツスクリプトがプレフィックスを取得し正規表現パターンを構築
4. TreeWalkerを使用してDOMをマッチングスキャン
5. マッチしたテキストノードがリンクを含むドキュメントフラグメントで置換
6. MutationObserverが新しいコンテンツを監視し変換を繰り返し

## 開発コマンド

ビルドツールなしのChrome拡張機能のため：

- **拡張機能の読み込み**: Chrome Extensions → Developer mode → Load unpacked → `app/` ディレクトリを選択
- **拡張機能のリロード**: コード変更後、Chrome Extensionsでリロードボタンをクリック
- **コンテンツスクリプトのデバッグ**: GitHubページでChrome DevToolsを使用
- **ポップアップのデバッグ**: 拡張機能アイコンを右クリック → Inspect popup

## コードの不整合点

- `popup.js`は`prefixes`配列ストレージを使用、`options.js`は単一の`prefix`文字列を使用
- `options.js`は削除または更新すべきレガシーコード
- `content.js`は日本語コメント、READMEは英語