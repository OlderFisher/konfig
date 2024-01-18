export default {
    actions:{

    },
    state() {
        return {
           hilfsmitteltext : '' ,
           gadgestext : '',

           totalgadgets : [],
           gadgetstocart : [],
           hilfdiagnose : '',
           
           hilsmittelbuttons: [
            { id: '1', title: 'Vaporizer', name: "hilfsmittelchoice", checked: true },
            { id: '2', title: 'Zubehör'  , name: "hilfsmittelchoice", checked: false },
            ],

           hilfsmittelenablebuttons : true ,
           hilfsmittelfinalmessage : false ,
          
        }
    },
    mutations : {

        setHilfsmittelButtons(state,statement){
            state.hilsmittelbuttons.forEach(item => {
                item.checked = false;
             });
             state.hilsmittelbuttons[statement].checked = true;
        },
        hilfAddGadget(state, gadget){
            let gadgetAmount = gadget[0] ;
            let gadgetName = gadget[1] ;
            
            let newGadget = true ;
            for( let gadget of state.totalgadgets ){
                if ( gadget.name == gadgetName ){
                    gadget.amount = gadgetAmount ;
                    newGadget = false ;
                }
            }
            if ( newGadget ){
                let gadgetObj = {
                    name : gadgetName ,
                    amount : gadgetAmount
                } ;
                state.totalgadgets.push(gadgetObj) ;
            }

            state.gadgestext = '';
            for ( let gadget of state.totalgadgets){
                if( gadget.amount != 0 ){
                    state.gadgestext += gadget.amount + ' x ' + gadget.name + ' ; ' +  "\n"  ;
                }
            }
            state.hilfsmitteltext = state.gadgestext + state.hilfdiagnose ;
        },
        hilfRemoveGadget(state,gadgetName){

            console.log(gadgetName) ;

            for (let i=0 ; i<state.totalgadgets.length ; i++ ){
                if( state.totalgadgets[i].name == gadgetName ){
                    state.totalgadgets[i].amount = 0;
                }
            }
            for (let i=0 ; i<state.gadgetstocart.length ; i++ ){
                if( state.gadgetstocart[i].name == gadgetName ){
                    state.gadgetstocart[i].amount = 0;
                }
            }
            state.gadgestext = '';
            for ( let gadget of state.totalgadgets){
                if( gadget.amount != 0 ){
                    state.gadgestext += gadget.amount + ' x ' + gadget.name + ' ; ' +  "\n"  ;
                }
            }
            state.hilfsmitteltext = state.gadgestext + state.hilfdiagnose ;
        },
        hilfAddDiagnose(state,diagnose){
            state.hilfdiagnose = diagnose ;
            state.hilfsmitteltext = state.gadgestext + ' Diagnose : ' + state.hilfdiagnose ; 
        },
        setHilfsmittelCardBlockStatement(state,statement){
            state.hilfsmittelenablebuttons = statement ;
        },
        setHilfsmittelFinalMessage(state,statement){
            state.hilfsmittelfinalmessage = statement
        }

        
        
    },
    getters: {
        getHilfsmittelText(state){
            return state.hilfsmitteltext ;
        },
        getTotalGadgets(state){
            return state.totalgadgets ;
        },
        getTotalCartGadgets(state){
            state.gadgetstocart = []
            state.gadgetstocart = state.totalgadgets.filter(function(item){ //delete from array if amount = 0
                return item.amount > 0
            })
            return state.gadgetstocart ;
            
        },
        getTotalGadgetsAmount(state){
            var total = 0 ;
            for( let gadget of state.totalgadgets ) {
                total += gadget.amount * 1 /1 ;
            }
            return total ;
        },
        getTotalGedgetsChoosen(state){
            var total = 0 ;
            for( let gadget of state.totalgadgets ) {
                total += gadget.amount * 1 /1 ;
            }
            if ( total > 0 ){
                return false
            }else {
                return true
            }
        },
        getGadgetStatementTable(state){
            return state.totalgadgets ;
        },
        getHilfsmittelButtons(state){
            return state.hilsmittelbuttons ;
        },
        getGadgetDiagnose(state){
            return state.hilfdiagnose ;
        },
        getHilfsmittelCardBlockStatement(state){
            return state.hilfsmittelenablebuttons ;
        },
        getHilfsmittelFinalMessage(state){
            return state.hilfsmittelfinalmessage ;
        },
        


    }
}