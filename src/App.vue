<template>
	<fm-can-header :visible="mainPage"></fm-can-header>

	<!-- Main page -->
	<fm-main-page :menuElements="menuElements"  :visible="mainPage" @menuitemclick="itemClick($event)"></fm-main-page>

	<!-- Tabs page  -->
	<fm-tabs-page :menuElements="menuElements"  :visible="!mainPage"  @tabclicked="tabClick($event)"
		@mobselected="mobSel($event)"></fm-tabs-page>


	<fm-can-footer v-if="mainPage"></fm-can-footer>

	<router-view/>
</template>


<script>

import FmCanHeader from '@/components/fm-can-header.vue'
import FmMainPage from '@/components/fm-main-page.vue'
import FmTabsPage from './components/fm-tabs-page.vue';
import FmCanFooter from '@/components/fm-can-footer.vue'

export default ({
	components: {
		FmCanHeader,
		FmCanFooter,
		FmMainPage,	
		FmTabsPage	
	},
	async mounted() {
		this.$store.dispatch('getVaporizes');
		this.$store.dispatch('getGadgets');
		this.$store.dispatch('getBlutes');
		this.$store.dispatch('getExtracts');
	},
	data: () => ({

		menuElements: [
			{ id:1, active: false, name: 'Cannabisblüte', 		icon: '/cannabisblute.svg' , 	route: `${process.env.BASE_URL}cannabisbluete`},
			{ id:2, active: false, name: 'Cannabisextrakt', 	icon: '/cannabisextrakt.svg' ,  route: `${process.env.BASE_URL}cannabisextrakt`},
			{ id:3, active: false, name: 'Ölige CBD-Lösung', 	icon: '/olige-cbd-losung.svg' , route: `${process.env.BASE_URL}olige-cbd-losung` },
			{ id:4, active: false, name: 'Dronabinol', 			icon: '/dronabinol.svg' , 		route: `${process.env.BASE_URL}dronabinol`},
			{ id:5, active: false, name: 'Hilfsmittel', 		icon: '/hilfsmittel.svg' , 		route: `${process.env.BASE_URL}hilfsmittel` },
			{ id:6, active: false, name: 'Cannaxan 701-1.2', 	icon: '/cannaxan.svg', 			route: `${process.env.BASE_URL}cannaxan-701-1-2` },
		],

		mainPage : true ,

	}),
	methods : {
		itemClick($event){  // Click in main page menu
			this.menuElements[$event].active = true ;
			this.mainPage = false;
		},
		tabClick($event){  // click on tabs page main menu
			this.menuElements.forEach(function (item , i , arr) { arr[i].active = false; });		
			this.menuElements[$event].active = true;
		},
		mobSel($event){
			this.menuElements.forEach(function (item, i, arr) { arr[i].active = false; });
			this.menuElements[$event].active = true;
		}


	}
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap');

</style>