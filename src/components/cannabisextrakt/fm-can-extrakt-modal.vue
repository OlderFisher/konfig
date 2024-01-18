<template>
<div id="fm-can-extract-popup" class="fm-can-extrakt-modal" v-show="openModal()">
	<div class="fm-can-extrakt-modal-inner"></div>
	<div class="fm-can-extrakt-modal-content">
		<h5 class="fm-can-modal-header fm-fnt-500-16-22 fm-fnt-black">{{ extract.name }}</h5>
		<h6 class="fm-can-modal-subheader fm-fnt-400-20-22">Welche {{ extract.base }}-Konzentration soll verordnet werden?</h6>
		<div class="row fm-can-modal-btn-group mt-4 mb-4">
			<fm-can-radiogroup :radiogroup="radiodata" @radiochange="setRadioGroup($event)"></fm-can-radiogroup>
		</div>
		
		<div class="fm-can-modal-oder fm-fnt-400-20-22 fm-fnt-black mt-3 mb-3"> oder </div>	

		<h6 class="fm-can-modal-subheader fm-fnt-5400-20-22 fm-fnt-black">
			Individuelle Konzentration
		</h6>
		<div class="row fm-can-slider-block ps-4 pe-4 pt-0 pb-1 ">
			<fm-can-extrakt-modal-slider ref="modalslider" :sliderparams="sliderModal" @currentslidervalue="sliderValue($event)"></fm-can-extrakt-modal-slider>
		</div>

	
	<hr>
	<div class="buttons d-flex" style="justify-content:space-evently">
		<button type="button" class="btn fm-can-btn-ok btn-success fm-fnt-500-16-22"   @click="closeModal">Ok</button>
		<button type="button" class="btn fm-can-btn-cancel btn-light fm-fnt-500-16-22" @click="cancelModal">Cancel</button>
	</div>
	</div>
</div>
</template>

<script>
import FmCanRadiogroup from '@/components/common/fm-can-radiogroup.vue'
import FmCanExtraktModalSlider from '@/components/cannabisextrakt/fm-can-extrakt-modal-slider.vue'

export default ({
	updated (){
		this.setRadioButtons(this.extract.button) ;
		this.sliderModal.startvalue = this.extract.minSliderAmount;
		this.sliderModal.endvalue   = this.extract.maxSliderAmount ;
		this.sliderModal.note       = 'Menge ( '+this.extract.unit +' )';
		this.sliderModal.value      = 0	;
	},
	components : {
		FmCanRadiogroup,
        FmCanExtraktModalSlider
	},
	props : {
		open : { type : Boolean , required : true },
		extract : { type : Object ,required : true }
	},
	data(){
		return {
			radiodata: [],
			sliderModal : {},
			slidervalue : {
				startvalue : 0 , endvalue : 0 , step: 1, note : 'Menge (mg/ml)', value :0
			} ,
			sliderZero : false ,
			chosenradio : false,
			chosenslider : false
		}
	},
	emits : [
		'closemodal',
		'cancelmodal',
	],
	methods : {
		openModal(){
			return this.open ;	
		},
		closeModal(){			
			this.radiodata = [] ;	
			this.$emit('closemodal') ;	
		},
		cancelModal(){
			this.radiodata = [] ;
			this.$emit('cancelmodal') ;
		},
		setRadioButtons(buttonsArray){
			if( buttonsArray.length > 0){
				this.radiodata = [] ;
				for( let i=0 ; i< buttonsArray.length; i++){
					let curdata = {} ;
					curdata.id = i+1 ;
					curdata.label = buttonsArray[i] + ' ' + this.extract.unit ;
					curdata.name = 'radiomodal';
					curdata.border = 'false';
					curdata.active = false;
					this.radiodata.push(curdata) ;
				}
				
			}
		},
		setRadioGroup($event){
			this.sliderModal.value = 0;
			this.$refs.modalslider.setToZero() ;
			this.sliderZero = false ;

			this.$store.commit('setSpecialExtractDataRadio',$event.value);	
			this.$store.commit('setSpecialExtractDataName',this.extract);
		},
		sliderValue($event){
			if( $event*1/1 > 0 && !this.sliderZero){
				this.sliderZero = true ;
				let modal = document.getElementById('fm-can-extract-popup');
				let group = modal.querySelectorAll('input[type="radio"]');
				for( let element of group){
					element.checked = false ;
				}
				
			}
			this.$store.commit('setSpecialExtractDataSlider',$event);
			this.$store.commit('setSpecialExtractDataName',this.extract);
		}
	}
})
</script>
<style scoped>
.fm-can-extrakt-modal {
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

.fm-can-extrakt-modal-inner {
	max-width: 30%;
	margin: 2rem auto;
}

.fm-can-extrakt-modal-content{
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
.fm-can-modal-oder{
	position: relative ;
	text-align: center;
	width: 95%;
    margin: 0 auto;
}
.fm-can-modal-oder::before{
    position: absolute;
    content: '';
    top: 50%;
    height: 2px;
    width: 43%;
    left: 5px;
    background: #A1A7AE;
}
.fm-can-modal-oder::after{
    position: absolute;
    content: '';
    top: 50%;
    height: 2px;
    width: 43%;
    right: 5px;
    background: #A1A7AE;
}
.buttons{
	justify-content: space-between;
}
.fm-can-btn-ok{
	width: 76px ;
	background-color: #2FDAA0;
	border-color: #2FDAA0;
}
.fm-can-btn-cancel{
	width: 76px ;
	color: #2FDAA0;
}
.fm-can-btn-cancel:hover{
	background-color: #198754;
	color: #FFFFFF;
}

@media screen and (max-width:415px){
	.fm-can-extrakt-modal-content {
		width:90% ;
	}
}
</style>
