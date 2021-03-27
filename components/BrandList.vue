<template>
    <div>
        <b-pagination
            v-if="brands.length > 2"
            v-model="page"
            :total-rows="count*limit"
            :per-page="limit"
            prev-text="Prev"
            next-text="Next"
            @change="handlePageChange"
            align="center" />
        <div class="list-group"
            v-if="brands.length">
            <nuxt-link
                class="list-group-item list-group-item-action"
                :to="'/brands/' + brand._id"
                v-for="brand in brands"
                :key="brand._id">
                {{ brand.name }}
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

            brands: [],

            search_: this.search,

            page: 1,
            count: 0,
            limit: 10,

        };
    },
    created(){
        this.$axios.get('/api/brands', {params: this.search})
        .then(response => (
            this.brands = response.data.brands,
            this.page = response.data.currentPage,
            this.count = response.data.pageCount
        ))
    },
    methods: {
        getRequestParams(page, limit) {
            if (page) {
                search_["page"] = page;
            }
            if (limit) {
                search_["limit"] = limit;
            }
            return {params: search_};
        },
        retrieves() {
            const params = this.getRequestParams(
                this.page,
                this.limit
            );

            this.$axios.get('/api/brands', params)
            .then((response) => {
                this.brands = response.data.brands
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
