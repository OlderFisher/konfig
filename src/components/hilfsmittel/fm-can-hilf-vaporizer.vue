<template>
	<fm-can-regular-desc>
		<div class="fm-fnt-300-12-16 fm-fnt-black" style="margin-bottom:10px">
			Eine Verordnung von Verdampfern und deren Verschleißteilen zulasten der Krankenkasse ist möglich, sofern
			eine Kostenübernahme vonseiten der Krankenkasse vorliegt.	
		</div>
		<div class="fm-fnt-300-12-16 fm-fnt-black">
			Aktuell liegt für zwei Verdampfer eine medizinische Zulassung vor.
		</div>
	</fm-can-regular-desc>

	<div class="row ps-4" style="margin-top:14px; margin-bottom:12px;">
		<div class="fm-can-heading fm-fnt-500-16-22 fm-fnt-black" style="padding-left:17px">
			<div class="col-12">
				Wählen sie das zu verschreibende produkt aus (mehrfachauswahl möglich)
			</div>
		</div>
	</div>

	<fm-can-radio-buttons :radiobuttons="getHilfsmittelButtons" 
		@radiobuttonchecked="setView($event)">
	</fm-can-radio-buttons>

		
	<fm-can-hilf-vapor-table v-if="vaporView()" :vaporizes="allVaporizers" ></fm-can-hilf-vapor-table>

	<fm-can-hilf-gadget-table v-if="gadgetView()" :gadgets="allGadgets"></fm-can-hilf-gadget-table>

	<div class="row ps-4" style="padding-top:24px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="getTotalGedgetsChoosen" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>


</template>


<script>
import FmCanRegularDesc from '@/components/common/fm-can-regular-desc.vue'
import FmCanRadioButtons 	from '@/components/common/fm-can-radio-buttons.vue'
import FmCanHilfVaporTable from '@/components/hilfsmittel/fm-can-hilf-vapor-table.vue'
import FmCanHilfGadgetTable from '@/components/hilfsmittel/fm-can-hilf-gadget-table.vue'

import { mapGetters } from 'vuex'
import config from "/src/config.js";

export default ({
	computed :
		mapGetters([
			'allVaporizers',
			'allGadgets',
			'getHilfsmittelButtons',
			'getTotalGedgetsChoosen',
		]),
	emits:[
		'stepgone'
	],
	components: {
		FmCanRegularDesc,
		FmCanRadioButtons,
		FmCanHilfVaporTable, 
        FmCanHilfGadgetTable,
		
	},
	data(){
		return{
			config,
			vaporizers : [],
			gadgets : [],
			greenButton : false ,
			commonChoosenCheck : [false,false],

		}
	},
	methods :{
		setView(value){
           this.$store.commit('setHilfsmittelButtons',value);
        },
		vaporView(){
			return this.$store.getters.getHilfsmittelButtons[0].checked ;
		},
		gadgetView(){
			return this.$store.getters.getHilfsmittelButtons[1].checked ;
		},
		stepGone(){
            this.$emit('stepgone',{
			accpart : 0 ,
			accstate : true
			}
		) ;
	}

	}
})
</script>