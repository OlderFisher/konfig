
export default {
    actions: {
      async getExtracts(ctx) {
        let url = 'https://cannabis-apotheke.de/wp-json/cannapo/v1/get/extracts';
    
         try {
          let res = await fetch(url,{
            method: "POST",
               headers: {
               "Content-Type": "application/json",
             },
         });
            const extracts =  await res.json();
            for( let extract of extracts){
              extract.thc = extract.thc.replace(',','.') ;
              extract.cbd = extract.cbd.replace(',','.') ;
            }
            ctx.commit('updateExtracts',extracts) ;
              
         } catch (error) {
             console.log(error);
         }
      },
    },
    mutations: {
        updateExtracts(state,extracts){
         state.extracts = extracts ;
        }
    },
    state() {
      return {
        extracts : []
      }
    },
    getters: {
      getAllExtracts(state){
        return state.extracts ;
      }
    },
  
  };