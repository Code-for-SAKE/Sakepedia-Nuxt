<template>
  <div id="wrap">
      <header id="header">
        <b-navbar toggleable="md" type="dark" variant="info">
          <b-navbar-brand href="/">Sakepedia</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" type="dark" variant="info" is-nav>
            <b-navbar-nav>
              <b-nav-item to="/sakes" exact-active-class="active">日本酒</b-nav-item>
              <b-nav-item to="/brands" exact-active-class="active">銘柄</b-nav-item>
              <b-nav-item to="/breweries" exact-active-class="active">酒蔵</b-nav-item>
              <b-nav-item to="/comments" exact-active-class="active">投稿</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item right to="/auth/login" exact-active-class="active"
              v-if="!$store.state.auth">ログイン</b-nav-item>

              <b-nav-item-dropdown right v-if="$store.state.auth">
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <b-img :src="$store.state.user.avatarUrl" rounded :alt="$store.state.user.name" height="32"></b-img>
                </template>
                <b-dropdown-item to="/auth/account">アカウント</b-dropdown-item>
                <b-dropdown-item to="/auth/logout">ログアウト</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </header>
      <div id="container" class="p-3">
        <div class="alert" :class="$store.state.flash.mode" v-show='$store.state.flash.visible'>{{$store.state.flash.text}}</div> 
        <nuxt />
      </div>
      <footer id="footer">
        <span class="m-3">Code for SAKE</span>
      </footer>
    </div>
</template>
