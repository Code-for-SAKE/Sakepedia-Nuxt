<template>
    <div class="w-75">
        <model-list-select
            ref="sake_search"
            :id="this.id"
            :name="innerName"
            :list="searchedSakes"
            v-model="innerValue"
            @input="onInput"
            :option-value="this.optionValue"
            :option-text="this.optionText"
            :placeholder="this.placeholder"
            @searchchange="searchSakes"
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
            default: '日本酒'
        },
        value: {

        },
    },
    data(){
        return{
            searchedSakes : [],
            innerValue : this.value,
            innerName : this.name,
        }
    },
    mounted(){
        //初期値の設定
        if(this.value){
            this.$axios.get('/api/sakes/'+this.value[this.optionValue])
            .then(response => {
                this.searchedSakes = [response.data]
                this.innerName = response.data.[this.optionText]
            });
        }else{
            this.$axios.get('/api/sakes/')
            .then(response => {
                this.searchedSakes = response.data.sakes
            });
        }
    },
    methods:{
        onInput(item) {
            if(item) {
                console.log("onInput item", item)
                this.$emit('input', item)
            }else{
                console.log("onInput value", this.value)
                this.$emit('input', this.value)
            }
        },
        searchSakes (searchText) {
            if(searchText){
                console.log("searchSakees searchText", searchText)
                this.$emit('input', {name: searchText})
                this.$axios.get('/api/list/sakes',{params: {keyword: searchText}})
                .then(response => {
                    this.searchedSakes = response.data
                });
            }else{
                console.log("searchSakees value", this.value)
                this.$emit('input', this.value)
            }
        }
    }
}
</script>
