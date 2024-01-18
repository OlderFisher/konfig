export default {
    actions:{

    },
    state() {
        return {
           oligetext : '',
           oligetext_1 : '',
           oligetext_2 : '',
           oligetext_3 : '',

           oligecbd : '',
           oligeml  : 0,
           oligeradio : '',
           oligealternative : false ,
           oligdosed : 'n.a',
           oligdostd : 'n.a',
           oligekind : ' ml ',

           oligesorteradiodata :[
            { id: '1', label: ' 50 Mg/ml ' , name: 'radiooligesorte', border: false , active : false},
            { id: '2', label: ' 100 Mg/ml ', name: 'radiooligesorte', border: false , active : false},
            { id: '3', label: ' 200 Mg/ml ', name: 'radiooligesorte', border: false , active : false},
            { id: '4', label: ' 400 Mg/ml ', name: 'radiooligesorte', border: false , active : false},
          ],
           oligesorteslider: { startvalue: 0, endvalue: 250, step: 1 ,note: 'Menge (milliliter)',value:0, disabled:true},
           oligedosierradiobuttons: [
            { id: '1', title: 'Orale Einnahme', name : 'radiodosier',  checked: true},
            { id: '2', title: 'Alternativ', name : 'radiodosier',checked: false },
        ],
           oligedosierdosenkind : [
            { id: '1', label: ' Mg ', name: 'radiooligedosier', border: false , active : false },
            { id: '2', label: ' Tropfen ', name: 'radiooligedosier', border: false , active : false},
        ],
           oligedosierinputfields : [
            { id: '1', title: 'Einzeldosis (ed)', placehold: 'z.B.: 2',       value: '', disabled: true },
            { id: '2', title: 'Tagesmaximaldosis (td)', placehold: 'z.B.: 8', value: '', disabled: true }
        ],
           oligedosiertextarea : '',
           oligeenabledbuttons : true ,
           oligefinalmessage : false ,
        }
    },
    mutations : {
        oligeFirstStep(state,radioindex){
            state.oligecbd = state.oligesorteradiodata[radioindex].label ;
            for( let element of state.oligesorteradiodata){
                element.active = false ;
            }
            state.oligesorteslider.disabled = false;
            state.oligesorteradiodata[radioindex].active = true ;

            state.oligetext_1 = 'Ölige Cannabidiol-Lösung (NRF 22.10),' + state.oligecbd+' , ';
            state.oligetext = state.oligetext_1 + state.oligetext_2 + state.oligetext_3;
        },
        oligeSecStep(state,oligeml){
            state.oligenml = oligeml ;
            state.oligesorteslider.value = oligeml ;
            state.oligetext_2 = state.oligenml + 'ml , ';
            if( state.oligetext.length > 0 ){
                state.oligetext = state.oligetext_1 + state.oligetext_2 + state.oligetext_3;
            }
            
        },
        oligeRadioStep(state,oligeradio){
            console.log(oligeradio)
            if( oligeradio == 0 ){
                state.oligedosierradiobuttons[0].checked = true ;
                state.oligedosierradiobuttons[1].checked = false ;
                state.oligealternative = false ;
                state.oligeradio = ' oral einnehmen ' ;
                state.oligetext_3 = 'Dosierung :  ED : ' + state.oligdosed + state.oligekind + ' TC : ' + state.oligdostd + state.oligekind + state.oligeradio;
               
            }else{
                state.oligedosierradiobuttons[0].checked = false ;
                state.oligedosierradiobuttons[1].checked = true ;
                state.oligealternative = true ;
                state.oligeradio = '';
                state.oligetext_3 = 'Dosierung : ' + state.oligedosiertextarea ;
            }
            state.oligetext = state.oligetext_1 + state.oligetext_2  +  state.oligetext_3;
            
        },
        oligeDose(state,oligedos){   
            if( oligedos[0] ){
               state.oligdosed = oligedos[0] ;
               state.oligedosierinputfields[0].value = oligedos[0];
            }else{
                state.oligdosed = 'n.a' ;
            }
            if( oligedos[1] ){
                state.oligdostd = oligedos[1] ;
                state.oligedosierinputfields[1].value = oligedos[1];
             }else{
                 state.oligdostd = 'n.a' ;
             }
            if( state.oligetext.length > 0 ){
                state.oligetext_3 = 'Dosierung :  ED : ' + state.oligdosed + state.oligekind + ' TD : ' + state.oligdostd + state.oligekind ;
                state.oligetext = state.oligetext_1 + state.oligetext_2  +  state.oligetext_3 + state.oligeradio;
            }
        },
        oligeKind(state, index){
            for( let element of state.oligedosierdosenkind ){
                element.active = false ;
            }
            for(let element of state.oligedosierinputfields){
                element.disabled = false ;
            }
            state.oligedosierdosenkind[index].active = true ;
            state.oligekind = state.oligedosierdosenkind[index].label ;
            if( state.oligetext.length > 0 ){
                state.oligetext_3 = 'Dosierung :  ED : ' + state.oligdosed + state.oligekind + ' TD : ' + state.oligdostd + state.oligekind ;
                state.oligetext = state.oligetext_1 + state.oligetext_2  +  state.oligetext_3 + state.oligeradio;
            }
        },
        oligeText(state,oligetextarea){
                state.oligedosiertextarea = oligetextarea ;
                if( state.oligetext_2.length > 0 ){
                    state.oligetext_3 = 'Dosierung : ' + state.oligedosiertextarea ;
                    state.oligetext = state.oligetext_1 + state.oligetext_2  +  state.oligetext_3 + state.oligeradio;
                }    
        },
        setOligeCardBlockStatement(state,statement){
            state.oligeenabledbuttons = statement ;
        },
        setOligeFinalMessage(state, statement){
            state.oligefinalmessage = statement ;
        }
        
    },
    getters: {
        getOligeText(state){
            return state.oligetext;
        },
        getOligeSorteRadio(state){
            return state.oligesorteradiodata;
        },
        getOligeSorteSlider(state){
            return state.oligesorteslider;
        },
        getOligeSorteSliderDisabled(state){
            return state.oligesorteslider.disabled ;
        },
        getOligeDosierRadioButtons(state){
            return state.oligedosierradiobuttons;
        },
        getAlternative(state){
            return state.oligealternative;
        },
        getOligeDosierDoseKind(state){
            return state.oligedosierdosenkind;
        },
        getOligeDosierInputs(state){
            return state.oligedosierinputfields;
        },
        getOligeTextArea(state){
            return state.oligedosiertextarea;
        },
        getOligeCardBlockStatement(state){
            return state.oligeenabledbuttons;
        },
        getOligeFinalMessage(state){
            return state.oligefinalmessage ;
        }
    }
}