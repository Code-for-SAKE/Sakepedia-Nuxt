# Sakepedia Nuxt

## Need

- yarn
- mongodb
- pm2

## Build Setup

``` bash
# install dependencies
$ yarn install

# ENV
$ vi config/.env.production

GITHUB_CLIENT_ID=GitHub OAuth AppのID
GITHUB_CLIENT_SECRET=GitHub OAuth AppのSecret
BASE_URL=動作させるURL
MONGO_CONNECT=MONGODBの接続文字列

# serve with hot reload at localhost:3030
$ yarn dev

# build for production and launch server
$ yarn build
$ pm2 start npm -- start

# generate static project
$ yarn generate
```
