<template>
	<div id="fm-can-postimage-block" class="fm-can-postimage-block-image">
	<svg id="fm-can-postimage-svg" viewBox="0 0 1000 722">
		<image v-if="storeLinksArray[0].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-yellow.svg`" />
		<image v-if="storeLinksArray[1].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-yellow.svg`" />
		<image v-if="storeLinksArray[2].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-rose.svg`" />
		<image v-if="storeLinksArray[3].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-yellow.svg`" />
		<image v-if="storeLinksArray[4].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-rose.svg`" />
		<image v-if="storeLinksArray[5].active" id="fm-can-card-image" :href="`${config.svgFolder()}/card-presc-yellow.svg`" />

            <foreignObject x="80" y="400" width="520" height="210">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <div class=" TextOnImage__text">
                        <div v-if="storeLinksArray[0].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getBluteText }}</div>
                        <div v-if="storeLinksArray[1].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getExtractText }}</div>
                        <div v-if="storeLinksArray[2].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getOligeText }}</div>
                        <div v-if="storeLinksArray[3].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getDronabinolText }}</div>
                        <div v-if="storeLinksArray[4].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getHilfsmittelText }}</div>
                        <div v-if="storeLinksArray[5].active" id="fm-can-postimage-internal-message" class="fm-fnt-300-28-30 fm-fnt-black" style="white-space: pre-line">{{ getCannaxanText }}</div>
                    </div>
                </div>
            </foreignObject>
    </svg>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from "/src/config.js"

export default ({
	setup() {
		
	},
	created(){
		this.$watch('activeMenuElement',(newVal, oldVal) => {
			if( newVal !== oldVal ){
                for(let element of this.storeLinksArray){
                   element.active = false ;
                  if ( element.name == this.activeMenuElement ){
					element.active = true ;
                  }
                }
			}
        })
	},
	
	mounted(){
		for(let element of this.storeLinksArray){
				element.active = false ;
				if ( element.name == this.activeMenuElement ){
					element.active = true ;
				}
		}
	},
	props :{
		activeMenuElement : String
	},
	data(){
		return {
			config,
			svgFolder : '/img/svg/',
			outputMessage : '',
			hilfpage : true,
			storeLinksArray : [
				{ name: 'Cannabisblüte', 	active : false	},	
                { name: 'Cannabisextrakt', 	active : false	},
                { name: 'Ölige CBD-Lösung', active : false	},
                { name: 'Dronabinol', 		active : false  },		
                { name: 'Hilfsmittel', 		active : false  },
                { name: 'Cannaxan 701-1.2', active : false	}
			],
			
		}
	},
	methods : {
		
	},
	computed :{
		...mapGetters([
			'getBluteText',
            'getExtractText',
			'getOligeText',
			'getDronabinolText',
			'getHilfsmittelText',
			'getCannaxanText',
		]),
	}
})
</script>

<style scoped>

#fm-can-postimage-block{
	padding:15px;
}

.fm-can-postimage-block-image{
	width: 100%;
}
#fm-can-card-image{
	width:100%;
	height: auto;
}




</style>
