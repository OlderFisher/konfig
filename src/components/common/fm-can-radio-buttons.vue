<template>
  <div class="row form-group fm-can-radio-buttons-block pt-2 pb-2 pt-lg-3 pb-lg-1">
  <div v-for="(element,i) in radiobuttons" v-bind:key="i" class="form-check fm-can-radiobutton d-flex"  @change.prevent="onChange($event.target)"  @mouseover.prevent="onHover($event.target)" @mouseout="outHover($event.target)">
        <input class="form-check-input" type="radio" :name="element.name" :id="setId(element.id,element.name)" :checked="element.checked" :value="i">
        <label class="form-check-label" :for="setId(element.id,element.name)">
          {{ element.title }}
        </label>
    </div>
  </div>
</template>

<script>


export default ({
    props: {
        radiobuttons : { type : Object , required : true},
    },
    emits:[
      'radiobuttonchecked'
    ],
    methods : {
        setId(i,name) {
            return 'fm-can-radio-' + name + '-' + i;
        },
		onChange(target){
			target.classList.remove('hover-input') ;
			this.$emit('radiobuttonchecked',target.value) ;
		},
        onHover(target){
			if (target.tagName == 'DIV'){
				if ( target.classList.contains("fm-can-radiobutton") || target.classList.contains("form-check") || target.classList.contains("form-check-elements")){
					if( !target.querySelector('input').checked) {
						target.querySelector('input').classList.add('hover-input');
					}
					
				}
			}
			if (target.tagName == 'INPUT'){
				if( !target.checked) {
					target.classList.add('hover-input');
				}
			}
			if (target.tagName == 'LABEL'){
				let parentdiv = (target.parentElement);
				const inpp = parentdiv.querySelector('input')
				if( !inpp.checked) {
						inpp.classList.add('hover-input');
				}
				
			}
		},
		outHover(target){
			if (target.tagName == 'DIV'){
				if ( target.classList.contains("fm-can-radiobutton") || target.classList.contains("form-check") || target.classList.contains("form-check-elements")){
					if( !target.querySelector('input').checked) {
						target.querySelector('input').classList.remove('hover-input');
					}
					
				}
			}
		},	

    }
})
</script>



<style scoped>
    .fm-can-radio-buttons-block{
    padding-left: 40px;
    padding-right: 40px;
    display:flex;
    justify-content: space-between;
}
.form-check{
  padding-left: 0px;
}
.fm-can-radiobutton{
    background: #FFFFFF;
    border: 1px solid #A1A7AE;
    border-radius: 2px;
    width:49%!important;
    display:flex ;
    justify-content: flex-start;
    height:64px;
    padding-left:0px;
	
}
.fm-can-radiobutton:hover{
    cursor:pointer ;
}
.form-check{
    display: flex !important;
    flex-direction: row;
    justify-content: flex-start !important;
    align-items: center !important;
    padding:0px;
	padding-left:64px;
}
.form-check:hover{
    cursor:pointer ;
}
.form-check-label{
    width:98%;
	height:100%;
	padding-top:20px;
	padding-left:12px;
}
.form-check-label:hover{
    cursor:pointer;
}
input.form-check-input {
    width:27px;
    height: 27px;
    border-color: #E4E4E4;
    border : 8px solid #E4E4E4 ;
  
}
    .form-check-input:hover{
    cursor: pointer;
}
    input.form-check-input:checked{
    border: 2px solid #2FDAA0;
    background-color: #2FDAA0;
}
    input.form-check-input:focus {
    border-color: none;
    background-color: none;
    outline:none!important;
    box-shadow: none!important;
    /* background-color: #2FDAA0; */
}
.hover-input{
    border : 8px solid #D5F8EC !important;
}


@media screen and (max-width:415px ){
    .fm-can-radiobutton {
		height : 50px ;
		padding-left: 12px;
	}
	.form-check input{
		width:17px;
		height:17px;
	}
    .form-check label {
		font-family: 'Ubuntu';
		font-style: normal;
		font-weight: 300;
		font-size: 14px;
		line-height: 19px;
		color: #1C1C1C;
		margin-left: 5px;
	}
}
</style>
