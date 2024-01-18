<template>
<div id="fm-can-message-popup" class="fm-can-message-modal" v-show="openModal()">
	<div class="fm-can-message-modal-inner"></div>
	<div class="fm-can-message-modal-content">
        <div class="fm-can-modal-content-message">
          <p class="fm-can-modal-subheader fm-fnt-400-20-22 fm-fnt-black mb-4 mt-4">
            <slot></slot>  
          </p>	
       </div>
	<hr>
	<div class="buttons d-flex" style="justify-content:space-evently">
		<button type="button" class="btn fm-can-btn-ok btn-success fm-fnt-500-16-22"   @click="closeModal">Ok</button>
	</div>
	</div>
</div>
</template>

<script>

export default ({

	props : {
		open : { type : Boolean , required : true },
	},
	data(){
		return {
			
		}
	},
	emits : [
		'closemodal',
	],
	methods : {
		openModal(){
			return this.open ;	
		},
		closeModal(){
			this.$emit('closemodal') ;
		},

	}
})
</script>
<style scoped>
.fm-can-message-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 1;
}

.fm-can-message-modal-inner {
	max-width: 30%;
	margin: 2rem auto;
}

.fm-can-message-modal-content{
	position: relative;
	background-color: #FFFFFF;
	border: 1px solid #FFFFFF;
	background-clip: padding-box;
	border-radius: 0.3rem;
	padding: 1rem;
	width: 40%;
	margin: 200px auto;
}
.fm-can-modal-header, .fm-can-modal-subheader{
	text-align: center;
}
.fm-can-modal-btn-group .btn-group{
	width:100% !important;
	justify-content: space-around!important;
}

.buttons{
	justify-content: center;
}
.fm-can-btn-ok{
	width: 76px ;
	background-color: #2FDAA0;
	border-color: #2FDAA0;
}

@media screen and (max-width:415px){
	.fm-can-message-modal-content {
		width:90% ;
	}
}
</style>
