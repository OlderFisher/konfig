export default {
    actions:{

    },
    state() {
        return {
           cannaxantext : '' ,
           cannaxtext_1 : '',
           cannaxtext_2 : '',
           canml : 0,
           candosed : 'n.a',
           candostd : 'n.a',
           dosier : 6.9,

           // cannaxan current elements statement
            slidercannaxan: { startvalue: 0, endvalue: 200, step: 10 ,note: 'Menge (milliliter)', value : 0},
            inputfieldscannaxan : [
                { id: '1', title: 'Einzeldosis (ed)', placehold: 'z.B.: 2', value: ''},
                { id: '2', title: 'Tagesmaximaldosis (td)', placehold: 'z.B.: 8', value: ''}
            ],
            canaxxansteps : 2,
            cannaxanenablebuttons : true,
            cannaxsteps : 2 ,
            cannaxcurrentsteps : 0,
            cannaxanfinalmessage : false,
        }
    },
    mutations : {
        canFirstStep(state,canml){
            state.canml = canml ;
            state.slidercannaxan.value = canml ;
            let canmg = state.canml * state.dosier ;
            if( canmg*1/1 >= 1000 ){
                state.cannaxtext_1 = 'Cannaxan 771, 1ml enthält 6.9mg THC, '+state.canml+'ml, Gesamtmenge THC: '+ canmg.toFixed(0)+ 'mg "A" '; 
            }else{
                state.cannaxtext_1 = 'Cannaxan 771, 1ml enthält 6.9mg THC, '+state.canml+'ml, Gesamtmenge THC: '+ canmg.toFixed(0)+ 'mg ';
            }
                state.cannaxantext = state.cannaxtext_1 + state.cannaxtext_2 ;
            if(state.canml == 0 ){
                state.cannaxantext = '';
            }
        },
        canSecStep(state, candose){
         
            if( candose[0]){
                state.candosed = candose[0] ;
                state.inputfieldscannaxan[0].value = candose[0];
             }else{
                 state.candosed = 'n.a' ;
             }
             if( candose[1]){
                state.candostd = candose[1] ;
                state.inputfieldscannaxan[1].value = candose[1];
             }else{
                 state.candostd = 'n.a' ;
             }
             if( state.cannaxantext.length > 0){
                state.cannaxtext_2 = 'Dosierung: ED : ' + state.candosed + ' Sprühstöße , Dosierung: TC : ' + state.candostd + ' Sprühstöße';
                state.cannaxantext = state.cannaxtext_1 + state.cannaxtext_2 ;
            }

        },
        setCannaxanCardBlockStatement(state,statement){
            state.cannaxanenablebuttons = statement ;
        },
        setCannaxanFinalMessage(state,statement){
            state.cannaxanfinalmessage = statement ;
        }
        
    },
    getters: {
        getCannaxanText(state){
            return state.cannaxantext ;
        },
        getCannaxanStatement(state){
            return state.cannaxanstatement ;
        },
        getCannaxanSlider(state){
            return state.slidercannaxan ;
        },
        getCannaxanInputs(state){
            return state.inputfieldscannaxan ;
        },
        getCannaxanCardBlockStatement(state){
            return state.cannaxanenablebuttons ;
        },
        getCannaxanFinalMessage(state){
            return state.cannaxanfinalmessage;
        }
    }
}