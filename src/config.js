export default {
    assetPath() {
        if(process.env.VUE_APP_BUILD_DEV=='true'){
            if(process.env.VUE_APP_PLUGIN_MODE=='true'){
                return process.env.VUE_APP_PLUGIN_ROUTE_DEV;
            }else if(process.env.VUE_APP_PLUGIN_MODE=='false'){
                return process.env.VUE_APP_BASE_URL_DEV;
            }else{
                return process.env.VUE_APP_BASE_URL;
            }
        }else if(process.env.VUE_APP_BUILD_DEV=='false') {
            if(process.env.VUE_APP_PLUGIN_MODE=='true'){
                return process.env.VUE_APP_PLUGIN_ROUTE_PROD;
            }else if(process.env.VUE_APP_PLUGIN_MODE=='false'){
                return process.env.VUE_APP_BASE_URL_PROD;
            }else{
                return process.env.VUE_APP_BASE_URL;
            }
        }else{
            return process.env.VUE_APP_BASE_URL;
        }
    },
    svgFolder(){
        return `${this.assetPath()}/img/svg`;
    },
    pdfFolder(){
        return `${this.assetPath()}/pdf`;
    },
};