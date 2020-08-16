<template>
    <div class="w-75">
        <model-list-select
            ref="sake_search"
            :id="this.id"
            :name="this.name"
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
            searchedSakes : [],
            innerValue : this.value,
        }
    },
    mounted(){
        //初期値の設定
        if(this.value){
            this.searchSakes(this.value.name)
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
                this.$emit('input', item)
            }else{
                this.$emit('input', this.value)
            }
        },
        searchSakes (searchText) {
            if(searchText){
                this.$emit('input', {name: searchText})
                this.$axios.get('/api/list/sakes',{params: {keyword: searchText}})
                .then(response => {
                    this.searchedSakes = response.data
                });
            }else{
                this.$emit('input', this.value)
            }
        }
    }
}
</script>