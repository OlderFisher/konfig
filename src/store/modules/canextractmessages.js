export default{
    actions:{
        
    },
    state() {
        return {
           extracttext : '',

           extractactivetext : '',
           extractslidertext : '',      
           extractdosiertext : '',

           extractinzvalue : 0,
           extractweight : '',
           extracted : '',
           extracttd : '',
           extractdosiertextarea : '',

           extractsorteactive :'',
           ectraxtsorteactivethc : null,
           ectraxtsorteactivecbd : null,

           extractproductstandard : null,
           extractproductthcandcbd : null,
           extractproductcbd : null,
           extractproductcustom : null,

           extractmengeslider : { startvalue: 0, endvalue: 150, step: 1, note: 'Menge (milliliter)', value : 0 },

           extractenabledbuttons : true,
           extractfinalmessage : false,

           extractdosierradiobuttons:[
            { id: '1', title: 'Orale Einnahme',name: 'radextrsorte', checked: true},
            { id: '2', title: 'Alternativ'    ,name: 'radextrsorte', checked: false },
        ],
           extractdosierradiodosage :  [
            { id: '1', label: ' mg ',     name: 'radioextrsorte', border: false , active : false},
            { id: '2', label: ' Topfen ', name: 'radioextrsorte', border: false , active : false },
        ],
           extractdosierinputfields : [
            { id: '1', title: 'Einzeldosis (ed)' , placehold: 'z.B.: 2', value: ''},
			{ id: '2', title: 'Tagesmaximaldosis (td)', placehold: 'z.B.: 8', value: ''}
        ],

           specialextractbool : false ,
           specialextractname : '',
           specialextract : {
                dosage : '',
                slider : 0 ,
           },
           specialextractvalue : 0,

           config_popup_special_extract: [
            {   
                name : "Pedanios 5/5", 
                button : [5,10,20,25],
                minSliderAmount:0,
                maxSliderAmount: 25,
                unit: 'mg/ml',
                type: 'thcandcbd',
                base: 'THC',
                
            },
            {
                name : "NAXIVA-PANAXOL THC 250 Cannabis-Extrakt",
                button : [75,100,150,200],
                minSliderAmount:0,
                maxSliderAmount: 200,
                unit: 'mg/ml',
                type: 'thc',
                base: 'THC',
            },
            {
                name : "NAXIVA-PANAXOL CBD 250 Cannabis-Extrakt",
                button : [75,100,150,200],
                minSliderAmount:0,
                maxSliderAmount: 200,
                unit: 'mg/ml',
                type: 'cbd',
                base: 'CBD',
            }
      ],
            conditionalproducts_extracts : {
                thcandcbd : [
                    'Adven 20/1',
                    'Adven 10/20',
                    'Adven 10/10',
                    'Althea THC10:CBD12',
                    'Tilray 10/10',
                    'Tilray 5/20',
                    'Canpharma X 10/10',
                    'Cannamedical Hybrid Cannabisextrakt THC25:CBD25',
                    'Cannovum Extrakt 10/15',
                    'Eurox 10:10',
                    'NAXIVA-PANAXOL THC 25/CBD 25 Cannabis-Extrakt',
                    'LGP 10:10 Classic Cannabisextrakt',
                    'LGP 20:5 Classic Cannabisextrakt',
                    'ADREX 10:10 Extrakt',
                    'Althea THC2:CBD25',
                    'Althea THC5:CBD10',
                    'iuvo Balance THC10:CBD15',
                    'Demecan 20:20 Oktonia',
                    'CannabiStada Extrakt THC10/CBD10',
                    'CannabiStada Extrakt THC1/CBD25',
                    'Medicus 10:10',
                    'Aurora THC:CBD Extract 1',
                    'Tilray THC20:CBD6',
                    '25/25 Vayamed Cannabisextrakt No 1',
                    'IMC Extrakt 10:10 B100',
                    'Aphria 10:13 Extrakt',
                    'remextrakt 10/15',
                    '10/50 Vayamed Cannabisextrakt No 1',
                    'Grow 10:15',
                    'EleCeed 10',
                    'ClaraCeed 1',
                    'Ethypharm CBD 100',
                    'Ethypharm CBD 200',
                    'remextrakt 10/10 Nr.1',
                    'Apocan 10/10 CAN Extractum Normatum',
                    'Apocan 25/1 CAN Extractum Normatum',
                    'NAXIVA-PANAXOL ONKO THC 100 / CBD 20',
                    'NAXIVA-PANAXOL ONKO THC 50 / CBD 10',
                    'Tilray THC25:CBD25'
                ],
            
                cbd : [
                    'NAXIVA-PANAXOL CBD 25 Cannabis-Extrakt',
                    'ADREX 1:25 CBD Extrakt',
                    'Canpharma X 1/25'      
                ],
                custom : [
                    'Pedanios 5/1',
                    'Vertanical THC',
                    'Vertanical THC/CBD',
                    'Vertanical CBD',
                    'Peace Naturals Extrakt 5% THC'
                ],
                special: [
                    'Pedanios 5/5',
                    'NAXIVA-PANAXOL THC 250 Cannabis-Extrakt',
                    'NAXIVA-PANAXOL CBD 250 Cannabis-Extrakt',
                ]
            },
           
        }
    },

    mutations : {
        setActiveExtract(state,extractdata){   
            
            // state.extractmengeslider.value = 0 ;
            state.extractdosierradiobuttons.forEach(element => {
                element.checked = false
            })
            state.extractdosierradiobuttons[0].checked = true ;
            // state.extractdosierradiodosage.forEach(element => {
            //     element.active = false ;
            // });
            // state.extractdosierinputfields.forEach( element =>{
            //     element.value = ''
            // })


            const index = extractdata[1];
            const extractlist = JSON.parse(extractdata[2])

            state.extractsorteactive = extractlist[index].productname ;
            state.ectraxtsorteactivethc  = extractlist[index].thc ;
            state.ectraxtsorteactivecbd  = extractlist[index].cbd ;

            state.ectractproductthcandcbd = false ;
            state.extractproductcbd = false ;
            state.extractproductcustom = false ;

            for( let element of state.conditionalproducts_extracts.thcandcbd){
                if ( element === state.extractsorteactive ){
                    state.extractproductthcandcbd = true;
                }   
            }
            for( let element of state.conditionalproducts_extracts.cbd){
                if ( element === state.extractsorteactive ){
                    state.extractproductcbd    = true;
                }
            }
            for( let element of state.conditionalproducts_extracts.custom){
                if ( element === state.extractsorteactive ){
                    state.extractproductcustom = true ;
                }
               
            }
            
            if ( !state.extractproductthcandcbd && !state.extractproductcbd  && !state.extractproductcustom && !state.specialextractbool){
                state.extractproductstandard = true
            }else{
                state.extractproductstandard = false
            }
        
            if( state.specialextractbool ){
                const valuestring = state.specialextract.dosage ? state.specialextract.dosage : state.specialextract.slider ;
                const value = valuestring.slice(0,-6);
                state.specialextractvalue = value ;
                state.extractactivetext = 'Cannabisextrakt ' + state.extractsorteactive  + ' , enthält '+valuestring+' CBD und '+value*0.06.toFixed(2)+ 'mg/ml THC,'
            }else {
                 state.extractactivetext = 'Cannabisextrakt : ' + state.extractsorteactive + ' , ' ;
            }
            state.extracttext = state.extractactivetext + state.extractslidertext + state.extractdosiertext;
        },
        setSpecialExtractDataName(state,name){
            if( name ){
                state.specialextractname = name ;
            }
        },
        setSpecialExtractDataRadio(state,data){
            if ( data ){
                state.specialextract.dosage = data;
                state.specialextract.slider = 0;
                state.specialextractbool = true;
            }
        },
        setSpecialExtractDataSlider(state,data){
            if ( data != 0 && !isNaN(data) ){
                state.specialextract.dosage = '';
                state.specialextract.slider = data;
                state.specialextractbool = true;
            }
            
        },
        setClearaSpecailExtractData(state){
            state.specialextractbool = false;
            state.specialextractname = '';
            state.specialextract.dosage = '';
            state.specialextract.slider = 0 ;
        },
        setExtractDosierMengeValue(state, value){
            state.extractinzvalue = value ;
            state.extractmengeslider.value = value ;


            // if( state.extractproductstandard ){
                state.extractslidertext = state.extractinzvalue + 'ml  Gesamtmenge THC: ' + state.extractinzvalue * state.ectraxtsorteactivethc ;
            // }
            if( state.extractproductthcandcbd ){
                state.extractslidertext = state.extractinzvalue + 'ml enthält ' + state.ectraxtsorteactivethc  +'/ml THC und ' + state.ectraxtsorteactivecbd  +'/ml CBD  Gesamtmenge THC: ' + state.extractinzvalue * state.ectraxtsorteactivethc ;
          
            }
            if( state.extractproductcbd ){
                state.extractslidertext = state.extractinzvalue + ' ml, enthält <1mg/ml THC und ' + state.ectraxtsorteactivecbd +'mg/ml CBD'
            }
            if( state.extractproductcustom ){
                state.extractslidertext = 'Wirkstoff: '+state.extractsorteactive+' CBD50  '+ state.extractinzvalue*0.4.toFixed(2) +'g, Sesamöl ad '+state.extractinzvalue+'g, enthält <0.1mg/g THC und '+state.ectraxtsorteactivecbd +'mg/g CBD'
            }
            if( state.specialextractbool ){
                state.extractslidertext = state.extractinzvalue + 'ml, Wirkstoff: '+state.specialextractname+' Cannabisextrakt '+state.specialextractvalue*0.2.toFixed(2)+'g, MCT ad '+state.extractinzvalue+'ml, Gesamtmenge THC: '+state.specialextractvalue*3+' mg';
            }
            
            
            state.extracttext = state.extractactivetext + state.extractslidertext + state.extractdosiertext;

        },
        setExtractDosierRadioStep(state,value){

            for( let element of state.extractdosierradiobuttons){
                element.checked = false ;
            }
            state.extractdosierradiobuttons[value].checked = true ; 
            if ( value == 0 ){
                state.extractdosiertext = ' Dosierung: ED: ' + state.extracted + ' '+ state.extractweight + ', TD: ' +state.extracttd +' '+ state.extractweight + ', oral einnehmen';
            }else {
                state.extractdosiertext = ' Dosierung : ' + state.extractdosiertextarea  ;
            }            
            state.extracttext = state.extractactivetext + state.extractslidertext + state.extractdosiertext;
            
        },    
        setExtractDosierRadioDosage(state,index){

            state.extractweight = index.value ;
            const setelement = index.i;
            for( let element of state.extractdosierradiodosage ){
                     element.active = false ;
            }
            state.extractdosierradiodosage[setelement].active = true ;

            state.extractdosiertext = ' Dosierung: ED: ' + state.extracted + ' '+ state.extractweight + ', TD: ' +state.extracttd +' '+ state.extractweight + ', oral einnehmen';
            
            state.extracttext = state.extractactivetext + state.extractslidertext + state.extractdosiertext;
 
            
        },
        setExtractDosierInputs(state,inputs){

            for(let i=0;  i<state.extractdosierinputfields .length; i++){
                state.extractdosierinputfields[i].value = inputs[i];
            }         

            if( inputs[0] ){
               state.extracted = inputs[0] ;
            }else{
                state.extracted = 'n.a' ;
            }
            if( inputs[1] ){
                state.extracttd = inputs[1] ;
             }else{
                 state.extracttd = 'n.a' ;
            }

            state.extractdosiertext = ' Dosierung: ED: ' + state.extracted + ' '+ state.extractweight + ', TD: ' +state.extracttd +' '+ state.extractweight + ', oral einnehmen';
            state.extracttext = state.extractactivetext + state.extractslidertext +state.extractdosiertext;
 
        },
        setExtractTextArea(state,extracttextarea){
            state.extractdosiertextarea  = extracttextarea ;
            state.extractdosiertext = ' Dosierung : ' + state.extractdosiertextarea  ;
            state.extracttext = state.extractactivetext + state.extractslidertext +state.extractdosiertext;

        },
        setExtractCardBlockStatement(state,statement){
            state.extractenabledbuttons = statement;
        },
        setCanExtractFinalMessage(state, statement){
            state.extractfinalmessage = statement ;
        }    
    },   
    getters: {
        getExtractSorteActive(state){
            return state.extractsorteactive ;
        },
        getSpecialExtractStatement(state){
            return state.specialextractbool ;
        },
        getSpecialExtractLightboxData(state){
            return state.config_popup_special_extract;
        },
        getExtractMengeSlider(state){
            return state.extractmengeslider;
        },
        getExtractDosierRadioButtons(state){
            return state.extractdosierradiobuttons;
        },
        getExtractDosierRadioDosage(state){
            return state.extractdosierradiodosage;
        },
        getExtractDosierInputFields(state){
            return state.extractdosierinputfields ;
        },
        getExtractDosierTextarea(state){
            return state.extractdosiertextarea ;
        },
        getExtractText(state){
            return state.extracttext ;
        },
        getStateA(state, _, rootState) {
            return rootState.extract.extracts;
        },
        getExtractCardBlockStatement(state){
            return state.extractenabledbuttons;
        },
        getCanExtractFinalMessage(state){
            return state.extractfinalmessage ;
        }
        
    }



}