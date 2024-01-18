<template>
<div id="fm-can-message-popup" class="fm-can-message-modal" v-show="openModal">
	<div class="fm-can-message-modal-inner"></div>
	<div class="fm-can-message-modal-content">
        <div class="fm-can-modal-content-message">
          <p class="fm-can-modal-subheader fm-fnt-500-16-22 fm-fnt-black mx-0 px-0">
            <slot></slot>  
          </p>	
       </div>
	<div class="buttons d-flex" style="justify-content:space-evently">
		<button type="button" class="btn fm-can-btn-ok  fm-fnt-500-16-22"   @click="closeModal">Ja</button>
		<button type="button" class="btn fm-can-btn-cancel  fm-fnt-500-16-22"   @click="cancelModal">Nein</button>
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
        'cancelmodal',
	],
	computed :{
		openModal(){
			return this.open ;	
		},
	},
	methods : {
		closeModal(){
			this.$emit('closemodal') ;
		},
        cancelModal(){
            this.$emit('cancelmodal') ;
        }

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
	width: 503px;
	margin: 206px auto;
    padding-top: 53px;
    padding-bottom:56px;
}
.fm-can-modal-header, .fm-can-modal-subheader{
	text-align: center;
}
.fm-can-modal-btn-group .btn-group{
	width:100% !important;
	justify-content: space-around!important;
    margin-top:27px;
}

.buttons{
	justify-content: center;
    margin-top:27px;
}
.btn{
    width:108px;
    height:48px;
}
.fm-can-btn-ok{
	width:108px;
    height:48px;
	background: #E4E4E4;
    border-radius: 2px;
	border-color: #E4E4E4;
    color: #6C7682 ;
    margin-right:5px;
}
.fm-can-btn-ok:hover{
    background:  #2BBB8A;
    border-radius: 2px;
	border-color:  #2BBB8A;
    color: #FFFFFF ;
}
.fm-can-btn-cancel{
   width:108px;
    height:48px;
	background: #2FDAA0;
    border-radius: 2px;
	border-color: #2FDAA0;
    color: #FFFFFF;
    margin-left:5px;
}
.fm-can-btn-cancel:hover{
    background: #2BBB8A;
    border-radius: 2px;
	border-color: #2BBB8A;
     color: #FFFFFF;
}

@media screen and (max-width:415px){
	.fm-can-message-modal-content {
		width:90% ;
	}
}
</style>
