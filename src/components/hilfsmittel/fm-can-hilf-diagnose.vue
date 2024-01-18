<template>
	<div style="padding-top:20px"></div>
	<fm-can-textarea 
        :placeholder ="textareaplaceholder"
		:data="getGadgetDiagnose"
       @textareavalue="getTextAreaValue($event.value)"
	>
    </fm-can-textarea>

    <fm-can-final-message :showStatement="getHilfsmittelFinalMessage"></fm-can-final-message>
</template>

<script>
import FmCanTextarea from '@/components/common/fm-can-textarea.vue'
import FmCanFinalMessage from '@/components/common/fm-can-final-message.vue'
import { mapGetters } from 'vuex';

export default ({
	components:{
		FmCanTextarea,
		FmCanFinalMessage
	},
	computed:{
		...mapGetters(['getGadgetDiagnose','getHilfsmittelFinalMessage']),
	},

	emits:[
		'stepgone'
	],
	data(){
		return {
			textareaplaceholder: 'Fügen Sie die Diagnose hinzu..',
			finalMessage : false
        }
	},
    methods :{
		getTextAreaValue(value) {
			this.textareavalue = value;
			if( value.length > 5){
            //    this.finalMessage = true ;
				this.$store.commit('setHilfsmittelFinalMessage',true);
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : true,
                   }	    
				)
				this.$store.commit('hilfAddDiagnose',value) ;
			}else{
				// this.finalMessage = false ;
				this.$store.commit('setHilfsmittelFinalMessage',false);
				this.$emit('stepgone',{
                    accpart : 1 ,
                    accstate : false,
                }
				) 
			}
		},
    }
})
</script>
