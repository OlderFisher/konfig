<template>
	<div class="accordion-grey">
		<div v-for="(element, i) in accElements" v-bind:key="i" class="accordion-grey-item">
			<fm-can-grey-accordion 
				:active="element.active" 
				:title="element.title" 
				:id="element.id"
				:step="element.step"
				:component="element.component"
				:disabled="element.disabled"
				@openclose="ariaToggle($event)"
				@accstepgone="stepGone($event)"
			>
			</fm-can-grey-accordion>
		</div>
	</div>
</template>

<script>
import FmCanGreyAccordion from "@/components/common/fm-can-grey-accordion.vue";

export default ({
	components: {
		FmCanGreyAccordion
	},
    emits :[
		'enabledbuttons'
	],
	data() {
		return {
			accElements: [
				{ active: true,  title: 'Sorte Auswählen', 	id: '1' , component : 'FmCanDronabinolSorte' , disabled : false, step : false},
				{ active: false, title: 'Dosierung', 		id: '2' , component : 'FmCanDronabinolDosier', disabled : true, step : false },
			]
		}
	},
	methods: {
		ariaToggle($event) {
			for (let i = 0; i < this.accElements.length; i++) {
				if (this.accElements[i].id === $event) {
					this.accElements[i].active = !this.accElements[i].active;
					this.accElements[i].disabled = false;
				}else if(this.accElements[i].step){
					this.accElements[i].active = false;
					this.accElements[i].disabled = false;
				}
			}
		},
		enableCardButtons($event){
			this.$store.commit('setDronabinolCardBlockStatement',$event);
		},
		stepGone($event){

			// check for false step event
			if( this.$store.getters.getDronabinolKaplseln.value > 0 || this.$store.getters.getDronabinolTropfen.value >0 ){
				this.accElements[0].step = true
			}else{
				this.accElements[0].step = false
			}
			if( this.$store.getters. getDronabinolInputs[0].value && this.$store.getters. getDronabinolInputs[1].value){
				this.accElements[1].step = true
			}else{
				this.accElements[1].step = false
			}
			// set steps to real state
			// this.accElements[$event.accpart].step = $event.accstate ;	
			// check all steps for true
			let checkState = this.accElements.filter(item => item.step) ;
			
			if( checkState.length == this.accElements.length ){
				this.enableCardButtons(false);
			}else{
				this.enableCardButtons(true);
			}
			//if 0 element step is false set accordion to start statement
			if ( $event.accstate == false ){
				if( ($event.accpart + 1) < this.accElements.length ){
					this.accElements[$event.accpart + 1].active = false ;
					this.accElements[$event.accpart + 1].step = false ;
					this.accElements[$event.accpart + 1].disabled = true ;
				}
			}else {
				if( ($event.accpart + 1) < this.accElements.length ){
					this.accElements[$event.accpart + 1].active = true;
					this.accElements[$event.accpart].active = false;
					let id = "accordion-button_"+this.accElements[$event.accpart +1 ].id ;
                    var anchor = document.getElementById(id);
                    anchor.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
				}else{
					this.accElements[$event.accpart].active = true;
					this.accElements[$event.accpart].disabled = false;
				}
			}
        }
	}
})
</script>
