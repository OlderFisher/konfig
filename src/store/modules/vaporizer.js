export default {
  actions: {
    async getVaporizes(ctx) {
      let url = 'https://cannabis-apotheke.de/wp-json/cannapo/v1/get/auxiliaries';
      let data = {
        productgroup : 'uV0Ww3YtXF',
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
          const vaporizers =  await res.json();
          ctx.commit('updateVaporizers',vaporizers) ;
 
       } catch (error) {
           console.log(error);
       }
    },
  },
  mutations: {
      updateVaporizers(state,vaporizes){
       state.vaporizers = vaporizes ;
      }
  },
  state() {
    return {
    vaporizers : []
    }
  },
  getters: {
    allVaporizers(state){
      return state.vaporizers ;
    }
  },

};