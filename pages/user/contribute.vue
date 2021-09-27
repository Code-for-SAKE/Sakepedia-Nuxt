<template>
  <div>
    <div class="my-4">
      <h1>あなたの貢献</h1>
      <hr />
      <div class="col-md-8 col-lg-4 mx-auto">
        <h4 class="text-center">
          <img :src="$store.state.user.avatarUrl" width="72" class="pr-2" />
          <p>{{ $store.state.user.name }}</p>
        </h4>
      </div>
    </div>
    <div class="my-4">
      <h2>データ登録数</h2>
      <hr />
      <div class="row">
        <div class="col-sm-4 my-1">
          <div class="card">
            <div class="card-header">酒蔵数</div>
            <div class="card-body">
              <p id="contribute-brewery" class="contribute text-center">
                {{ contribute.brewery }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 my-1">
          <div class="card">
            <div class="card-header">銘柄数</div>
            <div class="card-body text-center">
              <p id="contribute-brand" class="contribute text-center">
                {{ contribute.brand }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-sm-4 my-1">
          <div class="card">
            <div class="card-header">日本酒数</div>
            <div class="card-body text-center">
              <p id="contribute-sake" class="contribute text-center">
                {{ contribute.sake }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2>投稿一覧</h2>
        <b-button variant="success" to="/comments/add">投稿追加</b-button>
      </div>
      <comment-list :user-id="$store.state.user._id" />
      <p id="contribute-comment" class="text-right">
        全{{ contribute.comment }}投稿
      </p>
    </div>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList.vue';

export default {
  components: {
    CommentList,
  },
  middleware: 'authenticated',
  data() {
    return {
      name: '',
      errorMessage: '',
      contribute: {},
    };
  },
  async mounted() {
    const response = await this.$axios.get(
      `/api/users/${this.$store.state.user._id}/contribute`
    );
    if (response) {
      this.contribute = response.data.contribute;
    }
  },
  methods: {
    async save() {
      await this.$axios
        .post(`api/users/${this.$store.state.user._id}/name`, {
          name: this.name,
        })
        .then((res) => {
          if (res.data.error) {
            this.errorMessage = res.data.error;
          } else {
            this.errorMessage = '';
            this.$store.commit('login', res.data.user);
          }
        });
    },
  },
};
</script>

<style scoped>
.contribute {
  font-size: 2rem;
}
</style>
