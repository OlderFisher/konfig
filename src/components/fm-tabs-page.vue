<template>
	<!-- eslint-disable vue/no-unused-components  -->
	<div id="fm-tab-page" class="row" v-if="visible">
		<!--  Tabs menu here  -->
		<div class="row fm-bkg-greyblue fm-tab-menu-common-block">
			<div class="col-lg-1 "></div>
			<div class="col-12 col-lg-10   px-0">
				<div class="row ps-5 px-lg-4 pt-0 pe-1">
					<h3 class="fm-tab-menu-title fm-fnt-500-20-22 fm-fnt-black mb-3">{{ mainTitle }}</h3>
					<div v-if="!viewMobile" class="fm-can-desktop-menu ps-0 pe-1">
						<div
							class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-2  row-cols-xl-3 row-cols-xxl-6 gx-3 gy-3 px-0">
							<div v-for="(element,i) in menuElements" v-bind:key="i" class="col">

								<router-link :to="element.route">
								<div class="fm-tab-menu-element px-0" :class="classes(i)" @click="tabCLicked(i)">
									<div class="fm-tab-menu-element-icon  d-flex flex-row fm-element"
										style="align-items:center">
										<img v-bind:src="`${config.svgFolder()}${element.icon}`" class="" style="width:22px; margin-left:17px;margin-right:8px">
										<div class="fm-tab-menu-element-text fm-fnt-400-14-22 fm-fnt-black">{{ element.name}}</div>
									</div>
								</div>
								</router-link>

							</div>
						</div>
					</div>
					<div v-if="viewMobile" class="fm-can-mobile-menu ps-0">
						<fm-can-mobile-menu :menu="menuElements" @selectedmenu="mobileSelected($event)"></fm-can-mobile-menu>
					</div>
				</div>
			</div>
			<div class="col-lg-1 "></div>
		</div>
		<!--   Tabs content  here  -->
		<div class="row fm-bkg-greyblue  pb-1 pb-lg-5">
			<div class="col-lg-1 "></div>
			<div class="col-12 col-lg-10  px-0">

				<div class="row ps-4 pe-1 ps-lg-8 pe-lg-4 px-xl-4">
					<!-- column with grey accordion  -->
					<div class="col-12 col-xl-8  ps-lg-0 pe-lg-2">
						<div v-for="(element,i) in menuElements" v-bind:key="i" class="tab-content">
							<div v-if="element.active" class="fm-tab-content-element">

								<!-- pages templates -->

								<component :is="component(i)"></component>

								<!-- pages templates -->
							</div>
						</div>
					</div>
					<!-- column with post card image and buttons  -->
					<div class="col-12 col-xl-4 pe-1">
						<div class="row fm-can-postimage-block col-12 px-0 pt-0 ms-0 me-0">	

							<div class="col-12 col-md-6 col-xl-12 px-0">	
									<fm-can-card-block :activeMenuElement="activeMenuElement"></fm-can-card-block>
							</div>

							<div v-if="activeMenuElement == 'Hilfsmittel'" id="fm-can-additional-card-block" class="col-12 col-md-6 col-xl-12 ps-3 fm-fnt-400-12-26 fm-fnt-black" style="height:auto padding: 0px 14px 16px 14px">
								<div id="fm-can-additional-card-block-inner" class="fm-fnt-400-12-26" >
									<div v-for="(gadget,i) of getTotalCartGadgets" :key="i" class="fm-can-shopping-cart-gadget fm-fnt-400-12-26 d-flex" style="justify-content:space-between">
										{{ gadget.amount + ' x ' + gadget.name }}
										<a class="fm-can-cart-delete fm-fnt-300-12-36" style="color:#6C7682; cursor:pointer;" @click="removeGadget(gadget.name)" @mouseover="onHoverLink" @mouseout=outHoverLink>
											<img :src="deletelinkHover ? this.deleteGreenImage : this.deleteGreyImage" style="margin-right:7px;">Entfernen</a>
									</div>
								</div>
								<span id="fm-can-additional-card-block-greendot"></span>
							</div>


							<div class="col-12 col-md-6 col-xl-12 fm-can-buttons-block">
								<div style="text-align:center;">
								<button id="fm-can-button-drucken" class="fm-can-card-button fm-fnt-500-16-22"  :class="getButtonsDisabledState ? 'fm-can-card-drucken-disabled' : 'fm-can-drucken'" @click="actionDrukenButton" :disabled="getButtonsDisabledState && getButtonsDisabled">
									<span class="button-icon"><img id="fm-icon-druken"  :src="`${config.svgFolder()}/white_down.svg`"></span>
									<span class="">Musterrezept ausdrucken</span>
								</button>
								</div>	
								<div style="text-align:center;">
								<button id="fm-can-button-reserviren" class="fm-can-card-button fm-fnt-500-16-22"  
									:class="getButtonsDisabledState ? 'fm-can-card-reserviren-disabled' : 'fm-can-reserviren'" 
									@click="actionReservirenButton" 
									:disabled="getButtonsDisabledState && getButtonsDisabled" 
									@mouseover="onHover"
									@mouseout="outHover">
									<span class="button-icon"><img id="fm-icon-reserviren" :src="buttonsdisabled ? `${config.svgFolder()}/check_light_grey.svg` : `${config.svgFolder()}/check_grey.svg`"></span>
									<span class="">Sorte Reservieren</span>
								</button>
								</div>
								<div style="text-align:center;">
								<button id="fm-can-button-copiren" class="fm-can-card-button fm-fnt-500-16-22" :class="getButtonsDisabledState ? 'fm-can-card-kopiren-disabled' : 'fm-can-kopiren'" @click="actionCopyButton" :disabled="getButtonsDisabledState && getButtonsDisabled">
									<span class="button-icon"><img id="fm-icon-copiren"  :src="buttonsdisabled ? `${config.svgFolder()}/copy_light_grey.svg` :`${config.svgFolder()}/copy_grey.svg`"></span>
									<span class="">Angaben Kopieren</span>
								</button>
								</div>
							</div>
							
							
						</div>
					</div>

				</div>
			</div>
			<div class="col-lg-1 "></div>
		</div>

	</div>

	<fm-can-modal-message :open="isOpenModal" @closemodal="closeModal()">{{ popupMessage }}</fm-can-modal-message>

</template>


<script>
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'

import FmTabsCannabisBlute 		from '@/components/tabs/fm-tabs-cannabisblute.vue'
import FmTabsCannabisExtract 	from '@/components/tabs/fm-tabs-cannabis-extrakt.vue'
import FmTabsOligeCbdLosung 	from '@/components/tabs/fm-tabs-olige-cbdlosung.vue'
import FmTabsDronabinol 		from '@/components/tabs/fm-tabs-dronabinol.vue'
import FmTabsHilfsmittel 		from '@/components/tabs/fm-tabs-hilfsmittel.vue'
import FmTabsCannaxan 			from '@/components/tabs/fm-tabs-cannaxan.vue'
import FmCanMobileMenu 			from '@/components/common/fm-can-mobile-menu.vue'
import FmCanCardBlock 			from '@/components/fm-can-card-block.vue'
import FmCanModalMessage  		from '@/components/common/fm-can-modal-message.vue'
import { mapGetters } from 'vuex'
import config from "/src/config.js";

export default({
	mounted() {
		this.viewMobile = window.screen.availWidth < 1000 ? true : false;

	},
	created(){
		this.$watch('activeMenuElement',(newVal, oldVal) => {
			if( newVal !== oldVal ){
                console.log('element changed');
			}
        })
	},
	updated(){
		
	},
	components: {
		FmTabsCannabisBlute ,	
		FmTabsCannabisExtract ,
		FmTabsOligeCbdLosung ,
		FmTabsDronabinol ,	
		FmTabsHilfsmittel ,	
		FmTabsCannaxan,
		FmCanMobileMenu,
		FmCanCardBlock, 
		FmCanModalMessage,
	},
	props: {
		visible : { type : Boolean },
		menuElements : { type : Object },
		
	},
	emits: [
		'tabclicked',
		'mobselected'
	],
	data() {
		return {
			config,
			mainTitle: 'Cannabis-rezept konfigurator',
			svgFolder: '/img/svg/',
			arrowIcon: `${config.svgFolder()}/right_arrow.svg`,
			greySmallCheck : `${config.svgFolder()}/check_grey.svg`,
			whiteSmallCheck: `${config.svgFolder()}/white_small_check.svg`,
			deleteGreyImage : `${config.svgFolder()}/grey_delete.svg`,
			deleteGreenImage : `${config.svgFolder()}/green_delete.svg`,
			components : [
				'FmTabsCannabisBlute' ,
				'FmTabsCannabisExtract',
				'FmTabsOligeCbdLosung',
				'FmTabsDronabinol',
				'FmTabsHilfsmittel',
				'FmTabsCannaxan',

			],
			postcardButtons: [
				{ id: 0, title: 'Musterrezept ausdrucken',  icon: `${config.svgFolder()}/white_down.svg`, class:"fm-can-card-button fm-can-postimage-button-green", disabled : false},
				{ id: 1, title: 'Sorte Reservieren', 		icon: `${config.svgFolder()}/check_grey.svg`, class:"fm-can-card-button fm-can-postimage-button-grey",  disabled : false },
				{ id: 2, title: 'Angaben Kopier', 			icon: `${config.svgFolder()}/copy_grey.svg` , class:"fm-can-card-button fm-can-postimage-button-white", disabled : false },
			],
			
			buttonsdisabled : true,
			viewMobile : false ,
			isOpenModal : false , 
			popupMessage : '',
			pdfFileName : '',
			postCardFile : null ,
			postCardRegular :  `${config.svgFolder()}/post-card.svg` ,
			postCardOlige : `${config.svgFolder()}/olige-card.svg` ,
			postCardHilf : `${config.svgFolder()}/hilfsmittel-card.svg` ,
			postCardRegularPdf :  `${config.svgFolder()}/card-regular-pdf.svg` ,
			postCardOligePdf : `${config.svgFolder()}/card-olige-pdf.svg` ,
			postCardHilfPdf : `${config.svgFolder()}/card-hilfsmittel-pdf.svg` ,
			textMessage : 'This is test message to check post card pdf output',
			deletelinkHover : false
		}
	},
	computed:{
		...mapGetters(['getTotalCartGadgets']),

		getPdfFileName(){
			const currentDate = this.currentDateDDMMYYYY();
			return 'Cannabis-Apotheke-Musterrezept-' + currentDate ;
		},
		activeMenuElement(){
			let active = '';
			for( let element of this.menuElements){
				if( element.active){
					active = element.name ;
				}
			}
			return active ;
		},
		getButtonsDisabledState(){
			console.log('computed')
			let currentButtonsState = true ;
			const activeElement = this.activeMenuElement ;
			if( activeElement == 'Cannabisblüte') {
				currentButtonsState = this.$store.getters.getBluteCardBlockStatement;
			} 
			if( activeElement == 'Cannabisextrakt'){
				currentButtonsState = this.$store.getters.getExtractCardBlockStatement;
			}
			if( activeElement == 'Ölige CBD-Lösung'){
				currentButtonsState = this.$store.getters.getOligeCardBlockStatement;
				console.log('olige button ' + currentButtonsState);
			}
			if( activeElement == 'Dronabinol'){
				currentButtonsState = this.$store.getters.getDronabinolCardBlockStatement;
			}
			if( activeElement == 'Hilfsmittel'){
				currentButtonsState = this.$store.getters.getHilfsmittelCardBlockStatement;
			} 	
			if( activeElement == 'Cannaxan 701-1.2'){
				currentButtonsState = this.$store.getters.getCannaxanCardBlockStatement;
			}
			return currentButtonsState ;

		},
		
	},
	methods:{
		classes(i){
			return {
				'item-active': this.menuElements[i].active,
				'item-regular': !this.menuElements[i].active ,
			}
		},
		tabCLicked(i){
			this.$emit('tabclicked', i);
		},
		template(i){
			return this.template[i] ;
		},
		component(i){
			return this.components[i] ;
		},
		mobileSelected($event){
			let i = $event.i ;
			this.$emit('mobselected',i) ;
		},
		closeModal(){
			this.isOpenModal = false ;
		},
		currentDateDDMMYYYY(){
           let today = new Date() ;
           let dd = today.getDate();
           let mm = today.getMonth()+1; 
           let yyyy = today.getFullYear(); 

           if(dd<10) dd='0'+dd;
           if(mm<10) mm='0'+mm;
           today = dd+'-'+mm+'-'+yyyy;

           return  today ;
          
		},
		getButtonsDisabled(){
			console.log('method') ;
			let currentButtonsState = true ;
			const activeElement = this.activeMenuElement ;
			if( activeElement == 'Cannabisblüte') {
				currentButtonsState = this.$store.getters.getBluteCardBlockStatement ;
			} 
			if( activeElement == 'Cannabisextrakt'){
				currentButtonsState = this.$store.getters.getExtractCardBlockStatement ;
			}
			if( activeElement == 'Ölige CBD-Lösung'){
				currentButtonsState = this.$store.getters.getOligeCardBlockStatement ;
				console.log('olige button' + currentButtonsState);
			}
			if( activeElement == 'Dronabinol'){
				currentButtonsState = this.$store.getters.getDronabinolCardBlockStatement ;
			}
			if( activeElement == 'Hilfsmittel'){
				currentButtonsState = this.$store.getters.getHilfsmittelCardBlockStatement
			} 	
			if( activeElement == 'Cannaxan 701-1.2'){
				currentButtonsState = this.$store.getters.getCannaxanCardBlockStatement ;
				console.log(currentButtonsState) ;
			}
			return currentButtonsState ;

		},
		
		actionDrukenButton(){
			console.log('druken');
			const currentDate = this.currentDateDDMMYYYY() ;
			this.pdfFileName = 'Cannabis-Apotheke-Musterrezept-' + currentDate ;
			this.textMessage = document.getElementById('fm-can-postimage-internal-message').innerHTML;

			const opt = {
                filename: this.pdfFileName,
                margin: 0,
                image: {type: 'jpeg', quality: 1},
                jsPDF: {format: 'letter', orientation: 'portrait'},
				pagebreak: { mode: 'avoid-all', after: '#fm-can-pdf-output' }
            };

			if( this.activeMenuElement == 'Ölige CBD-Lösung'){
				this.postCardFile = this.postCardOligePdf ;
			}
			if( this.activeMenuElement == 'Hilfsmittel'){
				this.postCardFile = this.postCardHilfPdf ;
			}
			if( this.activeMenuElement != 'Ölige CBD-Lösung' && this.activeMenuElement != 'Hilfsmittel'){
				this.postCardFile = this.postCardRegularPdf ;
			}

            const div = '<div id="fm-can-pdf-output" style="height:auto ; width:90% ; position:relative; margin-left:70px;">' + '' +
                        '<img src="'+this.postCardFile+'" style="width:90%; height: 535px; margin:20px auto;"/>' +
                        '<div style="padding : 10px 10px; position:absolute ; bottom: 115px ; left : 40px; width: 375px ; height : 160px"><span>' + this.textMessage + '</span></div>' +
                        '</div>' ;

            html2pdf().set(opt).from(div).save();
          
		},
		actionReservirenButton(){
				const coverElement = document.getElementById('fm-can-postimage-internal-message') ;
				let copyData = coverElement.innerText;
				console.log(copyData) ; // add George spnippet
		},
		actionCopyButton(){
			const coverElement = document.getElementById('fm-can-postimage-internal-message') ;
			let copyData = coverElement.innerText;
            if (copyData) {
				navigator.clipboard.writeText(copyData)
                     .then(() => {
                         this.popupMessage = 'Die Angaben sind Ihrem Zwischenspeicher hinzugefügt worden.';
                     })
                     .catch(err => {
						this.popupMessage = 'Fehler beim Kopieren des Textes: ' + err ;
                    });
				this.isOpenModal = true ;	
			}
		},
		onHover(){
			let svgimage = document.getElementById('fm-icon-reserviren') ;
			svgimage.src=this.whiteSmallCheck;
		},
		outHover(){
			let svgimage = document.getElementById('fm-icon-reserviren') ;
			svgimage.src=this.greySmallCheck;
		},
		onHoverLink(){
			this.deletelinkHover = true;
		},
		outHoverLink(){
			this.deletelinkHover = false;
		},
		removeGadget(target){
			this.$store.commit('hilfRemoveGadget',target);
		}

	}
})
</script>



<style>
.fm-tab-menu-common-block{
	padding-bottom:20px;
}
h3{
	margin-top:45px!important;
	padding-left: 0!important ;
}
img{
	/* margin-left:11px!important;
	margin-right:8px!important; */
}
.fm-can-postimage-block{
	background: #ffffff;
	border: 1px solid #ffffff;
	border-radius: 2px;
	padding: 17px;
	height: auto;
	/* max-height: 536px; */
}
	
.fm-can-buttons-block{
	display: flex;
	flex-direction: column;
	padding: 26px 45px 0px 45px;
}
.fm-can-card-button{
	width:300px;
	height:48px;
	margin-bottom: 15px;
	padding: 13px 0px;
}

.fm-can-drucken{
	background: #2FDAA0;
	border : 1px solid #2FDAA0;
	border-radius: 2px;
	color : #FFFFFF ;
}
.fm-can-card-button:hover{
	background: #2BBB8A;
	border : 1px solid #2BBB8A;
	color : #FFFFFF ;
	cursor: pointer;
}
.fm-can-card-drucken-disabled{
    background: #78DFBC;
	border : 1px solid #78DFBC;
	color : #FFFFFF ;
	cursor : not-allowed; 
}
.fm-can-card-drucken-disabled:hover{
    background: #78DFBC;
	border : 1px solid #78DFBC;
	color : #FFFFFF ;
	cursor : not-allowed; 
    -webkit-transform: none;
    transform: none;
    box-shadow:none
}

.fm-can-reserviren{
	background: #E4E4E4;
	border : 1px solid #E4E4E4;
	border-radius: 2px;
	color : #6C7682;
}
.fm-can-reserviren:hover{
	background: #2BBB8A;
	border : 1px solid #2BBB8A;
	color : #FFFFFF ;
	cursor: pointer;
    
}
.fm-can-card-reserviren-disabled{
	background: #F0F0F0;;
	border : 1px solid #F0F0F0;
	color : #A1A7AE;
	cursor : not-allowed; 
}
.fm-can-card-reserviren-disabled:hover{
	background: #F0F0F0;;
	border : 1px solid #F0F0F0;
	color : #A1A7AE;
	cursor : not-allowed; 
    -webkit-transform: none;
    transform: none;
    box-shadow:none
}
.fm-can-kopiren{
	background: #FFFFFF;
	border : 1px solid #FFFFFF;
	border-radius: 2px;
	color : #6C7682;;
}
.fm-can-kopiren:hover{
	background: #ECECEC;
	border : 1px solid #ECECEC;
	color : #6C7682; ;
	cursor: pointer;
}
.fm-can-card-kopiren-disabled{
	background: #FFFFFF;
	border : 1px solid #FFFFFF;
	color : #A1A7AE; 
}
.fm-can-card-kopiren-disabled:hover{
	background: #FFFFFF;
	border : 1px solid #FFFFFF;
	color : #A1A7AE; 
	cursor : not-allowed; 
    -webkit-transform: none;
    transform: none;
    box-shadow:none
}

.button-icon{
	margin-right:8px;
}

a{
	text-decoration: none!important;
}
a:visited{
	text-decoration: none!important;
}
#fm-can-additional-card-block{
	position: relative;
}
#fm-can-additional-card-block-inner{
	border-left :1px dashed #2FDAA0; 
	padding: 14px 14px 14px 14px; 
	margin-top:-10px;
	
}
#fm-can-additional-card-block-greendot{
	width:5px;
	height:5px;
	display: block;
	background-color:#2FDAA0;
	border-radius:50%;
	position: absolute;
    left: 14px;
    bottom: -2px;
}
.fm-can-cart-delete:hover{
	color: #2BBB8A!important;
}



@media screen and (max-width:1200px){
	.fm-tab-page{
       justify-content: center;
	}
}

#pdf-block{
	width:600px;
}
.pdftext{
	padding : 20px 20px ;
}

</style>