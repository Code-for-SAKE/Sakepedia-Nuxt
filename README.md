# Sakepedia Nuxt

Sakepediaは日本酒のオープンデータを作るためのプラットフォームです。

大枠で以下の技術要素を使って開発しています。(詳細はpackege.json参照)

- Nuxt.js
- Axios/Express
- MongoDB/Mongoose
- Bootstrap-Vue(一部Semantic UI)
- GitHub OAuth App
- Google OAuth 2.0 クライアント

## Need

### Install
- node v14.16.1
- yarn v1.22.5
- mongodb v4.2.8
- pm2 v4.5.6 for production

### GitHub OAuth App(ローカル開発用)

- https://github.com/settings/developers
- OAuth Appsから新規にOAuth Appsを作成
  - Homepage URL: http://localhost:3030
  - Authorization callback URL: http://localhost:3030/auth/github/callback
  - 他は任意
- `Client ID`と`Client Secret`を確認

### Google OAuth 2.0 クライアント ID(ローカル開発用)

- https://console.cloud.google.com/apis/credentials
- プロジェクト作成
- OAuth同意画面
  - ユーザーの種類: 外部
  - アプリアイコンを使わない場合は審査をスキップできるので、アイコンなし
  - スコープ
    - /auth/userinfo.email
    - /auth/userinfo.profile
  - 他は任意
- 認証情報からOAuth 2.0 クライアント IDを作成
  - アプリケーションの種類: ウェブ アプリケーション
  - 承認済みの JavaScript 生成元URI: http://localhost:3030
  - 承認済みのリダイレクト URI: http://localhost:3030/auth/google/callback

## Build Setup

``` bash
# install dependencies
$ yarn install

# ENV
$ vi config/.env.production
$ vi config/.env.development

BASE_URL=動作させるURL(なければhttp://localhost:3030)
MONGO_CONNECT=MONGODBの接続文字列
GITHUB_CLIENT_ID=GitHub OAuth AppのClient ID
GITHUB_CLIENT_SECRET=GitHub OAuth AppのClient Secret
GOOGLE_CLIENT_ID=Google OAuth 2.0 クライアントのClient ID
GOOGLE_CLIENT_SECRET=Google OAuth 2.0 クライアントのClient Secret

# serve with hot reload at localhost:3030
$ yarn dev

# build for production and launch server
$ yarn build
$ pm2 start npm -- start

# generate static project
$ yarn generate
```
## run test in local
`yarn run test:jest`
update jest snapshots by running `yarn run test:jest -u`
