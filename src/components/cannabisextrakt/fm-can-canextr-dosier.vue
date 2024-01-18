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
			<strong>ACHTUNG:</strong> Ohne eine entsprechende Angabe ist ein BtM-Rezept nicht gültig und kann nicht
			beliefert werden. Bei Verordnung mehrerer Cannabisextrakte muss für jede einzelnen Extrakt eine Dosierung
			angegeben werden.
		</div>
	</fm-can-warning-desc>

	<div style="margin-top:25px"></div>

	<fm-can-radio-buttons :radiobuttons="getExtractDosierRadioButtons" 
		@radiobuttonchecked="setAlternativ($event)">
	</fm-can-radio-buttons>

	<div style="margin-top:22px"></div>
	<div v-if="!alternativ" class="row ps-4 pe-4 ">
		<div class="col-12 col-lg-6">
			<fm-can-radiogroup :radiogroup="getExtractDosierRadioDosage" @radiochange="setRadioDosage($event)">
			</fm-can-radiogroup>
		</div>
	</div>

	<div v-if="!alternativ" class="row form-group fm-can-dosier-inputs-block pt-3 pb-2 ps-4 pe-4">
		<div class="col-12 col-md-6" v-for="(field,i) in getExtractDosierInputFields" :key="i">
			<fm-can-dosier-inputs :title="field.title" :placehold="field.placehold" :value="field.value"
                :id="field.id" @inputvalue="onInput($event)">
			</fm-can-dosier-inputs>
		</div>
	</div>

	<fm-can-textarea v-if="alternativ" :data="getExtractDosierTextarea" @textareavalue="getTextAreaValue($event.value)"
		:placeholder="textareaplaceholder"></fm-can-textarea>

<fm-can-final-message :showStatement="getCanExtractFinalMessage"></fm-can-final-message>

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
		FmCanTextarea ,
		FmCanRadiogroup,
		FmCanFinalMessage
	},
	computed :{
		...mapGetters([
			'getExtractDosierTextarea',
			'getExtractDosierRadioButtons',
			'getExtractDosierInputFields',
			'getExtractDosierRadioDosage',
			'getCanExtractFinalMessage'
			])
	},
	mounted(){
		let radiobuttons = this.$store.getters.getExtractDosierRadioButtons;
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

			radioButtonsName : 'canextrdosier',
			alternativ : false ,
			textareavalue : '',
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
			this.$store.commit('setCanExtractFinalMessage',false) ;
                   this.$emit('stepgone',{
                       accpart : 2 ,
                       accstate : false,
                   }
                   )
            this.$store.commit('setExtractDosierRadioStep',value) ; 
		},
		onInput($event) {
			let i = $event.index * 1 - 1;
			let val = $event.value;
			
			if( val.match(/^[0-9]*([.,][0-9]+)?$/)){
				this.outputValues[i] = val ;
				this.$store.commit('setExtractDosierInputs',this.outputValues) ;
			}

			if( this.outputValues[0] && this.outputValues[1]){
				this.$store.commit('setCanExtractFinalMessage',true) ;
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : true,
                   }	    
				)
			}else{
				this.$store.commit('setCanExtractFinalMessage',false) ;
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : false,
                }
				)
			}
		},
		getTextAreaValue(value){
			this.textareavalue = value;
			if( this.alternativ && value.length > 5){
				this.$store.commit('setCanExtractFinalMessage',true) ;
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : true,
                   }	    
				)
				this.$store.commit('setExtractTextArea',value )
			}else{
				this.$store.commit('setCanExtractFinalMessage',false) ;
				this.$emit('stepgone',{
                    accpart : 2 ,
                    accstate : false,
                }
				) 
			}
		},
        setRadioDosage($event){
          this.$store.commit('setExtractDosierRadioDosage',$event )
        },

	
    },

	
})
</script>