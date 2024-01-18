export default {
    actions:{

    },
    state() {
        return {
           blutetext : '',
           blutetext_1 : '',
           blutetext_2 : '',
           blutetext_3 : '',
           blutetext_4 : '',

           blutekind : '',
           bluteinzvalue : 0 ,
           blutenrf : 0 ,
           bluteradio : '',
           bluteed : ' n.a ',
           blutetd : ' n.a.',
           bluteweight : '',
           blutetextarea : '',

           blutesorteactive : '',
           blutemengeradio :[
            { id: '1', title: 'Unzerkleinert',          name : 'canblutemenge' , checked: true },
            { id: '2', title: 'NRF 22.12 (ZERkleinert)',name : 'canblutemenge' , checked: false },
        ],
           blutemengeslider: { startvalue: 0, endvalue: 150, step: 1, note: 'THC (< %)', value : 0},
           blutedosierradiobtns: [
            { id: '1', title: 'Verdampfen und inhalieren', name : 'canblutedosier' , checked: false },
            { id: '2', title: 'Alternativ'               , name : 'canblutedosier' , checked: false },
        ],
          blutedosierinputfields: [
            { id: '1', title: 'Einzeldosis (ed)'      , placehold: 'z.B.: 2', value: ''},
            { id: '2', title: 'Tagesmaximaldosis (td)', placehold: 'z.B.: 8', value: ''}
        ],
          blutedosierradiodosage : [
            { id: '1', label: ' mg ', name: 'radiocanblutesorte', border: false, active : false },
            { id: '2', label: ' g ', name: 'radiocanblutesorte', border: false , active : false },
        ],
            blutedosiertextarea : '',
            bluteenabledbuttons : true,
            blutefinalmessage : false,

        }
    },

    mutations : {
        setActiveBlute(state,blute){     
            state.blutesorteactive = blute ;
            state.blutetext_1 = 'Cannabisblüten : ' + state.blutesorteactive + ' , ';
            state.blutetext = state.blutetext_1 + state.blutetext_2  +  state.blutetext_3  +  state.blutetext_4;
        },
        setBluteMengeDosierBlute(state,index){
            for( let element of state.blutemengeradio){
                element.checked = false ;
            }
            state.blutemengeradio[index].checked = true ;

            if( index == 0 ){
                state.blutetext_2 =  state.bluteinzvalue + 'g, unzerkleinert , ' ;
            }
            if( index == 1 ){
                state.blutetext_2 =  state.bluteinzvalue + 'g, NRF 22.12 , ' ;
            }
            state.blutetext = state.blutetext_1 + state.blutetext_2 +  state.blutetext_3  +  state.blutetext_4;
        },
        setBluteDosierMengeValue(state, value){
            state.bluteinzvalue = value ;
            state.blutemengeslider.value = value ;
            if( state.blutekind == 0 ){
                state.blutetext_2 =  state.bluteinzvalue + 'g, unzerkleinert , ' ;
            }
            if( state.blutekind == 1 ){
                state.blutetext_2 =  state.bluteinzvalue + 'g, NRF 22.12 , ' ;
            }
            state.blutetext = state.blutetext_1 + state.blutetext_2 +  state.blutetext_3  +  state.blutetext_4;
            
        },
        setBluteDosierRadioStep(state,value){
            for( let element of state.blutedosierradiobtns){
                element.checked = false ;
            }
            state.blutedosierradiobtns[value].checked = true ;
            if ( value == 1){
                state.bluteradio = '';
                // state.blutetext_3 = 'Dosierung : ';
            }else {
                state.bluteradio = ' verdampfen und inhalieren ' ;
                // state.blutetext_3 = 'Dosierung : ';
            }
            state.blutetext = state.blutetext_1 + state.blutetext_2  +  state.blutetext_3   +  state.blutetext_4;
            
        },
        setBluteDosierRadioDosage(state,index){
            for( let element of state.blutedosierradiodosage ){
                element.active = false ;
            }
            state.blutedosierradiodosage[index].active = true ;
            state.bluteweight = state.blutedosierradiodosage[index].label;

            state.blutetext_4 = 'Dosierung :  ED : ' + state.bluteed + ' ' + state.bluteweight + ' ' + ' TD : ' + state.blutetd + ' ' + state.bluteweight+ ' ' + state.bluteradio ;
            state.blutetext = state.blutetext_1 + state.blutetext_2  +  state.blutetext_3  +  state.blutetext_4;
        },
        setBluteDosierDosen(state,blutedos){    
            for(let i=0;  i<state.blutedosierinputfields.length; i++){
                state.blutedosierinputfields[i].value = blutedos[i];
            }         
            if( blutedos[0] ){
               state.bluteed = blutedos[0] ;
            }else{
                state.bluteed = 'n.a' ;
            }
            if( blutedos[1] ){
                state.blutetd = blutedos[1] ;
             }else{
                 state.blutetd = 'n.a' ;
             }
            if( state.blutetext.length > 0 ){
                state.blutetext_4 = 'Dosierung :  ED : ' + state.bluteed + ' ' + state.bluteweight + ' ' + ' TD : ' + state.blutetd + ' ' + state.bluteweight+ ' ' + state.bluteradio ;
                state.blutetext = state.blutetext_1 + state.blutetext_2  +  state.blutetext_3  +  state.blutetext_4;
            }
        },
        setBluteTextArea(state,blutetextarea){
            state.blutedosiertextarea = blutetextarea ;
            // if( state.blutetext_3.length > 0 ){
                state.blutetext_4 = 'Dosierung : ' + state.blutedosiertextarea ;
                state.blutetext = state.blutetext_1 + state.blutetext_2  +  state.blutetext_4;
            // }    
        },
        setBluteCardBlockStatement(state, statement){
            state.bluteenabledbuttons = statement;
        },
        setCanBluteFinalMessage(state, statement){
            state.blutefinalmessage = statement;
        }
       
    },   
    getters: {
        getBluteSorteActive(state){
            return state.blutesorteactive ;
        },
        getBluteMengeRadio(state){
            return state.blutemengeradio ;
        },
        getBluteMengeSlider(state){
            return state.blutemengeslider;
        },
        getDosierRadioButtons(state){
            return state.blutedosierradiobtns;
        },
        getBluteDosierInputFields(state){
            return state.blutedosierinputfields;
        },
        getBluteDosierRadioDosage(state){
            return state.blutedosierradiodosage;
        },
        getBluteDosierTextarea(state){
            return state.blutedosiertextarea;
        },
        getBluteText(state){
            return state.blutetext ;
        },
        getBluteCardBlockStatement(state){
            return state.bluteenabledbuttons;
        },
        getCanBluteFinalMessage(state){
            return state.blutefinalmessage;
        }
        
    }
}