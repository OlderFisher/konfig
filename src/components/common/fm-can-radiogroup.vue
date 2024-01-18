<template>
  <div  class="btn-group" role="group" aria-label="Basic radio toggle button group">
    <div v-for="(element,i) in radiogroup" :key="i" class="fm-can-radiobutton-group">
        <input type="radio" class="btn-check" :name="element.name" :id="setId(i,element.name)" :value="element.label" autocomplete="off" :checked="element.active ? true : false" @change="radioClick($event.target.value,i)">
        <label class="btn fm-btn fm-fnt-400-16-22 fm-fnt-black" :for="setId(i,element.name)">{{ element.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    radiogroup: { type: Object, required : true },
  },
  emits : [
    'radiochange'
  ],
  methods :{
    setId(i,name){
      return 'fm-can-radio-'+ name + '-'+i
    },
    radioClick(value, i){
      this.$emit('radiochange',{
        value : value ,
        i : i
      })
    },
    
  }
}
</script>

<style scoped>
.fm-can-radiobutton-group{
  margin-right: 2px;
}
.btn {
  border: none !important;
  background-color: #F5F5F6;
  border-radius : 2px ;
  color: #6C7682;
  box-sizing: border-box;
  min-width:74px;
}
.btn:hover{
  background-color: #2FDAA0 !important;
  font-weight: 400 !important;
  border: none !important;
  color:#FFFFFF;
}
.btn:focus{
  background-color: #2FDAA0 !important;
  font-weight: 400 !important;
  border: none !important;
  color:#FFFFFF;
}
.btn-check:active+.btn, .btn-check:checked+.btn, .btn.active, .btn.show, .btn:active {
  background-color: #2FDAA0 !important;
  font-weight: 400 !important;
  border: none !important;
  color:#FFFFFF;
}
</style>