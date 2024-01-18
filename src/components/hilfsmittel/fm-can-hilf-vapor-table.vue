<template>
<div  class="fm-can-hilsmittel-output ms-0 me-0 pt-4 pb-1 ps-3" >
    <div  v-for="(vaporizer,i) in vaporizes" :key=i  class="row col-12 fm-can-vapor-output-element pt-3 pb-3 ps-4 pe-3">
        <div class="col-12 col-sm-6" @click="openModal(vaporizer)">
            <div class="col-12 fm-can-vapor-image-block" style="text-align:center">
                <p class="fm-fnt-500-20-22 fm-fnt-black mb-4">{{ vaporizer.productname}}</p> 

                <el-carousel :arrow="arrow" :height="height" :interval="4000" :indicator-position="position">
                  <el-carousel-item>
                    <div class="item d-flex" style="justify-content:center" @click="openModal(vaporizer)">
                      <img class="item__image" :src="vaporizer['featuredimage'].src" alt="" height="150" width="150" @click="openModal(vaporizer)" />
                    </div>
                  </el-carousel-item>
                  <el-carousel-item v-for="(image,i) in vaporizer.images" :key="i">
                    <div class="item d-flex" style="justify-content:center">
                      <img class="item__image" :src="image.src" alt="" height="150" width="150" />
                    </div>
                  </el-carousel-item>
                </el-carousel>

                <div class="fm-can-amount-buttons fm-fnt-400-19-22 fm-fnt-black mb-1 mt-2 d-flex">
                    <fm-can-hilf-amount-selector :product="vaporizer.productname" :id="vaporizer.productname" :amount_="setAmountCurrent(vaporizer.productname)" @setmodal="setErrorModal" @setamount="setAmount($event)"></fm-can-hilf-amount-selector>
                </div>  
            </div>
        </div>    
        <div class="col-12 col-sm-6">
            <div v-html="vaporizer.productdescription" class="col-12 fm-can-gadget-description ps-5" ></div>
        </div>
        <hr v-if="lastElementBorder(vaporizes,i)" class="mt-4 mb-0">
    </div>
</div> 

<fm-can-modal-message :open="isProductModal" @closemodal="closeProductModal">Es dürfen maximal 3 Produkte mittels dieses Rezeptes verschrieben werden.</fm-can-modal-message>

<fm-can-hilf-modal-gallery :open="isOpenModal" :gadget="gadgetModal" @closemodal="closeModal" >
    </fm-can-hilf-modal-gallery>
</template>

<script>
import FmCanHilfAmountSelector from '@/components/hilfsmittel/fm-can-hilf-amount-selector.vue'
import FmCanModalMessage from '@/components/common/fm-can-modal-message.vue'
import FmCanHilfModalGallery from '@/components/hilfsmittel/fm-can-hilf-modal-gallery.vue'
import { ElCarousel , ElCarouselItem} from 'element-plus'
export default ({

    created(){
        this.gadgetModal = JSON.parse(JSON.stringify(this.emptyGallery)) ;
    },
    props :{
        vaporizes : Object ,
    },
    emits:[
      'chosen'
    ],
    components : {
        FmCanHilfAmountSelector,
        FmCanHilfModalGallery,
        FmCanModalMessage,
         ElCarousel,
         ElCarouselItem
    },
    computed:{
     
    },
    data(){
        return{
            stringArr : [],
            imagesArr : [],
            arrow : 'never',
            height : '170px',
            position : 'outside',
            gadgetModal : [],
            isOpenModal : false ,
            isProductModal : false ,
            emptyGallery : { featuredimage :{ src: ''}},
            amountcounter : 0,
            
        }
    },
    methods : {
       openModal(vaporizer){
          this.isOpenModal = true ;
          this.gadgetModal = JSON.parse(JSON.stringify(vaporizer))
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

    img:hover{
        cursor :zoom-in;
        cursor: -moz-zoom-in ;
        cursor:-webkit-zoom-in;
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
    color: #2FDAA0;
    text-decoration: none!important;
  }
  .fm-can-gadget-description:deep(a:hover){
    color: #198754!important;
    text-decoration: underline!important;
  }
  .fm-can-gadget-description:deep(a:visited){
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
