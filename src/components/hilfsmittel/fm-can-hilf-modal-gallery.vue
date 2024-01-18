<template>
<div id="fm-can-gadget-popup" class="fm-can-gadget-modal" v-show="openModal()"  @click="closeModal">
	<div class="fm-can-gadget-modal-inner"></div>
	<div class="fm-can-gadget-modal-content">
		<div class="d-flex justify-content-end">
		<span class="fm-can-close-img" @click="closeModal" style="margin-top:-17px; margin-right:-17px;"><img id="fm-modal-gallery-close-image" :src="closeImg" width="30" height="30"/></span>
		</div>
		<el-carousel :arrow="arrow" :height="height" :interval="4000" :indicator-position="position" >
                  <el-carousel-item>
                    <div class="item d-flex" style="justify-content:center">
                      <img  class="item__image" :src="gallery.featuredimage.src" alt="" height="300" width="300"/>
                    </div>
                  </el-carousel-item>
                  <el-carousel-item v-for="(image,i) in gallery.images" :key="i">
                    <div class="item d-flex" style="justify-content:center">
                      <img class="item__image" :src="image.src" alt="" height="300" width="300" />
                    </div>
                  </el-carousel-item>
        </el-carousel>

	</div>
</div>
</template>

<script>
import { ElCarousel , ElCarouselItem} from 'element-plus'
import config from "/src/config.js";

export default ({
	created(){
		this.gallery = JSON.parse(JSON.stringify(this.emptyGallery));
	},
	beforeUpdate (){
		this.gallery = JSON.parse(JSON.stringify(this.emptyGallery));
		this.gallery = JSON.parse(JSON.stringify(this.gadget)) ;
	},
	components : {
		ElCarousel , 
		ElCarouselItem
	},
	props : {
		open : { type : Boolean , required : true },
		gadget : { type : Object ,required : true }
	},
	data(){
		return {
			config,
			gallery:{
				featuredimage :{
					src: ''
				}
			},
			emptyGallery : {
				featuredimage :{
					src: ''
				}
			},
			arrow:'always',
			height : '300px',
            position : 'outside',
			closeImg: `${config.svgFolder()}/close_clear.svg`,
		}
	},
	emits : [
		'closemodal',
		'cancelmodal'
	],
	methods : {
		openModal(){
			return this.open ;	
		},
		closeModal(){
			this.gallery = JSON.parse(JSON.stringify(this.emptyGallery)) ;
			console.log(this.gallery);
			this.$emit('closemodal') ;		
		},
		featuredImage(gallery){
			return gallery['featuredimage'].src ;
		}
		
		
	}
})
</script>
<style scoped>
.fm-can-close-img{
	display: flex;
	justify-content: flex-end;
	position:relative;
}

#fm-modal-gallery-close-image:hover{
	cursor:pointer;
	/* filter: invert(59%) sepia(64%) saturate(463%) hue-rotate(108deg) brightness(91%) contrast(88%); */
}
.fm-can-gadget-modal {
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

.fm-can-gadget-modal-inner {
	max-width: 30%;
	margin: 2rem auto;
}

.fm-can-gadget-modal-content{
	position: relative;
	background-color: #fff;
	border:1px solid #FFFFFF;
	background-clip: padding-box;
	border-radius: 0.3rem;
	padding: 1rem;
	width: 40%;
	margin: 200px auto;
}


.fm-can-gadget-modal-content:deep(button.el-carousel__arrow){
	background-color: #F5F5F6 !important;
	color: #198754!important;
	
}
.fm-can-close-img{
	width:30px;
	height:30px;
	background-color: #2FDAA0;
	position : relative ;
}
.fm-can-close-img:hover{
	cursor: pointer;
	background-color: #198754;
}

@media screen and (max-width:415px){
	.fm-can-gadget-modal-content {
		width:90% ;
	}
}
</style>
