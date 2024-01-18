<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Bei Ausstellung eines GKV-Rezeptes darf laut <a :href="pdfLink" class="fm-fnt-green-link" target="_blank"><strong>Bundesmantelvertrag-Ärzte</strong></a> lediglich ein <span class="fm-fnt-red">Rezepturarzneimittel</span>
			verordnet werden. Das bedeutet, dass für jede Rezeptur einer öligen Cannabidiol-Lösung ein eigenes Rezept
			ausgestellt werden sollte.
		</div>
	</fm-can-regular-desc>

	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Ölige CBD-Lösungen nach NRF 22.10 werden nicht von der <a href="https://www.buzer.de/31_SGB_V.htm/index.htm" class="fm-fnt-green-link" target="_blank"><strong>Cannabisgenehmigung</strong></a>
			abgedeckt. Vor der
			Verschreibung auf einem GKV-Rezept ist ein Antrag auf Kostenübernahme bei der Krankenkasse zu stellen. Bei
			Cannabidiol handelt es sich (im Gegensatz zu Dronabinol, Cannabisblüten und Cannabisextrakte) nicht um ein
			Betäubungsmittel, sondern lediglich um ein verschreibungspflichtiges Arzneimittel.
		</div>
	</fm-can-warning-desc>

	<div class="row fm-can-heading fm-fnt-500-16-22 fm-fnt-black ps-4 pb-3">
		<div class="col-12 fm-can-heading-text">
			Wirkstoffmenge (cbd)
		</div>
	</div>

	<div class="row ps-4 pb-2">
		<div class="col-12 ps-3 pe-5">
			<fm-can-radiogroup :radiogroup="getOligeSorteRadio" @radiochange="setRadioGroup($event)">
			</fm-can-radiogroup>
		</div>
	</div>

	<div class="row fm-can-slider-block pb-1">
		<div class="col-12 col-md-6 ps-0">
			<fm-can-value-slider :sliderparams="getOligeSorteSlider" @currentslidervalue="sliderValue($event)"></fm-can-value-slider>
		</div>	
	</div>

	<div class="row ps-4" style="padding-top:20px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="!greenButtonState" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>

</template>

<script>

import FmCanRegularDesc from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanRadiogroup from '@/components/common/fm-can-radiogroup.vue'
import FmCanValueSlider from '@/components/common/fm-can-value-slider.vue'
import { mapGetters } from 'vuex'
import config from "/src/config.js";


export default ({
	components :{
		FmCanRegularDesc , 
		FmCanWarningDesc,
		FmCanValueSlider,
        FmCanRadiogroup
	},
	computed :{
		...mapGetters(['getOligeSorteRadio','getOligeSorteSlider', 'getOligeSorteSliderDisabled']),
	},
	mounted(){
		let radiobuttons = this.$store.getters.getOligeSorteRadio ;
		let slider = this.$store.getters.getOligeSorteSlider ;
		let radioActive = false ;
		for( let button of radiobuttons){
			if( button.active == true ){
				radioActive = true ;
			}
		}
		if( slider.value > 0 && radioActive){
			this.greenButtonState = true ;
			this.stepGone ;
		}
	},
	emits:[
		'stepgone'
	],
	data(){
       return{
			config,
           radioGroupChange: '',
           radioActive : false ,
           sliderolige: { startvalue: 0, endvalue: 250, step: 1 ,note: 'Menge (milliliter)',value:0 },
           pdfLink : `${config.pdfFolder()}/bundesmantelvertrag-aerzte-cannabis-apotheke.pdf`,
           greenButtonState : false ,

       }
	},
	methods: {
        setRadioGroup($event){
			this.radioActive = true ;
            this.$store.commit('oligeFirstStep',$event.i) ;
        },
        sliderValue($event){
            if(($event *1/1 ) > 0  && this.radioActive ){
                this.greenButtonState = true ;
            }else if(($event *1/1 ) == 0 ){
                this.greenButtonState = false
                this.$emit('stepgone',{
                    accpart :0,
                    accstate : false
                    }
                ) ;
            }
			this.$store.commit('oligeSecStep',$event) ;
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

<style scoped>
 .fm-can-heading-text{
	padding-left:17px;
	padding-top:20px;
 }
</style>
