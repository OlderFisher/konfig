<template>
        <div class="fm-can-radiobutton pt-3 pb-3 pe-5">
            <div class="form-check">
                <input class="form-check-input" type="radio" :name="setName()" :id="setId(radiobuttons.id)"
                       :value="setValue(radiobuttons.id)" :checked="radiobuttons.checked" @click="onVorratCLick($event.target.value)">
                <label class="form-check-label fm-fnt-300-16-22 fm-rnt-black" :for="setId(radiobuttons.id)">
                    {{ radiobuttons.title }}
                </label>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        radiobuttons : { type : Object , required : true},
        name : { type : String , required: true }
    },
    emits:[
        'radiobuttonchecked'
    ],
    methods : {
        setId(i) {
            return this.name + i;
        },
        setValue(i) {
            return this.name + i;
        },
        onVorratCLick(value){
            let val = value[value.length-1] ;
            val = val*1-1 ;
            this.$emit('radiobuttonchecked',{
                value : val
            });
        },
        setName(){
            return 'fm-can-'+ this.name ;
        }
    }
}
</script>

<style scoped>
.fm-can-radiobutton{
    background: #FFFFFF;
    width:100%!important;
    padding-left: 28px;
}

.form-check{
    display: flex !important;
    flex-direction: row;
    justify-content: flex-start !important;
    align-items: center !important;;
    margin-top: -15px;
}
.form-check-label{
    margin-left:12px ;
}
.form-check-label:hover{
    cursor:pointer;
}
input.form-check-input {
    width:27px;
    height: 27px;
    border: 8px solid #E4E4E4;
}
input.form-check-input:hover{
    cursor:pointer;
    border: 8px solid #D5F8EC;
     
}
input.form-check-input:checked{
    border: 2px solid #2FDAA0;
    background-color: #2FDAA0;
}
input.form-check-input:focus {
    border-color: none;
    background-color: none;
    outline:none!important;
    box-shadow: none!important;
}
input::-moz-focus-outer, ::-moz-focus-inner {
    border: 0;
    padding: 0;
}
input:focus{
    outline: none!important;
    box-shadow: none!important;
}
</style>