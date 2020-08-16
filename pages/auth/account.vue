<template>
  <div>
    <h1>アカウント情報</h1>

    <hr>

    <div class="card col-4 mx-auto text-center">
      <div class="card-body">
        <h4><img :src=$store.state.user.avatarUrl width="72" class="mx-3">{{ $store.state.user.name }}</h4>

        <b-button to="/auth/logout" variant="danger">Logout</b-button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
