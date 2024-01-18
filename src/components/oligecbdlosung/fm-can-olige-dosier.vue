<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Betäubungsmittelrezept muss eine Gebrauchsanweisung / Dosierung mit Einzel- und Tageshöchstmenge angegeben
			werden. Liegt dem Patienten eine schriftliche Gebrauchsanweisung vor, so reicht der Hinweis „gemäß
			schriftlicher Anweisung“ auf dem Rezept.
		</div>
	</fm-can-regular-desc>

	<fm-can-warning-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			<strong>ACHTUNG:</strong> Bei Ausstellung eines GKV-Rezeptes darf laut Bundesmantelvertrag-Ärzte lediglich
			ein Rezepturarzneimittel verordnet werden. Das bedeutet, dass für jede Blütensorte ein eigenes BtM-Rezept
			ausgestellt werden sollte.
		</div>
	</fm-can-warning-desc>

	<div style="margin-top:25px;"></div>
	<fm-can-radio-buttons 
	:radiobuttons="getOligeDosierRadioButtons" 
	@radiobuttonchecked="setRadioChoice($event)">
	</fm-can-radio-buttons>

	<div style="margin-top:20px;"></div>

	<div v-if="!getAlternative" class="row ps-4 pb-2">
		<div class="col-12">
			<fm-can-radiogroup :radiogroup="getOligeDosierDoseKind" @radiochange="setRadioGroup($event)">
			</fm-can-radiogroup>
		</div>
	</div>

	<div v-if="!getAlternative" class="row form-group fm-can-dosier-inputs-block pt-3 pb-3 ps-4 pe-4 mb-3">
		<div class="col-12 col-md-6" v-for="(field,i) in getOligeDosierInputs" :key="i">
			<fm-can-dosier-inputs :title="field.title" :placehold="field.placehold" :value="field.value"
				:id="field.id" :disabled="field.disabled" @inputvalue="onInput($event)">
			</fm-can-dosier-inputs>
		</div>
	</div>

	<fm-can-textarea v-if="getAlternative" @textareavalue="getTextAreaValue($event.value)"
		:placeholder="textareaplaceholder" :data="getOligeTextArea" ></fm-can-textarea>

	<fm-can-final-message :showStatement="getOligeFinalMessage"></fm-can-final-message>

</template>


<script>
import FmCanRegularDesc from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanRadioButtons from '@/components/common/fm-can-radio-buttons.vue'
import FmCanRadiogroup from '@/components/common/fm-can-radiogroup.vue'
import FmCanDosierInputs from '@/components/common/fm-can-dosier-inputs.vue'
import FmCanTextarea from '@/components/common/fm-can-textarea.vue'
import FmCanFinalMessage from '@/components/common/fm-can-final-message.vue'
import { mapGetters } from 'vuex'


export default ({

	components: {
		FmCanRegularDesc,
		FmCanWarningDesc,
		FmCanRadioButtons,
		FmCanRadiogroup,
		FmCanDosierInputs,
		FmCanTextarea,
		FmCanFinalMessage
	},
	updated(){
		let altStatement = this.$store.getters.getOligeDosierRadioButtons ;
		if( altStatement[1].checked){
			this.alternativ = true ;
		}
		else{
			this.alternativ = false;
		}
	},
	computed:{
		...mapGetters([
			'getOligeDosierRadioButtons',
			'getOligeDosierDoseKind',
			'getOligeDosierInputs',
			'getOligeTextArea',
			'getOligeFinalMessage',
			'getAlternative'
			]),
		
	},
	emits:[
		'stepgone'
	],
	data(){
		return {
			alternativ: false,
			textareavalue: '',
			textareaplaceholder: 'Fügen Sie die Diagnose hinzu..(10 Buchstaben min.)' ,
			finalMessage : false,
			outputValues : ['','']
		}
	},
	methods:{ 
		setRadioChoice(value) {
			if( value == 1 ){
            this.alternativ = true;
			this.$store.commit('setOligeFinalMessage',false) ;
                   this.$emit('stepgone',{
                       accpart : 1 ,
                       accstate : false,
                   }
                   )
			}else{
				this.alternativ = false;
			}
			
            this.$store.commit('oligeRadioStep',value) ;  
			
		},
		onInput($event){
			
			let i = $event.index * 1/1 - 1;
			let val = $event.value;
			
			if( val.match(/^[0-9]*([.,][0-9]+)?$/)){
				this.outputValues[i] = val ;
				this.$store.commit('oligeDose',this.outputValues) ;
			}
			if( this.outputValues[0] && this.outputValues[1]){
				this.$store.commit('setOligeFinalMessage',true) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : true,
                   }	    
				)
			}else{
				this.$store.commit('setOligeFinalMessage',false) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : false,
                }
				)
			}
		},
		getTextAreaValue(value) {
			this.textareavalue = value;
			if( this.alternativ && value.length > 5){
				this.$store.commit('setOligeFinalMessage',true) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : true,
                   }	    
				)
				this.$store.commit('oligeText',value ) ;
				
			}else{
				this.$store.commit('setOligeFinalMessage',false) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : false,
                }
				) 
			}
		},
    setRadioGroup($event){
      this.$store.commit('oligeKind',$event.i ) ;
    },
	},
	
})
</script>
<style>


.fm-can-dosier-inputs-block{
	margin: 25px auto ;
}
</style>