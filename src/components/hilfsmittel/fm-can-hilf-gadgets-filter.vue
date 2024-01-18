<template>
	<div class="row fm-can-gadget-filter fm-fnt-500-16-22 fm-fnt-black pt-3 ps-4 pb-1">
		<div class="col-12 ps-3 mb-2">
			<div class="fm-can-gadget-filter-heading" @click="setView" @mouseover="onHover" @mouseout="outHover">
				<img class="fm-can-filter-image" :src="filter_image" alt="filter_image">
				<div class="fm-can-gadget-filter-heading-header fm-fnt-500-16-21 fm-fnt-green ms-2">Filter Zubehör
				</div>
			</div>
		</div>
	</div>
	<div v-if="!viewMobile" class="fm-can-all-filters mb-3">
		<!--    search and checks-->
		<div class="row fm-can-gadget-filter fm-fnt-500-16-22 fm-fnt-black pt-2 ps-4 pb-1">
			<div class="col-12 col-md-6 ps-3  pe-4">
				<fm-can-filter-search :placeholder="'Suche'" @searchfiltervalue="setSearch($event.value)"></fm-can-filter-search>
			</div>
			<div class="col-12 col-md-6  pe-4" style="margin-left:-30px;">
				<fm-can-filter-checkgroup :checkgroup="checkboxgroup" @checkedgenetik="setBrand($event.value)">
				</fm-can-filter-checkgroup>
			</div>
		</div>
	</div>
</template>

<script>

import FmCanFilterSearch from '@/components/cannabisextrakt/filters/fm-can-filter-search.vue'
import FmCanFilterCheckgroup from '@/components/cannabisextrakt/filters/fm-can-filter-checkgroup.vue'
import config from "/src/config.js";

export default {
	beforeMount() {
	
	},
	components: {
		FmCanFilterSearch,
		FmCanFilterCheckgroup

	},
	props: {
		// canextraktlist: { type: Object, required: true }
	},
	emits: [
		'filterchanged'
	],
	data() {
		return {
			config,
			filter_image: `${config.svgFolder()}/filter.svg`,
			
			filter: {
				search: '',
				brand: { mighty: true, volcano: true },
				
			},
			checkboxgroup: [
				{ id: '1', name : 'mighty', value: 'Mighty+ Medic', checked: true },
				{ id: '2', name : 'volcano', value: 'Volcano Medic 2', checked: true },
			],
			viewMobile : false ,

		}
	},
	methods: {
		
		setSearch(value) {
			this.filter.search = value;
			this.applyFilter();
		},
		setBrand(value) {
			// console.log(value) ;
			for(let  element of this.checkboxgroup){
				if( element.value == value){
					this.filter.brand[element.name] = !this.filter.brand[element.name] ;
				}	
			}
			this.applyFilter();
		},
		applyFilter() {
			this.$emit('filterchanged', {
				filter: this.filter
			})
		},
		setView(){
			this.viewMobile = !this.viewMobile ;
		},
		onHover(){
			const imgsvg = document.querySelector('.fm-can-filter-image');
			const filtertext = document.querySelector('.fm-can-gadget-filter-heading-header');
			imgsvg.style.filter = 'invert(59%) sepia(64%) saturate(463%) hue-rotate(108deg) brightness(91%) contrast(88%)';
			filtertext.style.color = '#2BBB8A';
		},
		outHover(){
			const imgsvg = document.querySelector('.fm-can-filter-image');
			const filtertext = document.querySelector('.fm-can-gadget-filter-heading-header');
			imgsvg.style.filter = 'none';
			filtertext.style.color = '#2FDAA0'
		}

	},
	mounted() {
		this.viewMobile = window.screen.availWidth < 415 ? true : false;
	},
}
</script>

<style scoped>
.fm-can-gadget-filter-heading {
	display: flex;
	flex-direction: row;
}
.fm-can-gadget-filter-heading:hover {
	cursor: pointer ;
}

.fm-can-gadget-filter-heading-header {
	border-bottom: 1px dotted;
}
.fm-can-gadget-filter-heading-header:hover{
	cursor: pointer ;
}
</style>