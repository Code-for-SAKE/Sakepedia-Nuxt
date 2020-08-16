<template>
    <div class="w-75">
        <model-list-select
            ref="brewery_search"
            :id="this.id"
            :name="this.name"
            :list="searchedBreweries"
            v-model="innerValue"
            @input="onInput"
            :option-value="this.optionValue"
            :option-text="this.optionText"
            :placeholder="this.placeholder"
            @searchchange="searchBreweries"
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
            default: 'name'
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
            default: '酒蔵'
        },
        value: {

        },
    },
    data(){
        return{
            searchedBreweries : [],
            innerValue : this.value,
        }
    },
    mounted(){
        //初期値の設定
        if(this.value){
            this.searchBreweries(this.value.name)
        }else{
            this.$axios.get('/api/breweries/')
            .then(response => {
                this.searchedBreweries = response.data.breweries
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
        searchBreweries (searchText) {
            if(searchText){
                this.$emit('input', {name: searchText})
                this.$axios.get('/api/list/breweries',{params: {keyword: searchText}})
                .then(response => {
                    this.searchedBreweries = response.data
                });
            }else{
                this.$emit('input', this.value)
            }
        }
    }
}
</script>