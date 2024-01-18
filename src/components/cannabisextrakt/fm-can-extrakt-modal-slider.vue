<template>

	<div class="fm-can-slider-count-block">
		<div class="fm-can-slider-note fm-fnt-400-16-22 fm-fnt-grey-text">{{ sliderparams.note }}</div>
		<input type="number" :value="value" :min="sliderparams.startvalue" :max="sliderparams.endvalue"
			@change="onChange($event.target.value)"  class="fm-can-slider-count fm-fnt-500-18-22 fm-fnt-black">
	</div>
	<div class="fm-can-slider">

		<el-slider :model-value="value1" :show-tooltip="false" :min="sliderparams.startvalue"
			:max="sliderparams.endvalue" :step="1" @input="onInput($event)" @change="onMouseUp">
		</el-slider>

	</div>
	<div class="fm-can-slider-comments fm-fnt-400-14-22">
		<div>{{ sliderparams.startvalue }}</div>
		<div>{{ sliderparams.endvalue }}</div>
	</div>

</template>

<script>
import { ElSlider } from 'element-plus'
export default {
    mounted(){
      this.value1 = this.sliderparams.value ;
      this.value = this.sliderparams.value ;
    },
	props:{
		sliderparams : { type : Object , required : true}
	},
	components: {
		ElSlider,
	},
    emits : [
      'currentslidervalue',
    ],
	data() {
		return {
			value: 0,
			value1: 0,
			placement: 'bottom',
			tooltipclass: 'fm-can-slider-tooltip',
			showt : false
		}
	},
	methods: {
		onInput($event) {
			this.value = $event *1/1;
			this.value1 = this.value * 1/1;
			this.$emit('currentslidervalue',this.value1);
		},
		onMouseUp($event) {
            this.value = $event *1/1;
			this.value1 = this.value *1/1;
            this.$emit('currentslidervalue',this.value1);
		},
		onChange(value) {
			this.value = value * 1 / 1;
			this.value1 = this.value * 1 / 1;
			this.$emit('currentslidervalue', this.value1);
		},
		setToZero(){
			this.value1 = this.sliderparams.value ;
            this.value = this.sliderparams.value ;
		}
	},
	watch:{
		value(){
			this.value1 = this.value * 1 / 1;
			this.$emit('currentslidervalue', this.value1);
		}
	}

}
</script>


<style>

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none; 
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
	appearance: none;
	-moz-appearance: textfield;
}

.fm-can-slider-block {
	padding-left: 40px;
	padding-right: 40px;
	display: flex;
	justify-content: space-between;
}
.fm-can-slider-count-block {
	width:100%;
	margin: 0 auto;
	display: flex;
	justify-content:space-between;
	position: relative;
	top: 16px;
	border: 1px solid #A1A7AE;
	border-radius: 2px 2px 0px 0px;
	padding: 5px 0;
}
.fm-can-slider-note{
	padding-left:10px;
}

.fm-can-slider-count {
	width:45px;
	border:none;
}
.fm-can-slider{
	padding:0!important;
}

.fm-can-slider-comments {
	width:100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin : 0 auto ;
	color : #C4C4C4;
	margin-top:-10px;
	padding:0 !important;
}
.el-slider{
	width:96.3%!important ;
}

 .el-slider__runway{
	background-color: #A1A7AE !important;
	height: 1px !important;
	border-radius: 2px !important;
}

.el-slider__bar {
	height: 2px !important;
	background-color: #2FDAA0 !important;
}

.el-slider__button-wrapper {
	top: -16px !important;
}

.el-slider__button {
	border-color: #2FDAA0 !important;
	height: 15px !important;
	width: 15px !important;
	background-color: #2FDAA0 !important;
}
.el-slider__button {
	margin-left:14px!important;
}
</style>