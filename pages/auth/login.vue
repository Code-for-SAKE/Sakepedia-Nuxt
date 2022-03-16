<template>
  <div>
    <h1>ログイン</h1>
    <hr />

    <div class="row">
      <div class="col-12">
        <p>
          情報の追加、更新、削除にはログインが必要です。<br />
          SakepediaはGitHubかGoogleのアカウントでログインすることができます。<br />
          ユーザー名のみSakepediaのデータベースに残りますが、ログイン情報は残りません。
        </p>
      </div>
    </div>
    <div class="row mt-3">
      <div v-show="enableGithub" class="col-12 text-center">
        <github-sign-in-button />
      </div>
      <div v-show="enableGoogle" class="col-12 text-center">
        <google-sign-in-button />
      </div>
    </div>
  </div>
</template>

<script>
import GithubSignInButton from '@/components/GithubSignInButton.vue';
import GoogleSignInButton from '@/components/GoogleSignInButton.vue';

export default {
  components: {
    GithubSignInButton,
    GoogleSignInButton,
  },
  data() {
    return {
      enableGithub: process.env.enableGithub,
      enableGoogle: process.env.enableGoogle,
    };
  },
};
</script>
