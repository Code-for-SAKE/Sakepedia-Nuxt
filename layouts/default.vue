<template>
  <div id="wrap">
    <header id="header" class="fixed-top">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand href="/">Sakepedia - みんなで作る日本酒オープンデータ</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" type="dark" variant="info" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/sakes" exact-active-class="active"
              >日本酒</b-nav-item
            >
            <b-nav-item to="/brands" exact-active-class="active"
              >銘柄</b-nav-item
            >
            <b-nav-item to="/breweries" exact-active-class="active"
              >酒蔵</b-nav-item
            >
            <b-nav-item to="/comments" exact-active-class="active"
              >投稿</b-nav-item
            >
            <b-nav-item
              v-if="!$store.state.auth"
              right
              to="/auth/login"
              exact-active-class="active"
              >ログイン</b-nav-item
            >

            <b-nav-item-dropdown v-if="$store.state.auth" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-img
                  :src="$store.state.user.avatarUrl"
                  rounded
                  :alt="$store.state.user.name"
                  height="32"
                ></b-img>
              </template>
              <b-dropdown-item to="/auth/account">アカウント</b-dropdown-item>
              <b-dropdown-item to="/auth/logout">ログアウト</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <div id="container" class="p-3">
      <div
        v-show="$store.state.flash.visible"
        class="alert"
        :class="$store.state.flash.mode"
      >
        {{ $store.state.flash.text }}
      </div>
      <nuxt />
    </div>
    <footer id="footer" class="align-items-end text-center">
      <span class="p-3"><a class="text-white" href="https://www.code4sake.org/">Code for SAKE</a></span>
      <span class="p-3"><a class="text-white" href="https://github.com/Code-for-SAKE/Sakepedia-Nuxt">Github</a></span>
      <span class="p-3"><a class="text-white">API仕様(未着手)</a></span>
      <nuxt-link class="m-3 text-white" to="/about">Sakepediaについて</nuxt-link>
    </footer>
  </div>
</template>

<style scoped>
#footer {
  background-image: url('~/assets/image/sake-footer_bg.png');
  background-repeat: repeat-x;
  background-position: top;
}
#footer div {
  width: 100%;
  color: var(--white);
  background-color: var(--primary);
}
</style>
