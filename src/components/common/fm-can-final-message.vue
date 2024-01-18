<template>
    <div v-if="showStatement && !mobile" class="fm-can-finish-message text-center" style="padding-bottom:32px;">
		<span v-show="!mobile" class="fm-fnt-500-16-22 fm-fnt-green">Ihr Rezept ist fertig. </span><span class="fm-fnt-500-16-22" style="color:#6C7682">Wählen Sie Ihren nächsten Schritt aus dem Menü rechts aus:</span>
	</div>	
    <div v-if="showStatement && mobile" class="fm-can-finish-message text-left ps-4" style="padding-bottom:32px;">
        <div v-show="mobile" class="fm-fnt-500-16-22 fm-fnt-green">Ihr Rezept ist fertig.</div>
        <div class="fm-fnt-500-16-22" style="color:#6C7682">Wählen Sie Ihren nächsten Schritt aus:</div>
	</div>	
</template>
<script>

export default({
    props: {
        showStatement : { type : Boolean , default : false },
    },
    updated(){

        this.mobile = window.screen.availWidth > 1000 ? false : true;
        console.log(this.mobile);
    },
    data(){
        return{
            mobile: '',
        }
    }

})
</script>