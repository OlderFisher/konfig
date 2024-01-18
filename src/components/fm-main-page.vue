<template>
	<div id="fm-main-page" class="row" v-if="visible">
		<div class="row fm-bkg-greyblue pt-0 pb-5 mx-0" >
			<div class="col-lg-1 col-xxl-2"></div>
			<div class="col-12 col-lg-10 col-xxl-8 px-0">
				<h3 class="fm-menu-title fm-fnt-500-34-36 fm-fnt-black">{{ mainTitle }}</h3>
				<h1 class="fm-menu-subtitle fm-fnt-300-16-22 fm-fnt-grey">{{ mainSubtitle }}</h1>
				<div class="row fm-can-menu-block row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-3 gx-2 gy-2">
					<div v-for="(element, i) in menuElements" v-bind:key="i" class="col fm-single-menu-element-block">
						<router-link :to="element.route">
						<div class="fm-menu-element  ps-3 pe-3" @click="mainMenuclicked(i)">				
							<div class="fm-menu-element-icon  d-flex flex-row fm-element" style="align-items:center">
								<img v-bind:src="`${config.svgFolder()}${element.icon}`" class="fm-can-icon">
								<div class="fm-menu-element-text fm-fnt-300-22-22 fm-fnt-black">{{ element.name }}</div>
							</div>
							<div class="fm-menu-element-after">
								<img v-bind:src="arrowIcon" alt="">
							</div>
						</div>
						</router-link>
					</div>
				</div>

			</div>
			<div class="col-lg-1 col-xxl-2"></div>

		</div>
		<!-- enter FAQ Block -->
		<fm-can-faq></fm-can-faq>
	</div>

<router-view></router-view>
</template>



<script>

import FmCanFaq from '@/components/fm-can-faq.vue'
import config from "/src/config.js";

export default ({
	components : {
		FmCanFaq,
	},
	props: {
		menuElements : {type: Object, required: true},
		visible : { type : Boolean }
	},
	emits :[
		"menuitemclick"
	],
	data() {
		return {
			config,
			mainTitle : 'Cannabis-rezept konfigurator',
			mainSubtitle : 'Bitte wählen Sie die gewünschte Medikation aus',
			svgFolder: '/img/svg/',
			arrowIcon: `${config.svgFolder()}/right_arrow.svg`,
		}
	} ,
	methods: {
		mainMenuclicked(i){
			this.$emit('menuitemclick',i) ;
		}
	}

});
</script>

<style scoped>

.fm-bkg-greyblue{
	padding-bottom:64px!important;
	padding-left:48px;
	padding-right:48px;
}
.fm-menu-title{
	margin-bottom:8px;
}
h1{
	margin-bottom:37px!important;
}
img{
	margin-left:14px;
	margin-right:14px;
}

@media screen and (min-width:1483px) and (max-width:1559px){
	.fm-menu-element-text{
		font-size: 20px!important;
	}
}
@media screen and (min-width:1447px) and (max-width:1482px){
	.fm-menu-element-text{
		font-size: 19px!important;
	}
}
@media screen and (min-width:1399px) and (max-width:1446px){
	.fm-menu-element-text{
		font-size: 18px!important;
	}
}
@media  screen and (min-width : 1390px) {
	img{
		margin-right:8px!important;
	}
}
@media screen and ( max-width:991px){
	.fm-bkg-greyblue{
		padding-left:20px;
		padding-right:20px;
	}
	.fm-can-menu-block{
		padding-left:20px;
		padding-right:20px;
	}
	h1{
		padding-left:20px!important;
	}
	h3{
		padding-left:20px!important;
	}
}

@media screen and (max-width: 768px){
	.fm-can-menu-block{
		padding-left:20px;
		padding-right:20px;
	}
}

@media screen and (max-width : 415px){
	.fm-single-menu-element-block{
		padding-left:0 ;
		padding-right:0 ;
	}
	.fm-menu-title{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 500;
		font-size: 23px;
		line-height: 26px;
		color: #1C1C1C;
	}
	h1.fm-menu-subtitle{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 300;
		font-size: 14px;
		line-height: 22px;
		color: #969696;
		margin-bottom:21px!important;
	}
	.fm-menu-element-text{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 300;
		font-size: 18px;
		line-height: 22px;
		color: #1C1C1C;
	}
	.fm-bkg-greyblue{
		padding-bottom:48px!important;
	}

}
</style>
