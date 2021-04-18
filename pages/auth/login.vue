<template>
  <div>
    <h1>ログイン</h1>
    <hr />

    <div class="row">
      <div class="col-12">
        <p>
          情報の追加、更新、削除にはログインが必要です。<br />
          SakepediaはGitHubのアカウントでログインすることができます。<br />
          ユーザー名のみSakepediaのデータベースに残りますが、ログイン情報は残りません。
        </p>
        <div class=""></div>
        <div class="mx-auto w-25">
          <b-button class="btn-lg mr-3 mx-auto" href="/api/auth/login">
            GitHubでログイン
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    githublogin() {
      this.$axios
        .get("/api/auth/login")
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
