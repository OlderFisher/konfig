<template>
    <div id="fm-can-select-block">
    <el-select
        :value="selected"
        :popper-class="popperClass"
        @change=onChange($event)
        :placeholder="placeholder">
        <el-option
            v-for="(company,i) in companies"
            :key="i"
            :label="company.name"
            :value="company.id">
        </el-option>
    </el-select>
    </div>
</template>

<script>
import { ElSelect , ElOption } from 'element-plus'

export default {
    components : {
        ElSelect,
        ElOption,
    },
    emits : [
      'selectedcompany'
    ],
    props : {
        companies: { type : Object , required : true }
    },
    data() {
        return {
            selected: '',
            placeholder : 'Alle Herstellers',
            popperClass : 'fm-can-popper' ,
        }
    },
    methods : {
        onChange(value){
            for( let i=0 ; i < this.companies.length ; i++ ){
                if ( this.companies[i].id === value) {
                    this.selected = this.companies[i].name ;
                    this.placeholder = this.selected ;
                    this.$emit('selectedcompany', {
                        value : this.selected
                    });
                }
            }
        }

    }
}
</script>

<style scoped>
#placeholder{
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #1C1C1C;
}
.el-select{
    width:100% ;
}
#fm-can-select-block:deep(.el-input__wrapper){
    border: 1px solid #A1A7AE;
    border-radius: 2px!important;
    box-shadow: none!important;
}
#fm-can-select-block:deep(input.el-input__inner){
    height:38px!important;
}
#fm-can-select-block:deep(.el-input__wrapper):focus{
    border: 1px solid #2FDAA0!important;
    box-shadow: none!important;   
    --el-box-shadow : none!important ;
}

#fm-can-select-block:deep(.el-select .el-input__wrapper.is-focus){
     border: 1px solid #2FDAA0!important;
     box-shadow:none!important;
     --el-box-shadow : none!important ;
} 
#fm-can-select-block:deep(.el-select__popper, .el-popper ){
    box-shadow:none!important;
    --el-box-shadow : none!important ;
}
#fm-can-select-block:deep(.el-select-dropdown){
      box-shadow:none!important;
    --el-box-shadow : none!important ;
}
.el-select__popper.el-popper{
       box-shadow:none!important;
    --el-box-shadow : none!important ;
} 
#fm-can-select-block:deep(div.el-popper){
      box-shadow:none!important;
    --el-box-shadow : none!important ;
}
#fm-can-select-block:deep(.fm-can-popper){
    box-shadow:none!important;
    --el-box-shadow : none!important ;
}

</style>