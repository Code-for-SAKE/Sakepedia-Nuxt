<template>
    <div class="w-75">
        <model-list-select
            ref="brand_search"
            :id="this.id"
            :name="innerName"
            :list="searchedBrands"
            v-model="innerValue"
            @input="onInput"
            :option-value="this.optionValue"
            :option-text="this.optionText"
            :placeholder="this.placeholder"
            @searchchange="searchBrands"
        >
        </model-list-select>
    </div>
</template>

<script>
import { ModelListSelect } from 'vue-search-select'
export default {
    components: {
        ModelListSelect
    },
    props: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        optionValue: {
            type: String,
            default: '_id'
        },
        optionText: {
            type: String,
            default: 'name'
        },
        customText: {
            type: Function
        },
        placeholder: {
            type: String,
            default: '銘柄'
        },
        value: {

        },
    },
    data(){
        return{
            searchedBrands : [],
            innerValue : this.value,
            innerName : this.name,
        }
    },
    mounted(){
        //初期値の設定
        if(this.value){
            this.$axios.get('/api/brands/'+this.value[this.optionValue])
            .then(response => {
                this.searchedBrands = [response.data]
                this.innerName = response.data.[this.optionText]
            });
        }else{
            this.$axios.get('/api/brands/')
            .then(response => {
                this.searchedBrands = response.data.brands
            });
        }
    },
    methods:{
        onInput(item) {
            if(item) {
                this.$emit('input', item)
            }else{
                this.$emit('input', this.value)
            }
        },
        searchBrands (searchText) {
            if(searchText){
                this.$emit('input', {name: searchText})
                this.$axios.get('/api/list/brands',{params: {keyword: searchText}})
                .then(response => {
                    this.searchedBrands = response.data
                });
            }else{
                this.$emit('input', this.value)
            }
        }
    }
}
</script>