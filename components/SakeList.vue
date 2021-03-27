<template>
    <div>
        <b-pagination
            v-if="sakes.length > 2"
            v-model="page"
            :total-rows="count*limit"
            :per-page="limit"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
            align="center" />
        <div class="list-group"
            v-if="sakes.length">
            <nuxt-link
                class="list-group-item list-group-item-action"
                :to="'/sakes/' + sake._id"
                v-for="sake in sakes"
                :key="sake._id">
                {{ sake.name }}
            </nuxt-link>
        </div>

        <div class="alert alert-warning"
            v-else>
            データがありません
        </div>
    </div>
</template>

<script>
export default {
    props: {
        search: {
            type: Object,
            default: {},
        }
    },
    data() {
        return {

            sakes: [],

            search_: this.search,

            page: 1,
            count: 0,
            limit: 10,

        };
    },
    created(){
        this.$axios.get('/api/sakes', {params: this.search})
        .then(response => (
            this.sakes = response.data.sakes,
            this.page = response.data.currentPage,
            this.count = response.data.pageCount
        ))
    },
    methods: {
        getRequestParams(page, limit) {
            if (page) {
                this.search_["page"] = page;
            }
            if (limit) {
                this.search_["limit"] = limit;
            }
            return {params: this.search_};
        },
        retrieves() {
            const params = this.getRequestParams(
                this.page,
                this.limit
            );

            this.$axios.get('/api/sakes', params)
            .then((response) => {
                this.sakes = response.data.sakes
                this.page = response.data.currentPage
                this.count = response.data.pageCount
            })
            .catch((e) => {
                console.log(e);
            });
        },
        handlePageChange(value) {
            this.page = value;
            this.retrieves();
        },
    }
}
</script>
