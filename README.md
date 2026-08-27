# MEMORIA atelier entrance site

MEMORIA atelier の入口ホームページです。

> 企業サイトではなく、MEMORIAの本を開く前の扉。

## 分離方針

- アプリ本体: `AI-RUKA/memoria-atelier`（変更しません）
- 入口ページ: `AI-RUKA/memoria-atelier-site`（このrepo）
- 公開先: GitHub Pages
- アプリへのリンク: https://memoria-atelier-hxr.netlify.app/

## ファイル

- `index.html` — 文言・セクション・アプリへのリンク
- `styles.css` — 古紙・アンティーク・扉のデザイン

外部ライブラリ、ビルド処理、アクセス解析は使用していません。

## スクリーンショットを差し替えるとき

現在は `index.html` の `.placeholder-art` が仮画像です。
実際のスクリーンショットが決まったら `assets/screenshots/` に保存し、各仮画像を `<img>` に置き換えます。

おすすめの3枚:

1. 本棚入口
2. ページ編集画面
3. 完成ページのプレビュー

公開したくない本の名前、本文、人物写真などが写らない「公開用サンプル本」を推奨します。

## 現在の状態

土台と見た目の方向性を確認するための試作版です。文言、スクリーンショット、細かな装飾は後から調整します。
