export default {
    actions: {
      async getBlutes(ctx) {
        let url = 'https://cannabis-apotheke.de/wp-json/cannapo/v1/get/buds';
     
         try {
            let res = await fetch(url,{
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                  }, 
             });
             
            const blutes =  await res.json();
            for( let blute of blutes){
              blute.thc = blute.thc.replace(',','.') ;
              blute.cbd = blute.cbd.replace(',','.') ;
            }
            ctx.commit('updateBlutes',blutes) ;
            
         } catch (error) {
             console.log(error);
         }
      },
    },
    mutations: {
        updateBlutes(state,blutes){
         state.blutes = blutes ;
        }
    },
    state() {
      return {
        blutes : []
      }
    },
    getters: {
      getAllBlutes(state){
        return state.blutes;
      }
    },
  
  };