<template>
	<header id="fm-can-header" class="row fm-header d-flex ps-5 pe-4 ps-xxl-3">
		<div  :class="visible ?  'col-lg-1 col-xxl-2' : 'col-lg-1' "></div>
		<div  :class="visible ? 'col-12 col-lg-10 col-xxl-8 fm-fnt-300-14-16 fm-fnt-black ps-0' : 'col-12 col-lg-10 fm-fnt-300-14-16 fm-fnt-black ps-0' ">
			<a href="javascript:void(0)" @click="clickOnLogo"><img id="fm-can-logo"  v-bind:src="logoSrc" class="ms-4 ms-lg-0 ms-xl-4 ms-xxl-4" width='90' height='40' alt='can-logo'></a>
		</div>
		<div  :class="visible ?  'col-lg-1 col-xxl-2' : 'col-lg-1' "></div>
	</header>
	<fm-can-modal-dialog :open="isOpenModal" @closemodal="closeModal()" @cancelmodal="cancelModal()">{{ popupMessage }}</fm-can-modal-dialog>
</template>


<script>
import FmCanModalDialog from '@/components/common/fm-can-modal-dialog.vue'
import config from "/src/config.js";

export default ({
	data: ()=>({
		config,
		isOpenModal : false ,
		logoSrc: `${config.svgFolder()}/can-logo-svg.svg`,
		popupMessage : 'Möchten Sie den Konfigurator verlassen?'
	}),
	components :{
		FmCanModalDialog
	},
	props:{
		visible : Boolean ,
	},
	methods:{
		clickOnLogo(){
			this.isOpenModal = true ;
		},
		closeModal(){
			this.isOpenModal = false ;
			let linkToSiteMainPage = window.location.origin ;
			window.location.href = linkToSiteMainPage ;
		},
		cancelModal(){
			this.isOpenModal = false ;
		}
	},
	computed: {
		getOriginUrl(){
			return window.location.origin ;
		}
	},
})
</script>

<style>
#fm-can-header{
	height: 63px;
	align-items: center;
	position:relative ;
	box-shadow: 0px 4px 10px rgba(40, 51, 55, 0.13);
}
#fm-can-logo{
	/* margin-left: 0px!important; */
}
@media screen and ( max-width:991px){
	#fm-can-header{
		padding-left:20px!important;
	}
}
</style>
