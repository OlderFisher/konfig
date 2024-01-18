<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Bei Ausstellung eines GKV-Rezeptes darf laut <a :href="pdfLink" class="fm-fnt-green-link" target="_blank"><strong>Bundesmantelvertrag-Ärzte</strong></a> lediglich ein <span class="fm-fnt-red">Rezepturarzneimittel</span>
			verordnet werden. Das bedeutet, dass für jede Dronabinol-Rezeptur ein eigenes BtM-Rezept ausgestellt werden
			sollte.
		</div>
	</fm-can-regular-desc>

	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Bei Verordnung von mehr als 500 mg Dronabinol Wirkstoffgehalt 
			muss das die Gesamtmenge überschreitende Rezept mit einem <strong>„A“</strong> für Ausnahmeverschreibung gekennzeichnet werden.
		</div>
	</fm-can-warning-desc>

	<div class="row pt-2 ps-4 pb-1">
		<div class="fm-can-heading fm-fnt-500-16-22 fm-fnt-black">
			<div class="col-12">
				Darreichungsform
			</div>
		</div>
	</div>

	<fm-can-radio-buttons :radiobuttons="getDronabinolSortelRadioButtons" 
		@radiobuttonchecked="setKapselnTropfen($event)">
	</fm-can-radio-buttons>

	<div class="row ps-4">
		<div v-if="radiobuttonschoice" class="row fm-can-heading fm-fnt-500-16-22 fm-fnt-black">
			<div class="col-12">
				Wirkstoffmenge (thc)
			</div>
		</div>
	</div>

	<div v-if="radiobuttonschoice" class="row ps-4 pe-4 pb-2 " style="margin-top:-10px;">
		<div class="col-12 col-lg-6 pt-0 pt-lg-3">
			<fm-can-radiogroup :radiogroup="getDronabinolSorteKapselnSet" @radiochange="setKapselnSet($event)">
			</fm-can-radiogroup>
		</div>
		<div class="col-12 col-lg-6 pe-3" style="margin-top:-15px; padding-left:6px;">
			<fm-can-value-slider :sliderparams="getDronabinolKaplseln"  @currentslidervalue="sliderKapselnValue($event)">
			</fm-can-value-slider>
		</div>
	</div>

	<div v-if="!radiobuttonschoice" class="row fm-can-slider-block pb-1">
		<div class="col-12 col-md-6 ps-0">
			<fm-can-value-slider :sliderparams="getDronabinolTropfen" @currentslidervalue="sliderTropfenValue($event)">
			</fm-can-value-slider>
		</div>
	</div>

	<div class="row ps-4" style="padding-top:16px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="!greenButtonState" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>

   
</template>


<script>
import FmCanRegularDesc	 	from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc 	from '@/components/common/fm-can-warning-desc.vue'
import FmCanRadioButtons 	from '@/components/common/fm-can-radio-buttons.vue'
import FmCanValueSlider 	from '@/components/common/fm-can-value-slider.vue'
import FmCanRadiogroup     from '@/components/common/fm-can-radiogroup.vue'
import { mapGetters } from 'vuex'
import config from "/src/config.js";

export default ({

	components: {
		FmCanRegularDesc,
		FmCanWarningDesc,
		FmCanRadioButtons,
		FmCanValueSlider,
        FmCanRadiogroup
	},
	computed:{
		...mapGetters([
			'getDronabinolSortelRadioButtons',
			'getDronabinolSorteKapselnSet',
			'getDronabinolKaplseln',
			'getDronabinolTropfen',
		]),
	},
	mounted(){
		let kapselnset = this.$store.getters.getDronabinolSortelRadioButtons ;
		
		if( kapselnset[0].checked ){
			this.radiobuttonschoice = true ;
		}else{
			this.radiobuttonschoice = false ;
		}
		if( !kapselnset[0].checked && !kapselnset[0].checked){
			this.radiobuttonschoice = true ;
		}
	},
	emits:[
		'stepgone'
	],
	data(){
		return{
			config,
			radiobuttonschoice : true,
            radioGroupChange: '',
			pdfLink : `${config.pdfFolder()}/bundesmantelvertrag-aerzte-cannabis-apotheke.pdf`,
			greenButtonState : false ,
		}
	},
	methods : {
        setKapselnTropfen(value){		
			console.log(value);
        this.$store.commit('dronSorteKapselnStep',value) ;
			if( value == 1){
				this.radiobuttonschoice = false ;
			}else{
				this.radiobuttonschoice = true ;
			}
       
        },
        setKapselnSet($event){   
          this.$store.commit('dronPillsThcStep',$event.i) ;
        },

        sliderKapselnValue($event){
           this.$store.commit('dronPillsStep',$event) ;
		
           if( ($event *1/1 ) > 0){
				this.greenButtonState = true ;
            }else if(($event *1/1 ) == 0 ){
				this.greenButtonState = false
				this.$emit('stepgone',{
                accpart :0,
                accstate : false
                }
              ) ;
            }
        },
       stepGone(){
          this.$emit('stepgone',{
            accpart : 0 ,
            accstate : true
            }
          ) ;
        },
        sliderTropfenValue($event){

          this.$store.commit('dronTropfenStep',$event) ;
		
          if( ($event *1/1 ) > 0){
				this.greenButtonState = true ;
				// this.stepGone() ;
            }else if(($event *1/1 ) == 0 ){
              this.greenButtonState = false
              this.$emit('stepgone',{
                accpart :0,
                accstate : false
                }
              ) ;
            }
        }
	}
})
</script>
<style scoped>

.fm-can-heading {
	padding-left: 17px;
	padding-top: 20px;
}

@media  screen and (max-width:415px) {
	.fm-can-heading{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 22px;
		text-transform: capitalize;
		color: #1C1C1C;
		
	}
}
</style>