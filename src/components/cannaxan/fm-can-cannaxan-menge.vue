<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Bei CannaXan handelt es sich um ein cannabishaltiges Spray zur Verabreichung der Wirkstoffe 
			über die Mundschleimhaut. Es können Mundsprays mit jeweils 20 ml Inhalt hergestellt werden.
		</div>
	</fm-can-regular-desc>

	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Bei Verordnung von <strong>mehr als 1.000 Milligramm THC</strong> Wirkstoffgehalt (sortenunabhängige Höchstmenge) 
			innerhalb von 30 Tagen muss das die Gesamtmenge überschreitende Rezept mit einem <strong>„A“</strong> für Ausnahmeverschreibung 
			gekennzeichnet werden
		</div>
	</fm-can-warning-desc>

	<div  class="row fm-can-slider-block pt-2 pb-1">
		<div class="col-12 col-md-6 ps-0">
			<fm-can-value-slider :sliderparams="getCannaxanSlider" @currentslidervalue="sliderValue($event)"></fm-can-value-slider>
		</div>
	</div>

	<div class="row ps-4" style="padding-top:20px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="!greenButtonState" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>

</template>


<script>
import FmCanRegularDesc from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanValueSlider from '@/components/common/fm-can-value-slider.vue'
import { mapGetters } from 'vuex';
import config from "/src/config.js";

export default ({
	
	computed:{
		...mapGetters(['getCannaxanSlider'])
	},
	updated(){
		if( this.$store.getters.getCannaxanslider > 0){
			this.greenButtonState = true ;
		}
	},
	components: {
		FmCanRegularDesc,
		FmCanWarningDesc,
		FmCanValueSlider
	},
	emits:[
		'stepgone'
	],
	data(){
		return{
			config,
			greenButtonState : false ,
			cannaxanstatement : {
				slider : 0, doseED : 0 , doseTD: 0
			} ,
		}
	},
  methods :{
    sliderValue($event){	
      if(($event *1/1 ) > 0){
		this.greenButtonState = true ;
      }else if(($event *1/1 ) == 0 ){
		this.greenButtonState = false
		this.$emit('stepgone',{
			accpart :0,
			accstate : false
        }
        ) ;
      }
      this.$store.commit('canFirstStep',$event) ; // set mutation to store
    },
	stepGone(){
		this.$emit('stepgone',{
			accpart : 0 ,
			accstate : true
			}
		) ;
	}
  }
})
</script>

<style>
.fm-can-btn-weiter{
	color : #FFFFFF ;
	background: #2FDAA0;
	border : 1px solid #2FDAA0;
    border-radius: 2px;
	width: 108px!important;
	height: 48px!important;
	font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
}
.fm-can-btn-weiter:hover{
	background: #2BBB8A;;
	border : 1px solid #2BBB8A;;
}
.fm-can-btn-weiter:disabled{
	background-color: #E4E4E4;
	border : 1px solid #E4E4E4;
}
.fm-can-weiter-image{
	margin-left: 7px;
    position: relative;
    bottom: 1px;
}
</style>