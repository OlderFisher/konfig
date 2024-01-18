<template>
	<div class="row fm-can-blute-filter fm-fnt-500-16-22 fm-fnt-black  ps-4">
		<div class="col-12 ps-3">
			<div class="fm-can-blute-filter-heading" @click="setView" @mouseover="onHover" @mouseout="outHover">
				<img class="fm-can-filter-image" :src="filter_image" alt="filter_image">
				<div class="fm-can-blute-filter-heading-header fm-fnt-500-16-21 fm-fnt-green ms-2">
					Filter Cannabisblüte
				</div>
			</div>
		</div>
	</div>
	<div v-if="!viewMobile" class="fm-can-all-filters">
		<!--    search and checks-->
		<div class="row fm-can-blute-filter fm-fnt-500-16-22 fm-fnt-black ps-4 pb-0">
			<div class="col-12 col-md-6 ps-3  pe-4">
				<fm-can-filter-search :placeholder="'Suche nach Blüte, Kultivar oder Hersteller…'" @searchfiltervalue="setSearch($event.value)"></fm-can-filter-search>
			</div>
			<div class="col-12 col-md-6 ps-3  pe-4">
				<fm-can-filter-checkgroup :checkgroup="checkboxgroup" @checkedgenetik="setGenetik($event.value)">
				</fm-can-filter-checkgroup>
			</div>
		</div>
		<!--    select and radio -->
		<div class="row fm-can-blute-filter fm-fnt-500-16-22 fm-fnt-black  ps-4 pb-1">
			<div class="col-12 col-md-6 ps-3  pe-4">
				<fm-can-filter-select :companies="companies" @selectedcompany="setCompany($event.value)">
				</fm-can-filter-select>
			</div>
			<div class="col-12 col-md-6 ps-1 pe-4">
				<fm-can-filter-radio-vorrat :radiobuttons="filterVorrat" :name="radioButtonsName"
					@radiobuttonchecked="setVorrat()">
				</fm-can-filter-radio-vorrat>
			</div>
		</div>
		<!-- sliders -->
		<div class="row fm-can-blute-filter fm-fnt-500-16-22 fm-fnt-black pt-2  pb-1 ps-4 pe-4" style="margin-top:-10px">
			<div class="col-12 col-md-6 ps-3">
				<fm-can-filter-value-slider :sliderparams="sliderthc" @currentslidervalue="sliderTHCValue($event)">
				</fm-can-filter-value-slider>
			</div>
			<div class="col-12 col-md-6 ps-3">
				<fm-can-filter-value-slider :sliderparams="slidercbd" @currentslidervalue="sliderCBDValue($event)">
				</fm-can-filter-value-slider>
			</div>
		</div>

	</div>
</template>

<script>

import FmCanFilterValueSlider from '@/components/cannabisextrakt/filters/fm-can-filter-value-slider.vue'
import FmCanFilterSelect from '@/components/cannabisextrakt/filters/fm-can-filter-select.vue'
import FmCanFilterRadioVorrat from '@/components/cannabisextrakt/filters/fm-can-filter-radio-vorrat.vue'
import FmCanFilterSearch from '@/components/cannabisextrakt/filters/fm-can-filter-search.vue'
import FmCanFilterCheckgroup from '@/components/cannabisextrakt/filters/fm-can-filter-checkgroup.vue'
import config from "/src/config.js";

export default {
	beforeMount() {
		this.setCompaniesList();
		this.setTHCSlider();
		this.setCBDSlider();
	},
	components: {
		FmCanFilterValueSlider,
		FmCanFilterSelect,
		FmCanFilterRadioVorrat,
		FmCanFilterSearch,
		FmCanFilterCheckgroup

	},
	props: {
		canextraktlist: { type: Object, required: true }
	},
	emits: [
		'filterchanged'
	],
	data() {
		return {
			config,
			filter_image: `${config.svgFolder()}/filter.svg`,
			sliderthc: {  note: 'THC (< %)'},
			slidercbd: {  note: 'CBD (< %)'},
			companies: [],
			filter: {
				search: '',
				company: 'Alle Herstellers',
				vorrat: true,
				genetik: { indica: true, sativa: true, hybrid: true },
				thc: 0,
				cbd: 0,
			},
			filterVorrat: { id: '1', title: 'Nur vorrätig', checked: true },
			radioButtonsName: 'canblutevorratfilter',
			checkboxgroup: [
				{ id: '1', value: 'Indica', checked: true },
				{ id: '2', value: 'Sativa', checked: true },
				{ id: '3', value: 'Hybrid', checked: true },
			],
			viewMobile : false ,

		}
	},
	methods: {
		sliderTHCValue($event) {
			this.sliderthc.value = $event;
			this.filter.thc = $event;
			this.applyFilter();
		},
		sliderCBDValue($event) {
			this.slidercbd.value = $event;
			this.filter.cbd = $event;
			this.applyFilter();
		},
		setVorrat() {
			this.filterVorrat.checked = !this.filterVorrat.checked;
			this.filter.vorrat = this.filterVorrat.checked;
			this.applyFilter();
		},
		setSearch(value) {
			this.filter.search = value;
			this.applyFilter();
		},
		setCompany(value) {
			this.filter.company = value;
			this.applyFilter();
		},
		setGenetik(value) {
			let name = value.toLowerCase();
			this.filter.genetik[name] = !this.filter.genetik[name];
			this.applyFilter();
		},
		setTHCSlider() {
			let thcArr = [];
			for (let i = 0; i < this.canextraktlist.length; i++) {
				let thc = this.canextraktlist[i].thc;
				thc *= 1 ;
				thcArr.push(thc);
			}
			// let min = Math.min.apply(null, thcArr);
			let min = 0;
			let max = Math.max.apply(null, thcArr);
			//thc slider settings
			this.sliderthc.startvalue = min;
			this.sliderthc.endvalue = max;
			this.sliderthc.value = this.sliderthc.endvalue;
			this.filter.thc = this.sliderthc.endvalue;
		},
		setCBDSlider() {
			let cbdArr = [];
			for (let i = 0; i < this.canextraktlist.length; i++) {
				let cbd = this.canextraktlist[i].cbd * 1;
				cbd = isNaN(cbd) ? 1 : cbd;
				cbdArr.push(cbd);
			}
			// let min = Math.min.apply(null, cbdArr);
			let min = 0;
			let max = Math.max.apply(null, cbdArr);
			//cbd slider settings
			this.slidercbd.startvalue = min;
			this.slidercbd.endvalue = max;
			this.slidercbd.value = this.slidercbd.endvalue;
			this.filter.cbd = this.slidercbd.endvalue;


		},
		setCompaniesList() {
			let isCompany = ['Alle Herstellers'];
			this.companies.push({ name: 'Alle Herstellers', id: 9999 });
			for (let i = 0; i < this.canextraktlist.length; i++) {
				if (!isCompany.includes(this.canextraktlist[i]['brand'].label)) {
					let company = { id: i, name: this.canextraktlist[i]['brand'].label }
					this.companies.push(company);
					isCompany.push(this.canextraktlist[i]['brand'].label);
				}
			}
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
			const filtertext = document.querySelector('.fm-can-blute-filter-heading-header');
			imgsvg.style.filter = 'invert(59%) sepia(64%) saturate(463%) hue-rotate(108deg) brightness(91%) contrast(88%)';
			filtertext.style.color = '#2BBB8A';
		},
		outHover(){
			const imgsvg = document.querySelector('.fm-can-filter-image');
			const filtertext = document.querySelector('.fm-can-blute-filter-heading-header');
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
.fm-can-blute-filter-heading {
	display: flex;
	flex-direction: row;
	margin-bottom:16px;
	padding-top:16px;
}
.fm-can-blute-filter-heading:hover {
	cursor: pointer ;
}

.fm-can-blute-filter-heading-header {
	border-bottom: 1px dotted;
}
.fm-can-blute-filter-heading-header:hover{
    cursor:pointer ;
}
</style>