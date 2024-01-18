<template>
<div class="d-flex flex-row ps-3">
    <div class="form-check form-check-inline d-flex flex-row" v-for="(element,i) in checkgroup" :key="i" >
        <input class="form-check-input" type="checkbox" :id="setId(element.id)" :value="element.value" @change="getCheck($event.target.value)" :checked="element.checked">
        <label class="form-check-label fm-fnt-300-16-22 fm-fnt-black" :for="setId(element.id)">{{ element.value}}</label>
    </div>
</div>
</template>

<script>
export default {
    props : [
        'checkgroup'
    ],
    emits : [
      'checkedgenetik'
    ],
    data(){
        return {

        }
    },
    methods : {
        setId(id){
            return 'fm-can-checkgroup-'+ id ;
        },
        getCheck(value){
            this.$emit('checkedgenetik',{
                value : value
            }) ;
        }
    },

}
</script>

<style scoped>
.form-check-inline{
    align-items: center;
}
.form-check-input{
    width:27px ;
    height : 27px ;
    margin-right: 12px;
    background-color : #E4E4E4!important;
    border-color: #E4E4E4!important;
}
.form-check-input:hover{
    cursor:pointer;
    background-color : #D5F8EC!important;
    border-color: #D5F8EC!important;
}
.form-check-label:hover{
    cursor:pointer ;
}
.form-check-input:checked{
    background-color : #2FDAA0!important;
    border-color: #2FDAA0!important;
}
.form-check-input:focus{
    outline : 0 !important;
    box-shadow: none!important;
}
.form-check-inpu::-moz-focus-outer, ::-moz-focus-inner {
    border: 0;
    padding: 0;
}

@media screen and (max-width : 415px ) {
    .fm-can-check-group{
        display: flex;
        justify-content: space-between;
    }
    .form-check{
        margin-right: 0;
    }

}
</style>