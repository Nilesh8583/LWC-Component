import { LightningElement,track } from 'lwc';

export default class LWCCalculator extends LightningElement {

    @track firstNumber=0;
    @track secondNumber=0;
    @track result=0;

    handleChang(event){

        if(event.target.name==='FNO')
        {
            this.firstNumber=event.target.value;
        }
        if(event.target.name==='SNO')
        {
            this.secondNumber=event.target.value;
        }
        
    }
    addition(){
        this.result=parseInt(this.firstNumber)+parseInt(this.secondNumber);
    }
    substraction()
    {
        this.result=parseInt(this.firstNumber)-parseInt(this.secondNumber);
    }
    division()
    {
        this.result=parseInt(this.firstNumber)/parseInt(this.secondNumber);
    }
    multiplication()
    {
        this.result=parseInt(this.firstNumber)*parseInt(this.secondNumber);
    }
}    