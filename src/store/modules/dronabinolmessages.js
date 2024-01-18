export default {
    actions:{

    },
    state() {
        return {
           drontext : '' ,
           drontext_1 : '',
           drontext_2 : '',
           drontext_3 : '',

           dronpills  : 0,
           dronpillsthc : 0,
           dronkapsmg  : 0,
           drontropfen : 0 ,
           dronpillslabel : ' n.a ',

           droned : '',
           drontd : '',

           dronabinolradiobuttons: [
            { id: '1', title: 'Kapseln (NRF 22.7)'           , name: 'dronabilnolsorte' ,checked: true },
            { id: '2', title: 'Tropfen (NRF 22.8) 25 mg / ml', name: 'dronabilnolsorte' ,checked: false },
        ],
           dronabinolkapselnset: [
            { id: '1', label: ' 2.50 mg ', thc : 2.50,  name: 'radiodronsorte', border: false ,active : true },
            { id: '2', label: ' 5.00 mg ', thc : 5.00,  name: 'radiodronsorte', border: false  ,active : false },
            { id: '3', label: ' 10.00 mg ',thc : 10.00, name: 'radiodronsorte', border: false ,active : false },
        ],
           dronabinolsortekapseln: { startvalue: 0, endvalue: 200, step : 10 , note: 'Menge (stück)',value: 0 },
           dronabinolsortetropfen: { startvalue: 0, endvalue: 100,  step : 10, note: 'Menge (milliliter)',value: 0 },
           dronabinoldosierinputfields: [
            { id: '1', title: 'Einzeldosis (ed)', placehold: 'z.B.: 2', value: '', pattern: /^[0-9]*([.,][0-9]+)?$/ },
            { id: '2', title: 'Tagesmaximaldosis (td)', placehold: 'z.B.: 8', value: '', pattern: /^[0-9]*([.,][0-9]+)?$/ }
        ],
        dronabinolenablebuttons : true,
        dronabinolfinalmessage : false,
        }
    },
    mutations : {
        dronSorteKapselnStep(state,activelement){
            for( let element of state.dronabinolradiobuttons){
                element.checked = false ;
            }
            state.dronabinolradiobuttons[activelement].checked = true ;

            if( activelement == 0 ){
                for( let element of state.dronabinolkapselnset){
                    if( element.active){
                        state.dronpillsthc = element.thc ;
                        state.dronpillslabel = element.label ;
                    }
                }
                state.drontext_1 =  state.dronpills + ' Kapseln a ' + state.dronpillslabel + ' Dronabinol (NRF 22.7), Gesamtmenge THC:'+ state.dronpillsthc +' mg,'
            }
            if( activelement == 1 ){
               let thc = state.drontropfen *1/1 * 25 ;
               state.drontext_1 = 'Ölige Dronabinol Tropfen (NRF 22.8) 25mg/ml, ' + state.drontropfen + ' Gesamtmenge THC: ' + thc + ' mg, ';
            } 
            state.drontext = state.drontext_1+ state.drontext_2;
                   
       },

        dronPillsThcStep(state,index){
            state.dronpillsthc = state.dronabinolkapselnset[index].thc ;   
            for( let element of state.dronabinolkapselnset){
                element.active = false ;
            }
            state.dronabinolkapselnset[index].active = true;

            let thc = state.dronpillsthc * state.dronpills ;
            state.drontext_1 =  state.dronpills + ' Kapseln a ' + state.dronpillsthc + 'mg Dronabinol (NRF 22.7), Gesamtmenge THC:'+ thc +' mg,'
            state.drontext = state.drontext_1+ state.drontext_2;
        },

        dronPillsStep(state,pills){
            state.dronpills = pills ; 
            state.dronabinolsortekapseln.value = pills ;  
            for( let element of state.dronabinolkapselnset){
                if ( element.active){
                    state.dronpillslabel = element.label;
                    state.dronpillsthc = element.thc;
                }
            }   
            let thc = state.dronpillsthc * state.dronpills ;
            state.drontext_1 =  state.dronpills + ' Kapseln a ' + state.dronpillslabel + 'mg Dronabinol (NRF 22.7), Gesamtmenge THC:'+ thc +' mg,'
            state.drontext = state.drontext_1+ state.drontext_2;
            
        },       
        
        dronTropfenStep(state,drontropfen){
            state.drontropfen = drontropfen ;
            state.dronabinolsortetropfen.value = drontropfen ;
            let thc = state.drontropfen *1/1 * 25 ;
            state.drontext_1 = 'Ölige Dronabinol Tropfen (NRF 22.8) 25mg/ml, ' + state.drontropfen + ' Gesamtmenge THC: ' + thc + ' mg, ';
            state.drontext = state.drontext_1+ state.drontext_2;
        },
        dronInputDose(state,drondose){
            if( drondose[0] ){
                state.droned = drondose[0] ;
                state.dronabinoldosierinputfields[0].value = drondose[0] ;
             }else{
                 state.droned = 'n.a' ;
             }
             if( drondose[1] ){
                state.drontd = drondose[1] ;
                state.dronabinoldosierinputfields[1].value = drondose[1] ;
             }else{
                 state.drontd = 'n.a' ;
             }
             if( state.drontext.length > 0){
                state.drontext_2 = 'Dosierung: ED : ' + state.droned + ' , Dosierung: TC : ' + state.drontd + ', oral einnehmen';
                state.drontext = state.drontext_1 + state.drontext_2 ;
            }
        },  
        setDronabinolCardBlockStatement(state,statement){
            state.dronabinolenablebuttons = statement ;
        },
        setDronabinolFinalMessage(state,statement){
            state.dronabinolfinalmessage = statement ;
        }
        
        
    },
    getters: {
        getDronabinolSortelRadioButtons(state){
            return state.dronabinolradiobuttons ;
        },
        getDronabinolSorteKapselnSet(state){
            return state.dronabinolkapselnset ;
        },
        getDronabinolKaplseln(state){
            return state.dronabinolsortekapseln;
        },
        getDronabinolTropfen(state){
            return state.dronabinolsortetropfen ;
        },
        getDronabinolText(state){
            return state.drontext ;
        },
        getDronabinolInputs(state){
            return state.dronabinoldosierinputfields;
        },
        getDronabinolCardBlockStatement(state){
            return state.dronabinolenablebuttons ;
        },
        getDronabinolFinalMessage(state){
            return state.dronabinolfinalmessage ;
        }
        
    }
}