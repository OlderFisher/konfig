<template>
	<label :for="inputid" class="form-label fm-fnt-500-16-22 fm-fnt-black">{{ title }}</label>
	<div class="input-group mb-3">
		<span class="input-group-text fm-fnt-400-14-16 fm-fnt-grey-text" :id="spanid">{{ placehold}}</span>
		<input type="number" min="0" step="0.01" pattern="\-?\d+(\.\d{0,})?" class="form-control"  :id="inputid"
			aria-describedby="basic-addon-`$id`" :value="value" :disabled="disabled" @input="onInput(id,$event.target.value)" @focus="onFocus">
	</div>
</template>

<script>

export default ({
	
	props : {
		title : { type : String , required : true },
		placehold: { type: String, required: true },
		value: { type: String, required: true },
		id: { type: String, required: true },
		disabled:{ type: Boolean ,  default : false}
	},
	
	data() {
		return {
			onFocusInput : false 
		}
	},		
	emits:[
		'inputvalue'
	],
	methods:{
		onInput(id, value){
			this.$emit('inputvalue', {
				index: id,
				value: value
				}
			);
		},
		onFocus(){
			this.onFocusInput = true ;
		}
	},
	computed:{
		inputid(){
			return 'number-input-' + this.id ;
		},
		spanid(){
			return 'number-label-' + this.id;
		},
		
	}


})
</script>

<style scoped>

.fm-input-focus{
	border: 1px solid #2FDAA0;
	outline: 0;
    outline-offset: 0;
}
.fm-input-blur{
	border: 1px solid #ced4da;
}
.input-group-text{
	background-color: #f9f9f9 ;
}
.input-group input[type="number"]{
	outline: 0!important;
    outline-offset: 0!important;
	box-shadow: none!important;
}
.input-group input[type="number"]:focus{
	border: 1px solid #2FDAA0;
	outline: 0;
    outline-offset: 0;
}
</style>

