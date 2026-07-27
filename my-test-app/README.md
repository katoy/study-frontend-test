# my-test-app (study-frontend-test)

[![CI/CD to GitHub Pages](https://github.com/katoy/study-frontend-test/actions/workflows/deploy.yml/badge.svg)](https://github.com/katoy/study-frontend-test/actions/workflows/deploy.yml)

React v19、TypeScript、Vite v8 を使用したモダンなフロントエンド学習・テスト用アプリケーションです。

🚀 **デプロイ先 (GitHub Pages):** [https://katoy.github.io/study-frontend-test/my-test-app/](https://katoy.github.io/study-frontend-test/my-test-app/)

---

## 目次

- [操作デモ（アニメーション）](#操作デモアニメーション)
- [画面遷移・状態遷移](#画面遷移状態遷移)
- [機能詳細](#機能詳細)
- [環境要件・技術スタック](#環境要件技術スタック)
- [デプロイ方針](#デプロイ方針)
- [CI/CD パイプライン](#cicd-パイプライン)
- [Storybook & TurboSnap](#storybook--turbosnap)
- [MSW (Mock Service Worker)](#msw-mock-service-worker)
- [VRT (Visual Regression Testing)](#vrt-visual-regression-testing)
- [インストール・セットアップ](#インストールセットアップ)
- [主要コマンド](#主要コマンド)
- [ディレクトリ構造](#ディレクトリ構造)
- [開発ガイド](#開発ガイド)
- [品質保証とコード検証](#品質保証とコード検証)
- [トラブルシューティング](#トラブルシューティング)
- [ライセンス](#ライセンス)

---

## 操作デモ（アニメーション）

![デモ動作](screenshots/demo_animation.gif)

**主な操作フロー:**

1. アプリケーションを起動すると、Vite/Reactのブランドロゴとウェルカムセクションが表示されます。
2. 画面中央の「Count is X」ボタンをクリックすると、カウンターの状態（State）が動的にインクリメントされます。
3. 画面下部には、Vite/React의 公式ドキュメントへのリンク、およびコミュニティ（GitHub, Discord, X, Bluesky）へのリンクが設置されています。

> [!TIP]
> 操作デモの自動撮影と高品質GIFへの変換技術は、[browser-tests スキス](file:///Users/katoy/.gemini/config/skills/browser-tests/SKILL.md)にテンプレートが定義されています。

---

## 画面遷移・状態遷移

単一の SPA（Single Page Application）構成であり、ボタン操作によってインタラクティブに状態（State）が遷移します。

```mermaid
flowchart TD
    classDef public fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef action fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#15803d;

    Init(["初期画面 (/) - Count: 0"]) --> Click["『Count is X』ボタンをクリック"]
    Click --> Increment["Count を 1 加算 (React State 更新)"]
    Increment --> Init

    class Init public;
    class Click action;
    class Increment action;
```

---

## 機能詳細

- **React 19 + Vite 8 HMR (Hot Module Replacement)**
  - コード編集時にブラウザをリロードすることなく、即座に変更が反映される開発環境を提供します。
- **インタラクティブなカウンター機能**
  - React の `useState` フックを用いた、基本かつ高速な状態管理デモ。
- **充実した関連リンク集**
  - Vite/React 公式リソースへのクイックアクセスや、Discord/Bluesky などのソーシャルメディアコミュニティへのリンク。
- **厳格な品質管理ツールチェーン**
  - ESLint、Stylelint、Prettier、さらに Rust 製の超高速リンター・フォーマッターである **Biome** を統合し、コードの品質と一貫性を自動的に担保します。
- **カスタムフックのテスト環境 (renderHook)**
  - `@testing-library/react` に統合されている `renderHook` および `act` を用いて、コンポーネントを介さずにカスタムフックを直接テストできます。
- **Storybook コンポーネントカタログ & テスト (Vitest Integration)**
  - UI コンポーネントを隔離環境で開発し、Storybook のストーリー（Stories）をそのまま Vitest のテストとしてブラウザ上でテスト実行できます。
- **TurboSnap による高速なビジュアルテスト準備**
  - Viteビルド時に Git 変更差分に基づいた依存関係グラフ `preview-stats.json` を出力し、Chromatic等での不要なスナップショットテストを自動スキップできます。
- **MSW (Mock Service Worker) による API モック環境**
  - ネットワークリクエストを Service Worker レベルでインターセプトし、テスト（Vitest）やカタログ表示（Storybook）において一貫したモック API レスポンスを提供します。

---

## 環境要件・技術スタック

### 必要要件

- Node.js v20 以上
- npm または pnpm / yarn

### 技術スタック

| 技術           | バージョン | 用途                                                       |
| -------------- | ---------- | ---------------------------------------------------------- |
| **React**      | ^19.2.7    | UI ライブラリ、状態管理                                    |
| **React DOM**  | ^19.2.7    | DOM レンダリング                                           |
| **TypeScript** | ~6.0.2     | 静的型定義                                                 |
| **Vite**       | ^8.1.1     | ビルドツール・開発サーバー                                 |
| **Vitest**     | ^4.1.10    | テストランナー・テストフレームワーク                       |
| **jsdom**      | ^29.1.1    | テスト用のブラウザ環境（DOM環境）エミュレーター            |
| **Testing Library (React)** | ^16.3.2 | Reactコンポーネントのテスト用ユーティリティ              |
| **jest-dom**   | ^6.9.1     | テスト用カスタムマッチャー（DOMアサーションの拡張）        |
| **user-event** | ^14.6.1    | ブラウザ上のユーザー操作（クリック・入力など）のシミュレート|
| **Playwright** | ^1.62.0    | E2Eテストフレームワーク（マルチブラウザ対応）              |
| **Storybook**  | ^10.5.4    | UIコンポーネントの開発・検証用の独立環境カタログ           |
| **TurboSnap**  | ^1.0.3     | 差分検知によるChromaticスナップショットテスト削減プラグイン|
| **MSW**        | ^2.15.0    | APIモックライブラリ（Service Workerによるリクエスト制御）   |
| **msw-storybook-addon** | ^3.0.0 | Storybook向けのMSW連携アドオン                          |
| **ESLint**     | ^10.6.0    | JavaScript/TypeScript 静的解析                             |
| **Stylelint**  | ^17.14.1   | CSS 静的解析                                               |
| **Prettier**   | ^3.9.6     | コードフォーマッター                                       |
| **Biome**      | (設定あり) | 超高速リンター・フォーマッター（ルールチェック・自動修正） |

---

## デプロイ方針

GitHub Pages への静的ホスティングを想定しています。
Vite のビルドによって生成される `dist/` ディレクトリの静的ファイルを配信します。

---

## CI/CD パイプライン

GitHub Actions を利用した自動検証・自動デプロイフローを導入しています。

1. **デプロイフロー (`deploy.yml`)**
   - **契機**: `main` ブランチへのプッシュ
   - **処理**: 依存関係インストール、Biomeによるコードチェック、単体テスト（Vitest）実行、ビルド、GitHub Pagesへの直接デプロイ。
2. **E2Eテストフロー (`playwright.yml`)**
   - **契機**: `main`/`master` ブランチへのプッシュ、およびプルリクエスト作成時
   - **処理**: Playwrightによるマルチブラウザ（Chromium, Firefox, WebKit）E2Eテストの実行。テスト失敗時はテストレポート（HTML）を GitHub Actions の Artifacts として自動保存（30日間保持）。

---

## Storybook & TurboSnap

コンポーネント駆動開発（Component-Driven Development）をサポートするために Storybook を導入しています。

### 特徴
- **Vitest統合型テスト**: Storybook v8/v10 の `@storybook/addon-vitest` を用いて、コンポーネントストーリーを Vitest 上でそのままユニットテストとして動作させます（Playwrightブラウザプロバイダーを使用）。
- **TurboSnapによる効率化**: `vite-plugin-turbosnap` がビルド時に Git のファイル差分から影響を受けるストーリーを分析し、依存関係ファイルである `preview-stats.json` を生成します。これを Chromatic 等のビジュアルテストツールと連携させることで、無駄なテスト実行数（スナップショットコスト）を大幅に削減します。

---

## MSW (Mock Service Worker)

API リクエストをモックし、バックエンドから独立したフロントエンド開発・テストを行うために MSW を導入しています。

### 特徴
- **Service Worker によるインターセプト**: ブラウザ上（Storybook / 開発サーバー）での API 通信をフックし、定義したモックハンドラーから安全にレスポンスを返します。
- **Vitest単体テストへの自動適用**: [src/test/setup.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/test/setup.ts) で MSW Mock Server が読み込まれており、外部の API を叩くコンポーネントに対してもモックされたネットワーク環境でテストが実行されます。
- **Storybookとの統合**: `msw-storybook-addon` の最新の v3.0.0 方式に準拠しており、`.storybook/preview.tsx` の `addons` 配列に `addonMsw()` を指定する形でグローバルに有効化されています。

---

## VRT (Visual Regression Testing)

コンポーネントや画面全体の予期せぬ見た目の変化（表示崩れ等）を検知するために VRT を導入しています。

### 特徴
- **Playwrightベースのスクリーンショットテスト**: 実際のブラウザ（Chromium, Firefox, WebKit）上で動作させ、基準（正解）画像と現在の描画状態のピクセル差分を比較します。
- **マルチブラウザ対応**: 各種デバイス解像度やブラウザエンジンの違いによる表示崩れを自動検証します。
- **コンポーネント単位の比較**: [tests/vrt.spec.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/tests/vrt.spec.ts) にて、ページ全体の検証のほかに特定の要素（カウンターボタンなど）をターゲットにしたテストが定義されています。

---

## インストール・セットアップ

プロジェクトをローカル環境で動かすためのセットアップ手順です。

```bash
# リポジトリをクローン
git clone https://github.com/katoy/study-frontend-test.git
cd study-frontend-test/my-test-app

# 依存関係をインストール
npm install
```

---

## 主要コマンド

`package.json` に定義されている主要な npm スクリプトです。

```bash
# 開発サーバーの起動 (HMR有効)
npm run dev

# プロダクション用ビルド (TypeScriptの型チェック後に Vite ビルドを実行)
npm run build

# アプリケーションの動作確認 (ビルド成果物のプレビュー表示)
npm run preview

# リンターの実行 (ESLint + Stylelint)
npm run lint

# リンターの自動修正
npm run lint:fix

# CSS リンターの実行
npm run lint:style

# CSS リンターの自動修正
npm run lint:style:fix

# Prettier によるコード全体の自動整形
npm run format

# Biome によるコードチェック (Linter + Formatter)
npm run biome:check

# Biome による自動修正
npm run biome:write

# テストの起動 (ウォッチモード)
npm run test

# テストの実行 (シングルラン)
npm run test:run

# PlaywrightによるE2Eテストの実行 (ヘッドレス)
npm run test:e2e

# PlaywrightのインタラクティブUIモードでの実行
npm run test:e2e:ui

# PlaywrightによるVRTの実行 (基準画像との比較)
npm run test:vrt

# VRT用基準（正解）画像の更新・再生成
npm run test:vrt:update

# Storybook 開発サーバーの起動
npm run storybook

# Storybook の静的ビルド (TurboSnap 依存グラフ作成含む)
npm run build-storybook
```

---

## ディレクトリ構造

本プロジェクトの主要ファイルおよびディレクトリの一覧です。

```text
my-test-app/
├── [public/](file:///Users/katoy/github/study-frontend-test/my-test-app/public)          # 静的アセット配信ディレクトリ
│   ├── [favicon.svg](file:///Users/katoy/github/study-frontend-test/my-test-app/public/favicon.svg) # サイトファビコン
│   ├── [icons.svg](file:///Users/katoy/github/study-frontend-test/my-test-app/public/icons.svg)   # UI用SVGスプライトアイコン
│   └── [mockServiceWorker.js](file:///Users/katoy/github/study-frontend-test/my-test-app/public/mockServiceWorker.js) # MSW サービスワーカーファイル
├── [src/](file:///Users/katoy/github/study-frontend-test/my-test-app/src)             # ソースコード
│   ├── [assets/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/assets)      # アセット（画像・ロゴなど）
│   │   ├── [hero.png](file:///Users/katoy/github/study-frontend-test/my-test-app/src/assets/hero.png)   # メインのヒーロー画像
│   │   ├── [react.svg](file:///Users/katoy/github/study-frontend-test/my-test-app/src/assets/react.svg) # React ロゴ SVG
│   │   └── [vite.svg](file:///Users/katoy/github/study-frontend-test/my-test-app/src/assets/vite.svg)   # Vite ロゴ SVG
│   ├── [components/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/components)  # 共通UIコンポーネント
│   │   ├── [UserProfile.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/components/UserProfile.tsx) # API通信を行うユーザープロファイルコンポーネント
│   │   ├── [UserProfile.test.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/components/UserProfile.test.tsx) # MSWモックAPIを用いた単体テスト
│   │   └── [UserProfile.stories.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/components/UserProfile.stories.tsx) # コンポーネントストーリー (MSWオーバーライド例含む)
│   ├── [hooks/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/hooks)        # カスタムフック
│   │   ├── [useCounter.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/hooks/useCounter.ts) # カウンターロジックのカスタムフック
│   │   └── [useCounter.test.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/hooks/useCounter.test.ts) # カスタムフックのユニットテスト
│   ├── [mocks/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/mocks)        # MSW モック設定ディレクトリ
│   │   ├── [browser.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/mocks/browser.ts)   # ブラウザ（Storybook等）用ワーカー初期化
│   │   ├── [handlers.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/mocks/handlers.ts)  # モック API ハンドラーの定義リスト
│   │   └── [node.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/mocks/node.ts)      # Node (Vitest単体テスト)用サーバー初期化
│   ├── [stories/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/stories)      # Storybook デモストーリーファイル
│   │   ├── [Button.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/stories/Button.tsx)       # ボタンコンポーネント本体
│   │   ├── [Button.stories.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/stories/Button.stories.ts) # ボタンのストーリー定義
│   │   └── ... (Header, Page などのサンプルストーリー群)
│   ├── [test/](file:///Users/katoy/github/study-frontend-test/my-test-app/src/test)          # テスト用設定
│   │   └── [setup.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/src/test/setup.ts) # テスト共通セットアップ (jest-domおよびMSW設定)
│   ├── [App.css](file:///Users/katoy/github/study-frontend-test/my-test-app/src/App.css)       # Appコンポーネント専用CSS
│   ├── [App.test.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/App.test.tsx)  # Appコンポーネントのテストコード
│   ├── [App.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/App.tsx)       # メインコンポーネント
│   ├── [index.css](file:///Users/katoy/github/study-frontend-test/my-test-app/src/index.css)     # グローバルCSS
│   └── [main.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/src/main.tsx)      # エントリポイント
├── [.storybook/](file:///Users/katoy/github/study-frontend-test/my-test-app/.storybook)      # Storybook の設定フォルダ
│   ├── [main.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/.storybook/main.ts)       # メイン設定
│   └── [preview.tsx](file:///Users/katoy/github/study-frontend-test/my-test-app/.storybook/preview.tsx) # レンダリング設定 (MSWアドオン統合含む)
├── [tests/](file:///Users/katoy/github/study-frontend-test/my-test-app/tests)            # Playwright E2Eテストコード
│   ├── [app.spec.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/tests/app.spec.ts) # アプリ固有のE2Eテスト
│   ├── [example.spec.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/tests/example.spec.ts) # Playwright公式のE2Eテストサンプル
│   ├── [vrt.spec.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/tests/vrt.spec.ts) # VRTテストコード
│   └── [vrt.spec.ts-snapshots/](file:///Users/katoy/github/study-frontend-test/my-test-app/tests/vrt.spec.ts-snapshots) # VRT基準画像フォルダ (各ブラウザ用)
├── [biome.json](file:///Users/katoy/github/study-frontend-test/my-test-app/biome.json)        # Biome 設定ファイル
├── [eslint.config.js](file:///Users/katoy/github/study-frontend-test/my-test-app/eslint.config.js)  # ESLint 設定ファイル
├── [index.html](file:///Users/katoy/github/study-frontend-test/my-test-app/index.html)        # メイン HTML テンプレート
├── [package.json](file:///Users/katoy/github/study-frontend-test/my-test-app/package.json)      # プロジェクト依存関係およびスクリプト定義
├── [playwright.config.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/playwright.config.ts) # Playwright設定ファイル
├── [tsconfig.json](file:///Users/katoy/github/study-frontend-test/my-test-app/tsconfig.json)     # TypeScript ルート設定
├── [vite.config.ts](file:///Users/katoy/github/study-frontend-test/my-test-app/vite.config.ts)   # Vite 設定
└── [README.md](file:///Users/katoy/github/study-frontend-test/my-test-app/README.md)        # 本ドキュメント
```

---

## 開発ガイド

### コーディング規約と原則

1. **TypeScript の厳格運用**
   - 型定義を適切に行い、極力 `any` を避けます。
   - tsconfigの厳格モードを維持します。
2. **多重ツールチェーンの併用**
   - リンターには ESLint / Biome を併用し、フォーマッターとして Prettier / Biome を用いてコミット前に整形を行います。
3. **日本語コメントの統一**
   - コード内のインラインコメントや解説は、日本語で記述して統一を図ります。

---

## 品質保証とコード検証

静的解析ツールおよびコードフォーマッターによる品質検証ステータスです。

| ツール名      | 用途                             | 目標                   | 実績ステータス |
| ------------- | -------------------------------- | ---------------------- | -------------- |
| **ESLint**    | JS/TSコード品質・エラー検知      | 警告ゼロ               | **PASS**       |
| **Stylelint** | CSSスタイル整合性チェック        | 警告ゼロ               | **PASS**       |
| **Prettier**  | コード全体の自動整形フォーマット | 一貫したコードスタイル | **PASS**       |
| **Biome**     | 高速ルールチェック・自動整形     | 警告ゼロ               | **PASS**       |
| **Vitest**    | ユニットテスト・結合テスト       | カバレッジ確保・バグ防ぐ | **PASS**       |
| **Playwright**| E2Eテスト (マルチブラウザ対応)   | 複数環境での表示・動作担保| **PASS**       |
| **Storybook** | コンポーネント単位のテスト実行   | 各UI状態の挙動確認・検証 | **PASS**       |
| **MSW**       | API通信のモッキング・検証       | テスト・カタログ用API制御| **PASS**       |
| **VRT (Playwright)** | ビジュアル表示崩れの自動検知 | 複数ブラウザ間の表示担保 | **PASS**       |

---

## トラブルシューティング

#### 問題: `npm run dev` 実行時にポート競合エラーが出る

- **原因**: 他の開発プロセスがすでにデフォルトポート（通常は5173）を使用しています。
- **対策**: Vite は自動的に空いている次のポート（5174など）をアサインしますが、明示的にポートを指定したい場合は以下のコマンドで起動してください。
  ```bash
  npm run dev -- --port 8080
  ```

---

## ライセンス

MIT ライセンスに基づいて公開されています。
