# Sakepedia Nuxt

## Need

### Install
- yarn
- mongodb
- pm2

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
