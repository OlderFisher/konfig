<template>
    <div v-if="!viewMobile" class="row ps-4 pe-4">
        <div class="col-12">
            <div class="fm-table-header d-flex flex-row fm-fnt-400-14-16 fm-fnt-grey-text ">
                <div class="fm-can-title fm-can-title-extrakt">Extrakt</div>
                <div class="fm-can-title fm-can-title-genetik">Genetik</div>
                <div class="fm-can-title fm-can-title-thc-cbd">THC/CBD*</div>
                <div class="fm-can-title fm-can-title-kultivar">Kultivar/Sorte</div>
                <div class="fm-can-title fm-can-title-vorrat">Vorrat</div>
            </div>
            <div class="fm-can-overflow">
                <div class="fm-can-table-body d-flex flex-row fm-fnt-black" v-for="(element, i) in canlist" :key="i"
                    @click="setActive(i)" :class="setClass(element.active)">
                    <div class="fm-can-element fm-can-element-sorte fm-fnt-400-14-22">{{ element.productname }}</div>
                    <div class="fm-can-element fm-can-element-genetik fm-fnt-300-14-22">{{ element.genetic }}</div>
                    <div class="fm-can-element fm-can-element-thc-cbd fm-fnt-300-14-22">{{ element.thc }} / {{
                        element.cbd}}</div>
                    <div class="fm-can-element fm-can-element-kultivar fm-fnt-300-14-22">{{ element.cultivar }}</div>
                    <div class="fm-can-element fm-can-element-vorrat fm-fnt-300-14-22">
                        <img v-bind:src="getVorratSrc(element.availability)" alt="vorrat_image">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div v-if="viewMobile" class="row pt-3 pb-5 ps-2 pe-2">
        <div class="fm-can-overflow">
            <div class="fm-can-mobile-table-body" v-for="(element, i) in canlist" :key="i" @click="setActive(i)"
                :class="setClass(element.active)">
                <div class="fm-can-mobile-element fm-can-mobile-element-sorte fm-fnt-500-14-22">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" :name="element.productname" :id="setId(element.productname,i)"
                            :value="setValue(element.productname,i)" :checked="element.active" @click="setActive(i)">
                        <label class="form-check-label fm-fnt-500-14-22 fm-fnt-black" :for="element.productname">
                            {{ element.productname }}
                        </label>
                    </div>
                </div>

                <div class="d-flex flex-row">
                    <div class="fm-can-genetik-column d-flex flex-column">
                        <div class="fm-can-mobile-title fm-can-mobile-title-genetik fm-fnt-300-12-16 fm-fnt-grey-text">
                            Genetik</div>
                        <div class="fm-can-mobile-element fm-can-mobile-element-genetik fm-fnt-400-14-22 fm-fnt-black">
                            {{ element.genetic }}</div>
                    </div>

                    <div class="fm-can-thc-column d-flex flex-column">
                        <div class="fm-can-mobile-title fm-can-mobile-title-thc-cbd fm-fnt-300-12-16 fm-fnt-grey-text">
                            THC/CBD*</div>
                        <div class="fm-can-mobile-element fm-can-mobile-element-thc-cbd fm-fnt-400-14-22 fm-fnt-black">
                            {{ element.thc }} / {{
                            element.cbd}}</div>
                    </div>
                    <div class="fm-can-kultivar-column d-flex flex-column">
                        <div class="fm-can-mobile-title fm-can-mobile-title-kultivar fm-fnt-300-12-16 fm-fnt-grey-text">
                            Kultivar</div>
                        <div class="fm-can-mobile-element fm-can-mobile-element-kultivar fm-fnt-400-14-22 fm-fnt-black">
                            {{ element.cultivar }}
                        </div>
                    </div>
                    <div class="fm-can-vorrat-column d-flex flex-column">
                        <div class="fm-can-mobile-title fm-can-mobile-title-vorrat fm-fnt-300-12-16 fm-fnt-grey-text">
                            Vorrat</div>
                        <div class="fm-can-mobile-element fm-can-mobile-element-vorrat fm-fnt-400-14-22 fm-fnt-black">
                            <img v-bind:src="getVorratSrc(element.availability)" alt="vorrat_image">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div id="modals">

    <fm-can-extrakt-modal :open="isOpenModal" :extract="extractModal" @closemodal="closeModal" @cancelmodal="cancelModal">
    </fm-can-extrakt-modal>
  </div>
</template>

<script>
import FmCanExtraktModal from '@/components/cannabisextrakt/fm-can-extrakt-modal.vue'
import config from "/src/config.js";

export default {
    
    mounted() {
        this.config_popup_special_extract = JSON.parse(JSON.stringify(this.$store.getters.getSpecialExtractLightboxData))
        this.viewMobile = window.screen.availWidth < 415 ? true : false;
    },
    props : {
        canlist: { type: Object, required: true }
    },
    emits : [
      'setactivextrakt',
    ],
    components : {
        FmCanExtraktModal
    },
    data(){
      return {
          config,
          vorrat_true : `${config.svgFolder()}/vorrat_green.svg`,
          vorrat_false : `${config.svgFolder()}/vorrat_red.svg`,
          viewMobile : false ,
          isOpenModal : false,
          config_popup_special_extract: [],
          extractModal : {   
                    name : '', 
                    button : [],
                    minSliderAmount:0,
                    maxSliderAmount:0,
                    unit: 'mg/ml',
                    type: 'thcandcbd',
                    base: 'THC',
                    
           },
           specExtrakt : false,
           specExtraktChoice : false,
           currentSpecExtrakt : null,
      }
    },
    methods : {
        getVorratSrc(vorrat){
            return ( vorrat > 0 ) ? this.vorrat_true : this.vorrat_false ;
        },
        setActive(i){
            for( let extract of  this.config_popup_special_extract){
                if( this.canlist[i].productname === extract.name){
                    this.extractModal = extract ;
                    this.specExtrakt = true ;               
                    this.currentSpecExtrakt = i ;
                    this.isOpenModal = true ;
                }
            }
            if( !this.specExtrakt) {
                this.$emit('setactivextrakt',{
                   index : i
                }) ;
            }
            
        },
        setClass(value){
            return {
                'fm-can-active-back' : value == true,
                'fm-can-regular-back': value == false,
            }
        },
        setId(name, i) {
            return name + i;
        },
        setValue(name, i) {
            return name + i;
        },
        isMobile(){
            this.viewMobile = window.screen.availWidth < 415 ? true : false;
        },
        openModal(){
            this.isOpenModal = true ;
        },
        closeModal(){
          this.isOpenModal = false ;
          if( this.$store.getters.getSpecialExtractStatement ){
                this.$emit('setactivextrakt',{
                    index : this.currentSpecExtrakt,
                }) ;
               this.specExtraktChoice = false ;           
               this.currentSpecExtrakt = null ; 
           }
           this.specExtrakt = false ;                
        },
        cancelModal(){
          this.isOpenModal = false;
          this.$store.commit('setClearaSpecailExtractData');
        },
        
    },
    
    


}
</script>

<style scoped>
.fm-can-overflow{
    max-height: 465px!important;
    overflow-y: scroll;
    overscroll-behavior: none;
}
.fm-can-table-body{
    border-bottom : 1px solid #DBDFEC ;
}
.fm-can-table-body:last-of-type{
    border-bottom:none ;
}
.fm-can-table-body:hover{
    background-color: #F2F2F2;
    cursor:pointer ;
}

.fm-can-title{
    background-color: #F5F5F6;
    border-radius : 2px 2px 0px 0px;
    padding : 9px 0px 9px 20px;
}
.fm-can-element {
    padding : 9px 0px 9px 20px;
}
.fm-can-title-extrakt, .fm-can-element-sorte{
    width:38% ;
}
.fm-can-title-genetik{
    width:10%;
    padding-left:10px!important;
}
.fm-can-element-genetik{
   width:10%;
}
.fm-can-title-thc-cbd{
    width:12%;
    padding-left:10px!important;
}
.fm-can-element-thc-cbd{
    width:12%;  
}
.fm-can-title-kultivar{
    width:30%;
    padding-left:10px!important;
}
.fm-can-element-kultivar{
    width:30%;
}
.fm-can-title-vorrat{
    width:10%;
    padding-left:10px !important;
    padding-right: 20px!important;
}
.fm-can-element-vorrat{
    width:10%;
}

.fm-can-element-vorrat{
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
    padding-left: 5px ;
}
.fm-can-regular-back{
    background-color: #FFFFFF ;
}
.fm-can-active-back{
    background-color: #D5F8EC;
}

@media screen and ( max-width : 415px){

    .fm-can-regular-back, .fm-can-mobile-table-body{
        padding-left: 10px!important;
        padding-right:5px !important;
    }
    .fm-can-element-sorte{
        width : 100% ;
    }
    .fm-can-genetik-column{
        width : 20%;
    }
    .fm-can-thc-column{
        width: 22%;
    }
    .fm-can-kultivar-column{
        width: 55%;
    }
    .fm-can-vorrat-column{
        width: 10% ;
        text-align: center;
    }
    .fm-can-mobile-table-body{
        padding : 10px 0 ;
        border-top : 1px solid #DBDFEC ;
        border-bottom : 1px solid #DBDFEC ;
    }
    .fm-can-mobile-element{
       padding-top: 5px ;
    }
    .fm-can-mobile-element-sorte {
        padding-bottom: 10px;
    }
    .form-check-input:checked {
        background-color: #2fdaa0!important;
        border-color: #2fdaa0!important;
    }

}


</style>