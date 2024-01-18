<template>
	<div class="row faq-section fm-bkg-white ps-0 pe-0 pt-0 pb-5">
		<div class="col-lg-1 col-xxl-2"></div>
		<div class="col-12 col-lg-10 col-xxl-8  ps-lg-5 pe-lg-2 pt-2 pt-lg-4 pb-5 ps-md-4">
			<div class="row faq-main-content ps-4  ps-md-3 ps-xxl-5 pe-md-2 pe-lg-5 mb-5">
				<h3 class="fm-faq-title fm-fnt-500-34-22 fm-fnt-black  ps-md-2 mb-1 pb-1 md-md-5 ">{{ title }}</h3>
				<div class="container fm-faq-content">
					<div class="accordion">
						<div v-for="(faq,i) in faqs" v-bind:key="i" class="accordion-item">
							<button :id="'accordion-button_' + i" class="fm-fnt-500-24-22" :aria-expanded="faq.active"
								@click="ariaToggle(i)">
								<span class="accordion-title">{{ faq.title }} </span>
								<span class="icon" aria-hidden="true"></span>
							</button>
							<transition name="fade">
							<div class="accordion-content" v-show="faq.active">
								<p class="fm-fnt-black fm-fnt-300-16-24">{{ faq.content }}</p>
							</div>
							</transition>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-lg-1 col-xxl-2"></div>
	</div>
</template>

<script>

export default ({
	data: () => ({
		title: 'FAQ',
		faqs : [
			{ active: true,  title: 'What is Rezeptkonfigurator ?', content: 'Werden Pflanzenteile der weiblichen Hanfpflanze (meist Cannabis sativa, Cannabis indica oder deren Kreuzungen) konsumiert, können sie eine berauschende Wirkung hervorrufen. Umgangssprachliche Namen für diese Pflanzenprodukte sind etwa Gras, Weed oder Marihuana (für die weiblichen Blüten) und Haschisch (für das daraus gewonnene und gepresste Harz). Auch Extrakte wie Haschischöl werden als Rauschmittel genutzt. Besitz und Weitergabe solcher Cannabisprodukte sind in den meisten Ländern verboten. Das ist auch in Deutschland, Österreich und der Schweiz der Fall, wo Cannabis, wie auch in vielen anderen Ländern dieser Erde mit einer Cannabis-Prohibition,[1] die am häufigsten konsumierte illegale Rauschdroge ist.'},
			{ active: false, title: 'What is mechanism für diese Pflanzenprodukte?', content: 'Werden Pflanzenteile der weiblichen Hanfpflanze (meist Cannabis sativa, Cannabis indica oder deren Kreuzungen) konsumiert, können sie eine berauschende Wirkung hervorrufen. Umgangssprachliche Namen für diese Pflanzenprodukte sind etwa Gras, Weed oder Marihuana (für die weiblichen Blüten) und Haschisch (für das daraus gewonnene und gepresste Harz). Auch Extrakte wie Haschischöl werden als Rauschmittel genutzt. Besitz und Weitergabe solcher Cannabisprodukte sind in den meisten Ländern verboten. Das ist auch in Deutschland, Österreich und der Schweiz der Fall, wo Cannabis, wie auch in vielen anderen Ländern dieser Erde mit einer Cannabis-Prohibition,[1] die am häufigsten konsumierte illegale Rauschdroge ist.' },
			{ active: false, title: 'What is Cannabis für diese?', content: 'Werden Pflanzenteile der weiblichen Hanfpflanze (meist Cannabis sativa, Cannabis indica oder deren Kreuzungen) konsumiert, können sie eine berauschende Wirkung hervorrufen. Umgangssprachliche Namen für diese Pflanzenprodukte sind etwa Gras, Weed oder Marihuana (für die weiblichen Blüten) und Haschisch (für das daraus gewonnene und gepresste Harz). Auch Extrakte wie Haschischöl werden als Rauschmittel genutzt. Besitz und Weitergabe solcher Cannabisprodukte sind in den meisten Ländern verboten. Das ist auch in Deutschland, Österreich und der Schweiz der Fall, wo Cannabis, wie auch in vielen anderen Ländern dieser Erde mit einer Cannabis-Prohibition,[1] die am häufigsten konsumierte illegale Rauschdroge ist.' },
			{ active: false, title: 'What is mechanism-Rezeptkonfigurator?', content: 'Werden Pflanzenteile der weiblichen Hanfpflanze (meist Cannabis sativa, Cannabis indica oder deren Kreuzungen) konsumiert, können sie eine berauschende Wirkung hervorrufen. Umgangssprachliche Namen für diese Pflanzenprodukte sind etwa Gras, Weed oder Marihuana (für die weiblichen Blüten) und Haschisch (für das daraus gewonnene und gepresste Harz). Auch Extrakte wie Haschischöl werden als Rauschmittel genutzt. Besitz und Weitergabe solcher Cannabisprodukte sind in den meisten Ländern verboten. Das ist auch in Deutschland, Österreich und der Schweiz der Fall, wo Cannabis, wie auch in vielen anderen Ländern dieser Erde mit einer Cannabis-Prohibition,[1] die am häufigsten konsumierte illegale Rauschdroge ist.' },
		],

	}),
	computed: {
		
	},
	methods: {
		ariaToggle(i) {	
					
			for( let j =0 ; j < this.faqs.length ; j++ ){
				if ( j === i){
					this.faqs[i].active = !this.faqs[i].active;
				}else {
					this.faqs[j].active = false ;
				}
			}		
			
		},
	},
	mounted() {
		this.faqs[0].active = window.screen.availWidth < 415 ? false : true;
	},
})
</script>

<style scoped>

.fm-menu-title{
	margin-top:14px!important ;
}
.fm-faq-content{
	margin-top: 16px;
}
.accordion{
	--bs-accordion-border-radius: none!important;
    --bs-accordion-inner-border-radius: none!important;
}
.accordion-item {
	border: none!important;
	border-bottom: 1px solid #DBDFEC !important;
}

.accordion-item button[aria-expanded=true] {
	color: #2FDAA0 !important;
}

.accordion button {
	position: relative;
	display: block;
	text-align: left;
	width: 100%;
	padding: 1em 0;
	border: none !important;
	background: none !important;
	outline: none;
}

.accordion button:hover,
.accordion button:focus {
	cursor: pointer;
	color: #2FDAA0 !important;
}

.accordion button:hover::after,
.accordion button:focus::after {
	cursor: pointer;
	color: #2FDAA0 !important;
}

.accordion-title {
	padding: 1em 1.5em 1em 0;
	font-weight: 500;
	font-size: 24px;
	line-height: 22px;
	color: #1C1C1C;
}

.accordion-title:hover {
	color: #2FDAA0;
}

button[aria-expanded=true] .accordion-title {
	color: #2FDAA0;
}

.accordion button .icon {
	display: inline-block;
	position: absolute;
	top: 18px;
	right: 0;
	width: 32px;
	height: 32px;
	border: 1px solid #D5F8EC;
	color: #2FDAA0 !important;
	background: #D5F8EC !important;
	border-radius: 32px;
}

.accordion button .icon::before {
	display: block;
	position: absolute;
	content: "";
	top: 15px;
	left: 7px;
	width: 16px;
	height: 2px;
	background: currentColor;
}

.accordion button .icon::after {
	display: block;
	position: absolute;
	content: "";
	top: 8px;
	left: 14px;
	width: 2px;
	height: 16px;
	background: currentColor;
}

.accordion button[aria-expanded=true] {
	color: #2FDAA0 !important;
}

.accordion button[aria-expanded=true] .icon::after {
	width: 0;
}

.accordion button[aria-expanded=true]+.accordion-content {
	opacity: 1;
	max-height: 30em;
	transition: all 200ms linear;
	will-change: opacity, max-height;
}

.accordion .accordion-content {
	opacity: 0;
	max-height: 0;
	overflow: hidden;
	transition: opacity 200ms linear, max-height 200ms linear;
	will-change: opacity, max-height;
}

.accordion .accordion-content p {
	margin: 0 0 2em 0;
	width:95%;
}
.accordion-item:deep(last-of-type){
    border-bottom-right-radius: none!important;
    border-bottom-left-radius: none!important;
}	
.fade-enter-active{
	animation: fade 1.0s;
	/* animation-delay: 0.2s; */
}
.fade-leave-active{
	animation: fade 0.5s reverse;
	/* animation-delay: 0.1s; */
}
@keyframes fade {
	from {opacity : 0;}
	to{opacity:1;}
}
@media screen and ( min-width: 997px ){
	.faq-main-content{
		padding-left : 96px;
		padding-right: 96px;
	}

}

@media screen and (max-width: 996px){
	.fm-faq-content{
		padding-left: 20px!important;
		padding-right: 20px!important;
	}
	h3.fm-faq-title{
		padding-left:20px!important ;
	}
}

@media screen and (max-width: 768px){

}

@media screen and (max-width:415px){
	.fm-faq-title{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 22px;
		color: #1C1C1C;
	}
	.accordion-title{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
		color: #1C1C1C;
	}
	.accordion-content{
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 300;
		font-size: 16px;
		line-height: 24px;
		color: #1C1C1C;
		margin-top: 0.5em;
	}
	.accordion-content p{
		margin: 0 0 2em 0 !important;
	}
	.faq-main-content{
		padding-left:30px;
	}
}
</style>
