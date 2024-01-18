<template>
	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Bei Verordnung von mehr als 1.000 Milligramm THC Wirkstoffgehalt
			(sortenunabhängige Höchstmenge) innerhalb von 30 Tagen muss das die Gesamtmenge überschreitende Rezept mit
			einem „A“ für Ausnahmeverschreibung gekennzeichnet werden.
		</div>
	</fm-can-warning-desc>

	<div class="row fm-can-slider-block pt-3 pb-1">
		<div class="col-12 col-md-6 ps-0">
			<fm-can-value-slider :sliderparams="getExtractMengeSlider" @currentslidervalue="sliderValue($event)"></fm-can-value-slider>
		</div>
	</div>

	<div class="row ps-4" style="padding-top:20px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="!greenButtonState" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>

</template>


<script>
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanValueSlider from '@/components/common/fm-can-value-slider.vue'
import { mapGetters } from 'vuex'
import config from "/src/config.js";

export default ({

	components: {
		FmCanWarningDesc,
		FmCanValueSlider
	},
	computed :{
		...mapGetters(['getExtractMengeSlider'])
	},
	emits:[
		'stepgone'
	],
	data() {
		return {
			config,
			// slidercanektr: { startvalue: 0, endvalue: 150, note: 'Menge (milliliter)', value : 0 },
			greenButtonState : false ,
		}
	},
  methods : {
    sliderValue($event){
      this.$store.commit('setExtractDosierMengeValue',$event) ;
      if( $event > 0){
        this.greenButtonState = true ;
      }else{
        this.greenButtonState = false ;
		this.$emit('stepgone',{
            accpart : 1 ,
            accstate : false
            }
        ) ;
      }
      
    },
	stepGone(){
	this.$emit('stepgone',{
		accpart : 1 ,
		accstate : true
		}
       ) ;
    },
  }
})
</script>