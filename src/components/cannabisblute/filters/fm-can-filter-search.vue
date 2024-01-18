<template>
    <div class="fm-can-search-element input-group mb-3">
        <input id="fm-can-search-input" :value="value" type="text"   @focus="setFocusBlock($event)" @blur="removeFocusBlock($event)" class="form-control" :placeholder="placeholder" :aria-label="placeholder" aria-describedby="basic-addon" @input="setSearch($event.target.value)">
        <span class="input-group-text" id="fm-can-search"><img :src="searchImage" alt="filter-search"></span>
    </div>
</template>

<script>
import config from "/src/config.js";
export default {
    emits : [
      'searchfiltervalue',
    ],
    data(){
        return {
            config,
            value : '' ,
            searchImage : `${config.svgFolder()}/search_grey.svg`,
            placeholder : 'Suche nach Blüte, Kultivar oder Hersteller…',
        }
    },
    methods : {
        setSearch(value){
            this.$emit('searchfiltervalue',{
                value : value
            })
        },
        setFocusBlock($event){
            let countblock = $event.target.parentElement ;
            countblock.classList.add('fm-input-focus');
		},
		removeFocusBlock($event){
			let countBlock = $event.target.parentElement ;
			countBlock.classList.remove('fm-input-focus')
		}
    }
}
</script>

<style scoped>
.fm-can-search-element{
    border: 1px solid #A1A7AE;
    border-radius: 2px!important;
     height: 38px!important;
}
.fm-can-search-element:focus{
    outline: 0 ;
    box-shadow:none!important;
     border: 1px solid #2FDAA0!important;
}
#fm-can-search-input{
    border: none!important;
}

#fm-can-search{
    border: none!important;
    background-color: #FFFFFF;
} 
input[type="text"]::placeholder {
    font-style: normal!important;
    font-weight: 400!important;
    font-size: 14px!important;
    line-height: 22px!important;
    color: #6C7682!important;
}
input[type="text"]{
	outline: 0!important;
    outline-offset: 0!important;
	box-shadow: none!important;
}

#fm-can-search-input:focus{
    outline : 0 ;
    box-shadow: none!important;
}
.fm-input-focus{
	border: 1px solid #2FDAA0!important;
}


</style>