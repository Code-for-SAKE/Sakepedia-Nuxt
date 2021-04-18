# Sakepedia Nuxt

Sakepediaは日本酒のオープンデータを作るためのプラットフォームです。

大枠で以下の技術要素を使って開発しています。(詳細はpackege.json参照)

- Nuxt.js
- Axios/Express
- MongoDB/Mongoose
- Bootstrap-Vue(一部Semantic UI)
- GitHub OAuth App

## Need

### Install
- node v14.16.1
- yarn v1.22.5
- mongodb v4.2.8
- pm2 v4.5.6

### GitHub OAuth App(ローカル開発用)

- https://github.com/settings/developers
- OAuth Appsから新規にOAuth Appsを作成
  - Homepage URL: http://localhost:3030
  - Authorization callback URL: http://localhost:3030/callback
  - 他は任意
- `Client ID`と`Client Secret`を確認

## Build Setup

``` bash
# install dependencies
$ yarn install

# ENV
$ vi config/.env.production
$ vi config/.env.development

GITHUB_CLIENT_ID=GitHub OAuth AppのClient ID
GITHUB_CLIENT_SECRET=GitHub OAuth AppのClient Secret
BASE_URL=動作させるURL(なければhttp://localhost:3030)
MONGO_CONNECT=MONGODBの接続文字列

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