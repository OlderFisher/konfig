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


	<div class="row form-group fm-can-dosier-inputs-block pt-3 pb-1 ps-4 pe-4 mb-2">
		<div class="col-12 col-md-6" v-for="(field,i) in getCannaxanInputs" :key="i">
			<fm-can-dosier-inputs 
                :title="field.title" :placehold="field.placehold" :value="field.value"
                :id="field.id" @inputvalue="onInput($event)">
			</fm-can-dosier-inputs>
		</div>
	</div>

	<fm-can-final-message :showStatement="getCannaxanFinalMessage"></fm-can-final-message>

</template>


<script>
import FmCanRegularDesc from '@/components/common/fm-can-regular-desc.vue'
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanDosierInputs from '@/components/common/fm-can-dosier-inputs.vue'
import FmCanFinalMessage from '@/components/common/fm-can-final-message.vue'

import { mapGetters } from 'vuex';

export default ({
	
	mounted(){
		let inputs = this.$store.getters.getCannaxanInputs ;
		if( inputs[0].value && inputs[1].value){
			this.$emit('stepgone',{
                accpart : 1 ,
                accstate : true,
               }	    
			)
		}else{
			this.$emit('stepgone',{
                accpart : 1 ,
                accstate : false,
            }
			)
		}
			
	},
	computed: {
		...mapGetters(['getCannaxanInputs', 'getCannaxanFinalMessage'])
	},
	components: {
		FmCanRegularDesc,
		FmCanWarningDesc,
		FmCanDosierInputs,
		FmCanFinalMessage
	},
	emits:[
		'stepgone'
	],
	data() {
		return {
			finalMessage : false ,
			outputValues : ['',''],
		}
	},
	methods: {
		onInput($event) {

			let i = $event.index * 1 - 1;
			let val = $event.value;
			
			if( val.match(/^[0-9]*([.,][0-9]+)?$/)){
				this.outputValues[i] = val ;
				this.$store.commit('canSecStep',this.outputValues) ;
			}

			if( this.outputValues[0] && this.outputValues[1]){
				this.$store.commit('setCannaxanFinalMessage',true) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : true,
                   }	    
				)
			}else{
				this.$store.commit('setCannaxanFinalMessage',false) ;
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : false,
                }
				)
			}
		}  
	},
	
})
</script>