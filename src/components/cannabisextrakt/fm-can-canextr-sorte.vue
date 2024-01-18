<template>
    <fm-can-warning-desc>
        <div class="fm-fnt-300-12-16 fm-fnt-black">
            <strong>ACHTUNG:</strong>  Bei Ausstellung eines GKV-Rezeptes darf laut <a :href="pdfLink" class="fm-fnt-green-link" target="_blank"><strong>Bundesmantelvertrag-Ärzte</strong></a> lediglich 
            ein <span class="fm-fnt-red">Rezepturarzneimittel</span> verordnet werden. Das bedeutet, dass für jedes Cannabisextrakt ein eigenes BtM-Rezept 
            ausgestellt werden sollte.
        </div>
    </fm-can-warning-desc>

    <fm-can-extrakt-filter :canextraktlist="canExtraktList" @filterchanged="applyFilter($event.filter)">
    </fm-can-extrakt-filter>

    <div class="row fm-can-heading fm-fnt-500-16-22 fm-fnt-black ps-4" style="margin-top:10px; margin-bottom:16px">
        <div class="col-12">
            Bitte wählen Sie eine Extrakt aus der Liste
        </div>
    </div>


    <fm-can-output-extrakt-table :canlist="canExtraktList" @setactivextrakt="setActiveExtr($event.index)">
    </fm-can-output-extrakt-table>

    <div class="row ps-4" style="padding-top:24px; padding-bottom:29px">
		<button class="fm-can-btn-weiter fm-fnt-500-16-22 ps-2 pe-2 pb-1 ms-3" :disabled="!greenButtonState" @click="stepGone" >Weiter<img class="fm-can-weiter-image" :src="`${config.svgFolder()}/weiter_right_arrow.svg`" ></button>
	</div>

</template>


<script>
import FmCanWarningDesc from '@/components/common/fm-can-warning-desc.vue'
import FmCanExtraktFilter from '@/components/cannabisextrakt/fm-can-extrakt-filter.vue'
import FmCanOutputExtraktTable from '@/components/cannabisextrakt/fm-can-output-extrakt-table.vue'
import config from "/src/config.js";

export default ({
    async created() {     
        this.canExtraktOriginal = this.$store.getters.getAllExtracts ;
        this.canExtraktList = this.$store.getters.getAllExtracts;
      
    },
    mounted(){
        let activeProduct = this.$store.getters.getExtractSorteActive ;
        for( let i= 0 ; i < this.canExtraktList.length ; i++ ){
            if(this.canExtraktList[i].productname == activeProduct)
            this.setActiveExtr(i);
        }
    },
	components: {
		FmCanWarningDesc,
        FmCanExtraktFilter,
        FmCanOutputExtraktTable
	},
    emits:[
		'stepgone'
	],
    data(){
        return {
            config,
            canExtraktOriginal : [],
            canExtraktList : '',
            pdfLink : `${config.pdfFolder()}/bundesmantelvertrag-aerzte-cannabis-apotheke.pdf`,
            greenButtonState : false ,
        }
    },
    methods : {
        setActiveExtr(i){
            this.canExtraktList.forEach(function(item){
                item.active=false ;
            });
            this.canExtraktList[i].active = true ;
            this.greenButtonState = true ;
         
            let product = this.canExtraktList[i].productname ;

            this.$store.commit('setActiveExtract',[product,i,JSON.stringify(this.canExtraktList)]) ;
        },
        stepGone(){
		this.$emit('stepgone',{
			accpart : 0 ,
			accstate : true
			}
		) ;
        },
        applyFilter(filterConds) {
            
            // thc/cbd filter
            let limitTHC = filterConds.thc * 1 / 1;
            let limitCBD = filterConds.cbd * 1 / 1;

            let arrByTHCCBD = [];
            for (let extract of this.canExtraktOriginal) {
                let currentTHC = extract.thc * 1 / 1;
                let currentCBD = extract.cbd * 1 / 1;
                if (currentTHC <= limitTHC && currentCBD <= limitCBD) {
                    arrByTHCCBD.push(extract);
                }
            }

            // vorrat filter
            let vorratCond = filterConds.vorrat;
            let arrByVorrat = [];
            if (vorratCond) {
                for (let element of arrByTHCCBD) {
                    if (element.availability){
                        arrByVorrat.push(element)
                    }
                }
            } else {
                arrByVorrat = JSON.parse(JSON.stringify(arrByTHCCBD));
            }

            // company filter
           
            let companyCond = filterConds.company;
            let companySearch = companyCond.trim().toLowerCase().replace(/\s+/g,'');
            let arrByCompany = [];

            if ( companySearch != 'alleherstellers') {
                for (let company of  arrByVorrat) {
                    let brandLabel = company.brand.label ;
                    let brandSearch = brandLabel.trim().toLowerCase().replace(/\s+/g,'');
                   
                    if (companySearch === brandSearch) {
                        arrByCompany.push(company);
                    }
                }
            } else {
                arrByCompany = JSON.parse(JSON.stringify(arrByVorrat));
            }
           

            // genetik filter

            let arrByGenetik = [];
            arrByGenetik = JSON.parse(JSON.stringify(arrByCompany));

            let dynamicArr = [];
            if (!filterConds.genetik.indica) {
                for (let element of arrByGenetik ) {
                    if (element.genetic !== 'Indica') {
                        dynamicArr.push(element);
                    }
                }
                arrByGenetik = JSON.parse(JSON.stringify(dynamicArr));
                dynamicArr = [];
            }
            if (!filterConds.genetik.sativa) {
                for (let element of arrByGenetik ) {
                    if (element.genetic !== 'Sativa') {
                        dynamicArr.push(element);
                    }
                }
                arrByGenetik = JSON.parse(JSON.stringify(dynamicArr));
                dynamicArr = [];
            }
            if (!filterConds.genetik.hybrid) {
                for (let element of arrByGenetik ) {
                    if (element.genetic !== 'Hybrid') {
                        dynamicArr.push(element);
                    }
                }
                arrByGenetik = JSON.parse(JSON.stringify(dynamicArr));
                dynamicArr = [];
            }

            // filter by Search field
            let arrBySearch = [];
            if (filterConds.search.length > 0) {
                let trimSearch = filterConds.search.trim().toLowerCase();
                for (let element of arrByGenetik ) {
                    let trimSorte = element.productname.trim().toLowerCase();
                    let trimKultivar = element.cultivar.trim().toLowerCase();
                    if (trimSorte.indexOf(trimSearch) > -1 || trimKultivar.indexOf(trimSearch) > -1) {
                        arrBySearch.push(element);
                    }
                }
            } else {
                arrBySearch = JSON.parse(JSON.stringify(arrByGenetik));
            }

            this.canExtraktList = JSON.parse(JSON.stringify(arrBySearch));
        },
    },
    
})


</script>
