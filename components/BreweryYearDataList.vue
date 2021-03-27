<template>
    <div>
        <b-pagination
            v-if="bydatas.length >= 1"
            v-model="page"
            :total-rows="count*limit"
            :per-page="limit"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
            align="center" />
        <div class="list-group"
            v-if="bydatas.length">
            <nuxt-link
                class="list-group-item list-group-item-action"
                :to="'/bydatas/' + bydata._id"
                v-for="bydata in bydatas"
                :key="bydata._id">
                {{ bydata.sake ? bydata.sake.name : '' }}
                {{ bydata.makedBY }}
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

            bydatas: [],

            search_: this.search,

            page: 1,
            count: 0,
            limit: 3,

        };
    },
    mounted(){
        this.$axios.get('/api/bydatas', {params: this.search})
        .then(response => (
            console.log(response.data.pageCount),
            this.bydatas = response.data.bydatas,
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

            this.$axios.get('/api/bydatas', params)
            .then((response) => {
                this.bydatas = response.data.bydatas
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
