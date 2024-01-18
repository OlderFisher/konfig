<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Auf jedem Betäubungsmittelrezept muss eine Gebrauchsanweisung / Dosierung mit Einzel- und Tageshöchstmenge
			angegeben werden. Liegt dem Patienten eine schriftliche Gebrauchsanweisung vor, so reicht der Hinweis „gemäß
			schriftlicher Anweisung“ auf dem Rezept.
		</div>
	</fm-can-regular-desc>

	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Bei Verordnung von mehr als 100 Gramm Cannabisblüten (sortenunabhängige
			Höchstmenge) innerhalb von 30 Tagen muss das die Gesamtmenge überschreitende Rezept mit einem „A“ für
			Ausnahmeverschreibung gekennzeichnet werden.
		</div>
	</fm-can-warning-desc>

	<div style="margin-top:25px"></div>

	<fm-can-radio-buttons :radiobuttons="getDosierRadioButtons"
		@radiobuttonchecked="setAlternativ($event)">
	</fm-can-radio-buttons>

	<div style="margin-top:22px"></div>
	
	<div v-if="!alternativ" class="row ps-4 pe-4">
		<div class="col-12 col-lg-6">
			<fm-can-radiogroup :radiogroup="getBluteDosierRadioDosage" @radiochange="setRadioGroup($event)">
			</fm-can-radiogroup>
		</div>
	</div>

	<div v-if="!alternativ" class="row form-group fm-can-dosier-inputs-block pt-3 pb-2 ps-4 pe-4">
		<div class="col-12 col-md-6" v-for="(field,i) in getBluteDosierInputFields" :key="i">
			<fm-can-dosier-inputs :title="field.title" :placehold="field.placehold" :value="field.value"
				:id="field.id" @inputvalue="onInput($event)">
			</fm-can-dosier-inputs>
		</div>
	</div>

	<fm-can-textarea v-if="alternativ" :data="getBluteDosierTextarea" @textareavalue="getTextAreaValue($event.value)"
		:placeholder="textareaplaceholder"></fm-can-textarea>

	<fm-can-final-message :showStatement="getCanBluteFinalMessage"></fm-can-final-message>	

</template>


<script>
import FmCanRegularDesc 	from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc 	from '@/components/common/fm-can-warning-desc.vue'
import FmCanRadioButtons 	from '@/components/common/fm-can-radio-buttons.vue'
import FmCanDosierInputs 	from '@/components/common/fm-can-dosier-inputs.vue'
import FmCanTextarea 		from '@/components/common/fm-can-textarea.vue'
import FmCanRadiogroup from '@/components/common/fm-can-radiogroup.vue'
import FmCanFinalMessage from '@/components/common/fm-can-final-message.vue'
import { mapGetters } from 'vuex'


export default ({

	components: {
		FmCanRegularDesc,
		FmCanWarningDesc,
		FmCanRadioButtons,
		FmCanDosierInputs,
		FmCanTextarea,
		FmCanRadiogroup,
		FmCanFinalMessage
	},
	computed :{
		...mapGetters([
			'getBluteDosierTextarea',
			'getDosierRadioButtons',
			'getBluteDosierInputFields',
			'getBluteDosierRadioDosage',
			'getCanBluteFinalMessage'
			])
	},
	mounted(){
		let radiobuttons = this.$store.getters.getDosierRadioButtons;
		if( radiobuttons[1].checked ){
			this.alternativ = true ;
		}else{
			this.alternativ = false;
		}
	},
	emits:[
		'stepgone'
	],
	data() {
		return {
			
			radioButtonsName : 'canblutedosier',
			alternativ: false,
			textareavalue: '' ,
			textareaplaceholder: 'Fügen Sie die Diagnose hinzu..(5 Buchstaben min)',
			finalMessage :false,
			outputValues : ['',''],
		}
	},
	methods: {
		setAlternativ(value) {
			if( value == 0 ){
				this.alternativ = false ;
			}else{
				this.alternativ = true ;
			}
			this.$store.commit('setCanBluteFinalMessage',false);
                   this.$emit('stepgone',{
                       accpart : 2 ,
                       accstate : false,
                   }
                   )
            this.$store.commit('setBluteDosierRadioStep',value) ; 	   
		},
		onInput($event) {
			let i = $event.index * 1 - 1;
			let val = $event.value;
			
			if( val.match(/^[0-9]*([.,][0-9]+)?$/)){
				this.outputValues[i] = val ;
				this.$store.commit('setBluteDosierDosen',this.outputValues) ;
			}

			if( this.outputValues[0] && this.outputValues[1]){
				this.$store.commit('setCanBluteFinalMessage',true);
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : true,
                   }	    
				)
			}else{
				this.$store.commit('setCanBluteFinalMessage',false);
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : false,
                }
				)
			}

		},
		getTextAreaValue(value) {
			this.textareavalue = value;
			if( this.alternativ && value.length > 5){
				this.$store.commit('setCanBluteFinalMessage',true);
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : true,
                   }	    
				)
				this.$store.commit('setBluteTextArea',value )
			}else{
				this.$store.commit('setCanBluteFinalMessage',false);
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : false,
                }
				) 
			}
		},
        setRadioGroup($event){
          let index = $event.i ;
          this.$store.commit('setBluteDosierRadioDosage',index )
    },
	},
	
})
</script>