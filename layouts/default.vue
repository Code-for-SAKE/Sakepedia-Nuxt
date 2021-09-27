<template>
  <div id="wrap">
    <header id="header" class="">
      <b-navbar toggleable="md" variant="white">
        <b-navbar-brand href="/"
          ><img
            height="50"
            src="~/assets/image/sakepedia-yoko.png"
            alt="Sakepedia"
          />
        </b-navbar-brand>
        <span class="inline-block mr-auto"
          >- みんなで作る日本酒オープンデータ</span
        >

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" variant="white" is-nav>
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
              <b-dropdown-item to="/user/contribute"
                >あなたの貢献</b-dropdown-item
              >
              <b-dropdown-item to="/auth/logout">ログアウト</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <div id="container">
      <div
        v-show="$store.state.flash.visible"
        class="alert"
        :class="$store.state.flash.mode"
      >
        {{ $store.state.flash.text }}
      </div>
      <nuxt class="p-3" />
    </div>
    <footer id="footer" class="align-items-end text-center">
      <div id="footer-content">
        <span class="p-3"
          ><a class="text-white" href="https://www.code4sake.org/"
            >Code for SAKE</a
          ></span
        >
        <span class="p-3"
          ><a
            class="text-white"
            href="https://github.com/Code-for-SAKE/Sakepedia-Nuxt"
            >Github</a
          ></span
        >
        <span class="p-3"><a class="text-white">API仕様(未着手)</a></span>
        <nuxt-link class="p-3 text-white" to="/about"
          >Sakepediaについて</nuxt-link
        >
      </div>
    </footer>
  </div>
</template>

<style scoped>
#footer {
  padding-top: 100px;
  background-image: url('~/assets/image/sake-footer_bg.png');
  background-repeat: repeat-x;
  background-position: top;
}
#footer-content {
  width: 100%;
  color: var(--white);
  background-color: var(--primary);
}
#footer-content > * {
  display: inline-block;
}
</style>
