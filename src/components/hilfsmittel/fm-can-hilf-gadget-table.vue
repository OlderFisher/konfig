<template>

<fm-can-hilf-gadgets-filter  @filterchanged="applyFilter($event.filter)"></fm-can-hilf-gadgets-filter>

<div  class= "ms-0 me-0 pt-4 pb-1 ps-3" >
  <div  class="fm-can-hilsmittel--gadgets-output">
    <div  v-for="(gadget,i) in allGadgets" :key=i  class="row col-12 fm-can-vapor-output-element pt-3 pb-3 ps-4 pe-3">
        <div class="col-12 col-sm-6" @click="openModal(gadget)">
            <div class="col-12" style="text-align:center">
                <p class="fm-fnt-500-20-22 fm-fnt-black mb-4">{{ gadget.productname}}</p> 

                <el-carousel :arrow="arrow" :height="height" :interval="4000" :indicator-position="position" >
                  <el-carousel-item>
                    <div class="item d-flex" style="justify-content:center" @click="openModal(gadget)">
                      <img class="item__image" :src="gadget['featuredimage'].src" alt="" height="150" width="150" @click="openModal(gadget)"/>
                    </div>
                  </el-carousel-item>
                  <el-carousel-item v-for="(image,i) in gadget.images" :key="i">
                    <div class="item d-flex" style="justify-content:center">
                      <img class="item__image" :src="image.src" alt="" height="150" width="150" />
                    </div>
                  </el-carousel-item>
                </el-carousel>

                <div class="fm-can-amount-buttons fm-fnt-400-19-22 fm-fnt-black mb-3 mt-5 d-flex">
                    <fm-can-hilf-amount-selector :product="gadget.productname" @setmodal="setErrorModal" :amount_="setAmountCurrent(gadget.productname)" @setamount="setAmount($event)"></fm-can-hilf-amount-selector>
                </div>  

            </div>
        </div>    
        <div class="col-12 col-sm-6 fm-can-gadget-description-column d-flex">
            <div v-html="gadget.productdescription" class="col-12 fm-can-gadget-description  ps-2 ps-sm-5" > </div>
            <div class="fm-can-relat-products d-flex  ps-2 ps-sm-5 mt-2">
                <span v-for="(product,i) in gadget.relational_product" :key="i" class="fm-can-relat-product-label fm-fnt-300-12-18 fm-fnt-green ps-2 pt-1 pe-2 pb-1 me-2">{{product.label}}</span>
            </div>
        </div>
        <hr v-if="lastElementBorder(allGadgets,i)" class="mt-4 mb-0">
    </div>
  </div>  
</div> 

<fm-can-modal-message :open="isProductModal" @closemodal="closeProductModal">Es dürfen maximal 3 Produkte mittels dieses Rezeptes verschrieben werden.</fm-can-modal-message>

<fm-can-hilf-modal-gallery :open="isOpenModal" :gadget="gadgetModal" @closemodal="closeModal" >
    </fm-can-hilf-modal-gallery>


</template>
<script>
import FmCanHilfAmountSelector from '@/components/hilfsmittel/fm-can-hilf-amount-selector.vue'
import FmCanHilfGadgetsFilter from '@/components/hilfsmittel/fm-can-hilf-gadgets-filter.vue'
import FmCanModalMessage from '@/components/common/fm-can-modal-message.vue'
import FmCanHilfModalGallery from '@/components/hilfsmittel/fm-can-hilf-modal-gallery.vue'
import { ElCarousel , ElCarouselItem} from 'element-plus'

export default ({
   mounted(){
      this.gadgetsListOriginal = JSON.parse(JSON.stringify(this.gadgets )) ;
      this.allGadgets = JSON.parse(JSON.stringify(this.gadgets )) ;
   },
    props :{
        gadgets : Object ,
    },
     emits:[
      'chosen'
    ],
    components : {
        FmCanHilfAmountSelector,
        FmCanHilfGadgetsFilter,
        FmCanHilfModalGallery,
        FmCanModalMessage,
        ElCarousel , 
        ElCarouselItem
    },
    data(){
        return{
            stringArr : [],
            imagesArr : [],
            arrow : 'never',
            height : '170px',
            position : 'outside',
            gadgetsListOriginal : [],
            allGadgets : [] ,
            filteredList : [],
            gadgetModal : { featuredimage :{ src: ''} },
            isOpenModal : false ,
            isProductModal : false ,
            emptyGallery : { featuredimage :{ src: ''} },
            amountcounter : 0,
        }
    },
    methods : {

        openModal(gadget){
          this.isOpenModal = true ;
          this.gadgetModal = JSON.parse(JSON.stringify(gadget))
        },
        closeModal(){
          this.gadgetModal=JSON.parse(JSON.stringify(this.emptyGallery));
          this.isOpenModal = false ;
            
        },
        closeProductModal(){
          this.isProductModal = false ;
        },
        setErrorModal(){
          this.isProductModal = true;
        },
        lastElementBorder(gadgets,currentElement){
            if( currentElement < gadgets.length-1) {
                return true;
            }else {
                return false ;
            }
        },
        setAmount($event){

          if( $event.operation == 'add' ) {
              this.$emit('chosen',true);
              this.amountcounter++ ;
              this.$store.commit('hilfAddGadget',[$event.amount,$event.product]) ;
          }
          if( $event.operation == 'remove'){
              this.amountcounter-- ;
              this.$store.commit('hilfAddGadget',[$event.amount,$event.product]) ;
              if( this.amountcounter == 0){
                  this.$emit('chosen',false);
              }
          }
       
        },

        applyFilter(filterCond){

          //filter by brand Mighty
          let arrByMighty =[];       
          if( !filterCond.brand.mighty ){
            for( let element of this.gadgetsListOriginal ){
              let fixed = 0 ;
                for( let product of element.relational_product ){
                  if( product.label.indexOf('Mighty') != -1){
                      fixed = 1 ;
                  }
                }
                if ( fixed === 0 ){
                  arrByMighty.push(element) ;
                }
            }
          }else {
            arrByMighty = JSON.parse(JSON.stringify(this.gadgetsListOriginal)) ;
          }

          //filter by brand Volcano

          let arrByVolcano=[];       
          if( !filterCond.brand.volcano ){
            for( let element of arrByMighty ){
              let fixed = 0 ;
                for( let product of element.relational_product ){
                  if( product.label.indexOf('Volcano') != -1){
                      fixed = 1 ;
                  }
                }
                if ( fixed === 0 ){
                  arrByVolcano.push(element) ;
                }
            }
          }else {
            arrByVolcano = JSON.parse(JSON.stringify(arrByMighty)) ;
          }

          // filter by Search
          let arrBySearch =[];
          let productSearch = filterCond.search.trim().toLowerCase() ;
          if( productSearch.length > 0 ){
                for(let product of arrByVolcano){
                  let currentProduct = product.productname.trim().toLowerCase() ;
                  if( currentProduct.indexOf(productSearch) !== -1) {
                    arrBySearch.push(product) ;
                  }
                }
          }else{
            arrBySearch = JSON.parse(JSON.stringify(arrByVolcano)) ;
          }

          // final array to output
          this.allGadgets = JSON.parse(JSON.stringify(arrBySearch)) ;

        },
        setAmountCurrent(productname){
          let gadgetTable = JSON.parse(JSON.stringify(this.$store.getters.getGadgetStatementTable))

          let amount = 0 ;
          for( let gadget of gadgetTable){
              if( productname == gadget.name){
                   amount = Number.parseInt(gadget.amount,10) ; 
              }
          }
        return amount ;
      }
    }
})
</script>
<style scoped>
     .fm-can-hilsmittel--gadgets-output{
         max-height:740px;
         overflow-y:scroll; 
     }  
     img:hover{
         cursor : url('~search_grey.svg') 45 45, move ;
     }

    .fm-can-gadget-description-column{
      flex-direction: column;  
      justify-content: center;
      /* align-items: center; */
    }
    .fm-can-relat-product-label{
        background-color: #F5F5F6;
    }
    .fm-can-gadget-description:deep(ul) {
      list-style:none!important;
      font-family: 'Ubuntu'!important;
      font-style: normal!important;
      font-weight: 400!important;
      font-size: 14px!important;
      line-height: 18px!important;
      color: #1C1C1C!important;
    } 
     .fm-can-gadget-description:deep(ul>li){
      margin-bottom:0.6rem !important ;
    }
    .fm-can-gadget-description:deep(ul>li)::before { 
      content: "•"; 
      color: #2FDAA0!important;
      display: inline-block; width: 1em;
      margin-left: -1em
    }
    .fm-can-gadget-description:deep(a){
      font-family: 'Ubuntu'!important;
      font-style: normal!important;
      font-weight: 400!important;
      font-size: 14px!important;
      line-height: 16px!important;
      color: #2FDAA0!important;
      text-decoration: none!important;
    }
    .fm-can-gadget-description:deep(a):hover{
      color: #2FDAA0!important;
      text-decoration: none!important;
    }
    .fm-can-gadget-description:deep(a):visited{
      color: #2FDAA0!important;
      text-decoration: none!important;
    }
    .fm-can-gadget-description:deep(span){
      font-family: 'Ubuntu'!important;
      font-style: normal!important;
      font-weight: 400!important;
      font-size: 14px!important;
      line-height: 18px!important;
      color: #1C1C1C!important;
    }
    .fm-can-amount-buttons{
      justify-content: center;
    }
</style>
