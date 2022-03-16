<template>
  <b-button
    id="btn-google"
    class="btn-lg m-3 p-0 pr-2"
    variant="white"
    href="/api/auth/google"
  >
    <div>
      <b-img
        id="img-google"
        src="~/assets/image/btn_google_light_normal.svg"
      ></b-img>
    </div>
    <div class="mx-2">Sign in with Google</div>
  </b-button>
</template>

<style lang="scss" scoped>
#btn-google {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  background-color: #4285f4;
  font-family: 'Roboto', sans-serif;
  color: white;
  text-decoration: none;

  &:focus {
    background-color: calc(#4285f4 * 1.1);
    box-shadow: 0 0 0 0.2rem rgba(66, 133, 243, 0.25) !important;
  }
  &:hover {
    background-color: cqlc(#4285f4 * 1.1);
  }
}

#img-google {
  max-height: 46px;
}
</style>
