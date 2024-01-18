<template>
	<!-- eslint-disable vue/no-unused-components  -->
	<button :id="'accordion-button_' + id" class="fm-accordion-button fm-fnt-500-24-22 d-flex justify-content-between"
		:aria-expanded="active" 
		:class="active ? 'fm-accordion-white-button' : 'fm-accordion-grey-button'"
		:disabled="disabled"
		>
		<span  class="fm-accordion-grey-title fm-fnt-400-28-26 fm-fnt-grey-text">
			<span v-if="!step " class="fm-fnt-500-18-22 fm-accordion-icon" :class="active ? 'fm-accordion-green-icon' : 'fm-accordion-grey-icon'">
				{{ id }}
			</span>
			<span v-if="step" class="fm-accordion-icon fm-accordion-green-check-icon"><img class="fm-can-green-check-icon" :src="greenCheckIcon" width="15" height="15"/></span>
			{{ title }}
		</span>
		<span v-if="!active && !disabled" class="fm-accordion-icon-edit fm-fnt-500-16-26 fm-fnt-grey-text me-3"  @click="ariaToggle(id)">Edit</span>
	</button>
	<transition name="fade">
	<div class="fm-accordion-grey-content fm-bkg-white mb-2" v-show="active">
		<div>
			<component :is="component" @stepgone="stepGone($event)"></component>
		</div>
	</div>
	</transition>
</template>


<script>
// Adding structure components
// cannabisblute accordion content components
import FmCanCanbluteSorte 	from "@/components/cannabisblute/fm-can-canblute-sorte.vue";
import FmCanCanbluteMenge 	from "@/components/cannabisblute/fm-can-canblute-menge.vue";
import FmCanCanbluteDosier 	from "@/components/cannabisblute/fm-can-canblute-dosier.vue";

// cannabisextrakt accordion content components
import FmCanCanextrSorte 	from "@/components/cannabisextrakt/fm-can-canextr-sorte.vue";
import FmCanCanextrMenge 	from "@/components/cannabisextrakt/fm-can-canextr-menge.vue" ;
import FmCanCanextrDosier 	from "@/components/cannabisextrakt/fm-can-canextr-dosier.vue";

// olige-cbdlosung accordion content components
import FmCanOligeSorte 		from "@/components/oligecbdlosung/fm-can-olige-sorte.vue";
import FmCanOligeDosier 	from "@/components/oligecbdlosung/fm-can-olige-dosier.vue";

// dronabinol accordion content components
import FmCanDronabinolSorte from "@/components/dronabinol/fm-can-dronabinol-sorte.vue";
import FmCanDronabinolDosier from "@/components/dronabinol/fm-can-dronabinol-dosier.vue";

// hilfsmittel accordion content components
import FmCanHilfVaporizer 	from "@/components/hilfsmittel/fm-can-hilf-vaporizer.vue";
import FmCanHilfDiagnose 	from "@/components/hilfsmittel/fm-can-hilf-diagnose.vue";

// cannaxan accordion content components
import FmCanCannaxanMenge from "@/components/cannaxan/fm-can-cannaxan-menge.vue";
import FmCanCannaxanDosier from "@/components/cannaxan/fm-can-cannaxan-dosier.vue";

import config from "/src/config.js";

export default({

	components: {
		FmCanCanbluteMenge,	FmCanCanbluteSorte, FmCanCanbluteDosier,
		FmCanCanextrSorte, 	FmCanCanextrMenge, 	FmCanCanextrDosier,
		FmCanOligeSorte, 	FmCanOligeDosier,
		FmCanDronabinolSorte, FmCanDronabinolDosier,
		FmCanHilfVaporizer, FmCanHilfDiagnose,
		FmCanCannaxanMenge, FmCanCannaxanDosier
	},
	props: {
		active:	{ type: Boolean , required: true },
		id: 	{ type: String  , required: true },
		title: 	{ type: String  , required: true },
		disabled : { type : Boolean, required : true},
		step : { type :Boolean },
		component:{ type: String }
	},
	emits: [
		'openclose',
		'accstepgone'
	],
	data(){
		return{
			config,
			greenCheckIcon : `${config.svgFolder()}/check_white.svg`,
		}
	},
	methods: {
		ariaToggle(id){
			this.$emit('openclose',id) ;
		},
		stepGone($event){
			this.$emit('accstepgone',$event) ;
		}
	}
})
</script>
<style scoped>


.fm-accordion-grey-button {
	width: 100%;
	text-align: left;
	background-color: #E4E4E4;
	border: 1px solid #E4E4E4;
	border-radius: 2px;
	padding-top: 15px;
	padding-bottom: 15px;
	margin-bottom:12px;
}

.fm-accordion-grey-title{
	display: flex;
	align-items: center;
}
.fm-accordion-grey-icon {
	width: 32px;
	height: 32px;
	background-color: #FFFFFF;
	border: 1px solid #FFFFFF;
	border-radius: 50%;
	margin-left: 16px;
	margin-right: 16px;
	color :#6C7682;
}
.fm-accordion-grey-content{
	margin-top: -15px;
}

.fm-accordion-green-check-icon {
	width: 32px;
	height: 32px;
	background-color: #2FDAA0;;
	border: 1px solid #2FDAA0;;
	border-radius: 50%;
	margin-left: 16px;
	margin-right: 16px;
	position:relative;
}
.fm-can-green-check-icon{
	position: absolute;
	top: 8px;
	left: 8px;
}

.fm-accordion-white-button {
	width: 100%;
	text-align: left;
	background-color: #FFFFFF;
	border: 1px solid #FFFFFF;
	border-radius: 2px;
	padding-top: 23px;
	padding-bottom: 16px;
	/* margin-bottom: 12px; */
}
.fm-accordion-icon{
	display: flex;
	justify-content: center;
	align-items: center;

}
.fm-accordion-green-icon {
	width: 32px;
	height: 32px;
	background-color: #D5F8EC;
	border: 1px solid #D5F8EC;
	border-radius: 50%;
	/* padding: 5px 15px; */
	margin-left: 16px;
	margin-right: 16px;
	color : #2FDAA0 ;
}
.fm-accordion-icon-edit{
	text-decoration: none;
	border-bottom: 1px dotted #6C7682;
	padding-bottom: 1px;
}
.fade-enter-active{
	animation: fade 1.0s;
	animation-delay: 0.2s;
}
.fade-leave-active{
	animation: fade 1.0s reverse;
	animation-delay: 0.2s;
}
@keyframes fade {
	from {opacity : 0;}
	to{opacity:1;}
}

@media screen and (max-width:415px){
	.fm-accordion-grey-title{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 26px;
		text-transform: capitalize;
		color: #6C7682;
		
	}
	.fm-accordion-icon{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 26px;
		color: #2FDAA0;
	}
	.fm-accordion-green-icon {
		width: 28px;
		height: 28px;
		background-color: #D5F8EC;
		border: 1px solid #D5F8EC;
		border-radius: 50%;
		margin-left: 16px;
		margin-right: 16px;
		color: #2FDAA0;
	}
	.fm-accordion-grey-icon {
		width: 28px;
		height: 28px;
		background-color: #FFFFFF;
		border: 1px solid #FFFFFF;
		border-radius: 50%;
		margin-left: 16px;
		margin-right: 16px;
		color: #6C7682;
	}
}


</style>
