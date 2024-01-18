<template>
	<div class="row fm-can-textarea-block pb-3 ps-4 pe-4">
		<div class="mb-3">
			<textarea class="form-control fm-fnt-300-16-22 fm-fnt-grey-text" id="FmControlTextarea" rows="3"
				v-model="textareavalue" :placeholder="placeholder" 
				@input="onInput"></textarea>
		</div>
	</div>
</template>

<script>

export default ({
	mounted(){
		if (this.data){
            document.getElementById('FmControlTextarea').value= this.data;
		} 
	},
	
	props:{
		placeholder: {type : String, required : false },
		data : { type : String, default : '' }
	
	},
	emits: [
		'textareavalue'
	],
	data(){
		return {
			textareavalue : '',
		}
	},
	methods : {
		onInput(){
			this.$emit('textareavalue',{
				value : this.textareavalue
				}
			) ;
		}
		
	}
})
</script>
<style scoped>
 textarea:focus{
	outline: none !important;
	box-shadow: none!important;
	border: 1px solid #2FDAA0;
 }
</style>
