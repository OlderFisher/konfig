export default {
    actions: {
      async getGadgets(ctx) {
        let url = 'https://cannabis-apotheke.de/wp-json/cannapo/v1/get/auxiliaries';
        let data = {
          productgroup : '4bImd87wku',
          availbility : 1
        }
         try {
            let res = await fetch(url,{
               method: "POST",
                  headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
  
            const gadgets =  await res.json();
            ctx.commit('updateGadgets',gadgets) ;

         } catch (error) {
             console.log(error);
         }
      },
    },
    mutations: {
        updateGadgets(state,gadgets){
          state.gadgets = gadgets ;
        }
    },
    state: {
      gadgets : []
    },
    getters: {
      allGadgets(state){
        return state.gadgets ;
      }
    },
  
  };