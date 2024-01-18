<template>
	<div id="fm-can-mobile-template">	
		<img id="fm-can-modile-menu-activeicon" v-bind:src="setActiveIcon" width="26" height="26"/>
	<el-select :value="selected" @change=onChange($event) :placeholder="placeholder">
		
		<el-option v-for="(element, i) in menu" :key="i"  :value="element.id">
			<div><img class="fm-can-mobile-innericon" v-bind:src="`${config.svgFolder()}${element.icon}`" width="26" height="26" /><span>{{element.name}}</span></div>
		</el-option>
	</el-select>
	</div>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus'
import config from "/src/config.js";
export default {
	components: {
		ElSelect,
		ElOption,
	},
	emits: [
		'selectedmenu'
	],
	props: {
		menu: { type: Object, required: true }
	},
	data() {
		return {
			config,
			selected: '',
			placeholder: '',
			id:''
		}
	},
	methods: {
		onChange(value) {
			for (let i = 0; i < this.menu.length; i++) {
				if (this.menu[i].id === value) {
					this.selected = this.menu[i].name;
					this.placeholder = this.selected;

					// this.id = this.menu[i].id;
					this.id = i;
					this.$emit('selectedmenu', {
						value: this.selected,
						i : this.id
					});
				}
			}
		}

	},
	computed:{
		setActiveIcon(){
			var activeIcon ='';
			for( let element of this.menu){
				if( element.active ){
					activeIcon = `${config.svgFolder()}${element.icon}` ;
				}
			}
			return activeIcon ;
		}
	},
	
	mounted() {
		let list = document.querySelectorAll('ul > li.el-select-dropdown__item');
		for( let l of list){
			l.style.padding = "0" ;
		}
		for( let i=0 ; i < this.menu.length; i++) {
			if( this.menu[i].active){
				this.selected = this.menu[i].name;
				this.placeholder = this.selected;
			}
		}

	}
}
</script>

<style scoped>

@media screen and (max-width:1001px){


	
	.fm-can-mobile-menu{
		padding-left: 0px!important;
		padding-right: 35px!important;
	}
	#placeholder {
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 22px;
	}

	#fm-can-mobile-template{
		width:320px!important ;
		position:relative;
	}
	#fm-can-modile-menu-activeicon{
		position:absolute;
		z-index: 1000;
		top: 6px;
		left: 10px;
		
	}
	.el-select {
		width: 100%;
	}
	.fm-can-mobile-innericon{
		margin: 0 10px 0 10px;
	}

    #fm-can-mobile-template:deep(
	.el-input__wrapper,
	.el-input__inner,
	.el-input,
	.el-input--suffix) {
		height: 38px !important;
		background-image: #D5F8EC;
		color: #1C1C1C!important ;
	}

	#fm-can-mobile-template:deep(.el-input__wrapper) {
		background-color: #D5F8EC!important;
		border: 1px solid #D5F8EC !important;
		border-radius: 2px !important;
		background-image:#D5F8EC ;
		box-shadow:none!important;
		padding-left:45px!important;
	}

	#fm-can-mobile-template:deep(input.el-input__inner) {
		height: 48px !important;
		color: #1C1C1C!important ;
		/* background: url(`${config.svgFolder()}${element.icon}`) no-repeat scroll 7px 7px;
		padding-left:30px; */
	}
	#fm-can-mobile-template:deep(.el-input__suffix-inner){
		border-left: 1px solid #2FDAA0 !important;
	}

	#fm-can-mobile-template:deep(i.el-icon svg){
		color : #2FDAA0!important;
	}
	#fm-can-mobile-template:deep(ul.el-select-dropdown__list li.el-select-dropdown__item ) {
		padding: 0 0 !important;
	}
	
}
</style>