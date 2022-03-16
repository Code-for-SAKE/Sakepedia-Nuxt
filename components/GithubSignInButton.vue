<template>
  <b-button
    id="btn-github"
    class="btn-lg m-3 p-0 pr-2"
    variant="white"
    href="/api/auth/github"
  >
    <div>
      <b-img id="img-github" src="~/assets/image/btn_github.svg"></b-img>
    </div>
    <div class="mx-2">Sign in with GitHub</div>
  </b-button>
</template>

<style lang="scss" scoped>
#btn-github {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  background-color: #24292e;
  font-family: 'Roboto', sans-serif;
  color: white;
  text-decoration: none;
  &:focus {
    background-color: calc(#24292e * 1.3);
    box-shadow: 0 0 0 0.2rem rgba(36, 41, 46, 0.25) !important;
  }
  &:hover {
    background-color: calc(#24292e * 1.3);
  }
}

#img-github {
  padding: 3px;
  max-height: 46px;
}
</style>
