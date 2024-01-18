<template>
    <div class="amountselector d-flex flex-row justify-content-center align-items-center position-relative">
            <button @click.stop="remove" class="selectorbutton remove" :disabled="disabled">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M0 10h24v4h-24z"/>
                </svg>
            </button>
            <input  :id="id" @click.stop="" type="text" v-model="amount"  :disabled="disabled">
            <button @click.stop="add" class="selectorbutton add" :disabled="disabled">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                </svg>
            </button>
		</div>
</template>

<script>

export default ({
    mounted(){
        console.log('mounted');
        if(this.amount_!=null){
            this.amount = Number.parseInt(this.amount_ , 10);
        } 
        let gadgetTable = JSON.parse(JSON.stringify(this.$store.getters.getGadgetStatementTable))
        for( let gadget of gadgetTable){
            if( this.product == gadget.name){
                this.amount = Number.parseInt(gadget.amount,10) ; 
            }
        }
        
	},
    emits:[
        'setamount',
        'setmodal',
    ],
    props: {
        amount_ : {
            type : [String,Number],
            required : false
        },
        disabled : {
            type : Boolean,
            required : false,
            default : false
        },
        product : {
            type : String,
            default : 'gadget name'
        },
        id : String,
        

    },
    watch : {
        amount_(){
            this.amount = Number.parseInt(this.amount_ , 10);
        },
        amount(newAmount, oldAmount){
            if(!Number.isInteger(Number.parseInt(newAmount, 10))){
                this.amount = oldAmount;
            }else{
                this.setAmount();
            }
        },
    },
    data() {
        return {
            amount : 0,
            operation : '',
        };
    },
    methods: {
        add(){
            var totalGadgets = this.$store.getters.getTotalGadgetsAmount ;
             if( totalGadgets > 2 ){
                this.$emit('setmodal');
             }else{
                this.amount = Number.parseInt(this.amount , 10) + 1;
                this.operation = 'add';
            }
        },
        remove(){
            if(this.amount>0){
                this.amount = Number.parseInt(this.amount , 10) - 1;
                this.operation = 'remove';
            }
        },
		setAmount(){
            this.$emit('setamount',{ amount : Number.parseInt(this.amount , 10), product : this.product, operation:this.operation});         
          
		},
    },
	
    
})
</script>

<style>
    .amountselector {
    width: 128px;
  }
 
  .amountselector input{
    padding: 4px;
    border-top: 1px solid #DBDFEC;
    border-bottom: 1px solid #DBDFEC;
    border-left:none ;
    border-right:none;
    background-color: #fff;
    /* border-radius: 5px; */
    color: #1f1f1f;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 22px;
    text-align: center;
    width: 45px;
    height : 38px;
  }
 
  .amountselector .selectorbutton{
    color: #ffffff;
    width : 45px;
    height : 38px;
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 22px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
        -ms-flex-direction:column;
            flex-direction:column;
    -webkit-box-pack:center;
        -ms-flex-pack:center;
            justify-content:center;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    background-color:#2FDAA0;
    border: 1px solid #2FDAA0;  /* border : none ; */
    cursor: pointer;
  }
  button.remove {
    border-radius: 2px 0px 0px 2px;
  }
  button.add{
    border-radius: 0px 2px 2px 0px;;
  }
 .amountselector .selectorbutton:hover{
    background-color:#198754!important;
    border: 1px solid #198754!important;  /* border : none ; */
    cursor: pointer;
  }

  .amountselector .selectorbutton:focus{
    outline: unset;
  }

  .amountselector .selectorbutton svg *,
  .amountselector .selectorbutton svg {
    fill : #ffffff;
  }

  .amountselector button:disabled.selectorbutton svg *,
  .amountselector button:disabled.selectorbutton svg {
    fill : #ffffff;
  }
 
</style>
