import { createStore }  from 'vuex' ;
import vaporizer from './modules/vaporizer';
import gadget from './modules/gadget';
import extract from './modules/extract';
import blute from './modules/blute' ;
import blutemessages from './modules/canblutemessages';
import canextractmessages from './modules/canextractmessages';
import cannaxanmessages from './modules/cannaxanmessages';
import oligemessages from './modules/oligemessages';
import dronabinolmessages from './modules/dronabinolmessages';
import hilfsmessages from './modules/hilfsmessages';

const store =  createStore({
  state() {
    return {
    
    };
  },
  mutations: {
    
  },
  actions : {

  },
  getters : {
  

  },
  modules :{
    vaporizer,
    gadget,
    extract,
    blute,
    
    blutemessages,
    canextractmessages,
    oligemessages,
    dronabinolmessages,
    hilfsmessages,
    cannaxanmessages,
  }

});

export default store